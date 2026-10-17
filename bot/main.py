import os
import sys
import json
import base64
import re
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, MessageHandler,
    CallbackQueryHandler, ContextTypes, filters
)
from dotenv import load_dotenv
from datetime import datetime

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

load_dotenv()

# ── Config ────────────────────────────────────────────────────────────────────
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID   = int(os.environ.get('TELEGRAM_CHAT_ID', '0')) if os.environ.get('TELEGRAM_CHAT_ID') else 0
GEMINI_API_KEY     = os.environ.get('GEMINI_API_KEY', '')
GITHUB_PAT         = os.environ.get('MAIN') or os.environ.get('GITHUB_PAT', '')
GITHUB_REPO        = os.environ.get('GITHUB_REPO', 'Adithya0805/adithya-ai-hub')
SITE_URL           = os.environ.get('SITE_URL', 'https://adithya-ai-hub.vercel.app').rstrip('/')
NEWSLETTER_SECRET  = os.environ.get('NEWSLETTER_SECRET', 'Adithya@0805')

def call_gemini_json(prompt: str) -> dict:
    """
    Direct, zero-cost Gemini API caller using modern REST endpoint.
    Uses thinkingBudget: 0 to prevent burning quota on reasoning tokens,
    and returns parsed JSON in a single round-trip.
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not configured")

    models_to_try = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite']
    last_err = None

    for m in models_to_try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 2500,
                "responseMimeType": "application/json",
                "thinkingConfig": {"thinkingBudget": 0}
            }
        }
        try:
            res = requests.post(url, json=payload, timeout=45)
            if res.ok:
                data = res.json()
                raw = data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
                clean = re.sub(r'^```json\s*', '', raw, flags=re.IGNORECASE)
                clean = re.sub(r'^```\s*', '', clean)
                clean = re.sub(r'```\s*$', '', clean).strip()
                s = clean.find('{')
                e = clean.rfind('}')
                if s != -1 and e != -1 and e > s:
                    clean = clean[s:e+1]
                return json.loads(clean)
            else:
                last_err = f"{m} HTTP {res.status_code}: {res.text}"
        except Exception as e:
            last_err = str(e)
            continue

    raise RuntimeError(f"Gemini API generation failed across all models: {last_err}")

# ── State ─────────────────────────────────────────────────────────────────────
state = {
    'pending': None,         # generated post dict
    'pending_title': '',     # current title before generation
    'pending_category': '',  # current category before generation
    'pending_notes': '',     # custom notes for generation
    'mode': None,            # 'awaiting_edit' | 'awaiting_notes'
    'edit_field': None,      # which field is being edited
}

CATEGORIES = [
    ('🤖 Machine Learning', 'Machine Learning'),
    ('🎯 Interview Prep',   'Interview Prep'),
    ('🚀 Career',           'Career'),
    ('🐍 Python',           'Python'),
    ('☁️ Cloud & AI',       'Cloud & AI'),
    ('⚡ Project',          'Project'),
]


# ── RENDER HEALTH CHECK SERVER ────────────────────────────────────────────────
class HealthCheckHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"Adithya AI Hub Telegram Bot v2 is active and running!")

    def log_message(self, format, *args):
        pass

def run_http_server():
    port = int(os.environ.get('PORT', 8080))
    server = HTTPServer(('0.0.0.0', port), HealthCheckHandler)
    server.serve_forever()


# ── Auth ──────────────────────────────────────────────────────────────────────
def authorized(update: Update) -> bool:
    if not TELEGRAM_CHAT_ID:
        return True
    return update.effective_user.id == TELEGRAM_CHAT_ID


# ── GEMINI: Generate short focused SEO post ───────────────────────────────────
def generate_post(title: str, category: str, custom_notes: str = '') -> dict:
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    date = datetime.now().strftime('%Y-%m-%d')

    # Real search keywords per category
    keyword_map = {
        'Machine Learning': 'machine learning India, LangChain tutorial, RAG Python, AI engineer fresher',
        'Interview Prep':   'TCS NQT 2026, Infosys interview, campus placement India, Python interview',
        'Career':           'AI engineer Tamil Nadu, fresher job search India, ML engineer career',
        'Python':           'Python tutorial beginners India, Python coding questions, Python for ML',
        'Cloud & AI':       'AWS Bedrock Python tutorial, Google Cloud Run FastAPI, cloud AI India',
        'Project':          'AI project portfolio India, LangGraph project, RAG system build',
    }
    keywords = keyword_map.get(category, 'AI engineer India, machine learning tutorial')

    custom_section = f'\nExtra context: {custom_notes}' if custom_notes else ''

    prompt = f"""You are Adithya Kuppusamy writing a SHORT focused blog post for adithyaai.is-cool.dev.

IDENTITY:
- 2025 B.Tech AI & DS grad, Tamil Nadu
- Real projects: MediGuard (LangGraph + AWS Bedrock + Pinecone),
  Urimai AI (64 Tamil Nadu gov schemes, 199 rules),
  TownRise AI (Gemini + Supabase + OpenStreetMap),
  Freelance clients: Aranya Organic Dairy Farm, SR Travels, Dino Leathers
- Stack: Python, LangGraph, FastAPI, AWS Bedrock, Pinecone, Next.js, Supabase
{custom_section}

POST TITLE: {title}
CATEGORY: {category}
TARGET KEYWORDS: {keywords}

STRICT LENGTH RULE:
- 350 to 450 words MAXIMUM
- No padding, no repetition, no long intros
- Every sentence must earn its place

STRUCTURE — follow exactly:

<h2>[Hook — your real situation in 1-2 sentences]</h2>
<p>Start with the actual moment. "I was debugging X at midnight when..." or
"Three students asked me the same question last week so here is the answer."
NOT "In today's AI landscape..."</p>

<h2>The Problem</h2>
<p>2-3 sentences. What exactly is the pain point. Be specific.</p>

<h2>[Main Answer Section — name it after the actual topic]</h2>
<p>The actual useful content. Include ONE code block if technical.</p>
<pre><code>
# Real working code here
# From your actual projects
</code></pre>

<h2>What I Got Wrong First</h2>
<p>1-2 sentences. One real mistake you made. This is what makes the post
human and trustworthy. No AI writes "what I got wrong."</p>

<h2>3 Things to Remember</h2>
<ul>
  <li>Specific actionable point 1</li>
  <li>Specific actionable point 2</li>
  <li>Specific actionable point 3</li>
</ul>

<p><em>— Adithya, Ambur, Tamil Nadu. Building real AI systems while job hunting.
Follow for weekly posts: adithyaai.is-cool.dev</em></p>

SEO RULES:
- Use the main keyword from "{keywords}" naturally in first paragraph
- Use it again in one H2 heading
- Do NOT stuff keywords — use once or twice maximum

VOICE RULES:
- First person always
- One Tamil Nadu or South India reference
- Direct, no filler words
- Write like you are explaining to a batch mate, not a professor

OUTPUT: Return ONLY a JSON object with these exact keys:
{{
  "content": "<complete HTML article adhering to the above structure, 350 to 450 words starting with <h2>>",
  "excerpt": "<ONE sentence meta description under 155 chars incorporating a keyword naturally>",
  "seoTitle": "<punchy SEO title under 60 chars>"
}}
"""

    gen_data = call_gemini_json(prompt)
    content = gen_data.get('content', '').strip()
    excerpt = gen_data.get('excerpt', '').strip()[:155]
    seo_title = gen_data.get('seoTitle', title).strip()[:60]

    # Canva cover prompt
    canva_prompt = generate_canva_prompt(title, category)

    # WhatsApp status
    whatsapp_text = generate_whatsapp_status(title, slug, category)

    # Word count
    word_count = len(re.sub('<[^>]+>', '', content).split())

    # Read time
    read_time = f"{max(2, word_count // 200)} min read"

    tag_map = {
        'Machine Learning': ['LangChain', 'Python', 'AI', 'Machine Learning'],
        'Interview Prep':   ['TCS', 'Interview', 'Career', 'Fresher'],
        'Career':           ['Career', 'Tamil Nadu', 'AI Engineer', 'OpenToWork'],
        'Python':           ['Python', 'Tutorial', 'Programming', 'Beginners'],
        'Cloud & AI':       ['AWS', 'Cloud', 'AI', 'Python'],
        'Project':          ['AI', 'Project', 'Python', 'Machine Learning'],
    }

    return {
        'slug':          slug,
        'title':         title,
        'seoTitle':      seo_title,
        'date':          date,
        'excerpt':       excerpt,
        'tags':          tag_map.get(category, ['AI', 'Machine Learning']),
        'category':      category,
        'readTime':      read_time,
        'featured':      False,
        'content':       content,
        'canva_prompt':  canva_prompt,
        'whatsapp_text': whatsapp_text,
        'word_count':    word_count,
    }


def generate_canva_prompt(title: str, category: str) -> str:
    color_map = {
        'Machine Learning': 'dark navy #0d1117, cyan accent #00d4ff',
        'Interview Prep':   'deep purple #1a0a2e, gold accent #f59e0b',
        'Career':           'dark green #0a1a0d, lime accent #86efac',
        'Python':           'dark amber #1a1200, yellow accent #fbbf24',
        'Cloud & AI':       'dark slate #0f172a, orange accent #f97316',
        'Project':          'near black #111111, warm gold #c8a96e',
    }
    colors = color_map.get(category, 'near black #111111, warm gold #c8a96e')

    return (
        f"Canva image prompt for blog cover (1200x630px):\n\n"
        f"Background: {colors}\n"
        f"Top-left label: {category.upper()} (small caps, accent color)\n"
        f"Center title: {title}\n"
        f"Font: Playfair Display Bold, large\n"
        f"Bottom-left: Adithya · {SITE_URL.replace('https://', '')} (small, muted)\n"
        f"Style: Clean editorial, no stock photos, text-only with subtle gradient\n\n"
        f"AI image gen prompt for background texture:\n"
        f"Abstract {category.lower()} concept, {colors}, minimal dark background, "
        f"no text, editorial tech style, subtle geometric pattern, cinematic depth"
    )


def generate_whatsapp_status(title: str, slug: str, category: str) -> str:
    post_url = f"{SITE_URL}/blog/{slug}"
    emoji_map = {
        'Machine Learning': '🤖',
        'Interview Prep':   '🎯',
        'Career':           '🚀',
        'Python':           '🐍',
        'Cloud & AI':       '☁️',
        'Project':          '⚡',
    }
    emoji = emoji_map.get(category, '📝')

    return (
        f"{emoji} New blog post!\n\n"
        f"*{title}*\n\n"
        f"Read it here 👇\n"
        f"{post_url}\n\n"
        f"#{category.replace(' ', '').replace('&', '')} #AI #TamilNadu"
    )


# ── GitHub: Get current posts.ts ──────────────────────────────────────────────
def get_posts_file():
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/src/data/posts.ts"
    headers = {
        'Authorization': f'token {GITHUB_PAT}',
        'Accept': 'application/vnd.github.v3+json'
    }
    r = requests.get(url, headers=headers)
    data = r.json()
    content = base64.b64decode(data['content']).decode('utf-8')
    return content, data['sha']


def build_post_entry(post: dict) -> str:
    tags_str = json.dumps(post['tags'])
    content_escaped = post['content'].replace('`', r'\`').replace('${', r'\${')
    featured = str(post.get('featured', False)).lower()
    title_escaped = post['title'].replace(chr(39), chr(92) + chr(39))
    seo_title_escaped = post.get('seoTitle', post['title']).replace(chr(39), chr(92) + chr(39))
    excerpt_escaped = post['excerpt'].replace(chr(39), chr(92) + chr(39))

    return (
        f"  {{\n"
        f"    slug: '{post['slug']}',\n"
        f"    title: '{title_escaped}',\n"
        f"    seoTitle: '{seo_title_escaped}',\n"
        f"    date: '{post['date']}',\n"
        f"    excerpt: '{excerpt_escaped}',\n"
        f"    tags: {tags_str},\n"
        f"    category: '{post['category']}',\n"
        f"    readTime: '{post['readTime']}',\n"
        f"    featured: {featured},\n"
        f"    content: `\n{content_escaped}\n    `\n"
        f"  }}"
    )


def commit_to_github(post: dict) -> bool:
    try:
        current, sha = get_posts_file()
        entry = build_post_entry(post)

        candidates = [
            'export const posts: Post[] = [',
            'export const posts = [',
            'export const blogPosts: BlogPost[] = [',
            'export const blogPosts = ['
        ]
        marker = None
        for candidate in candidates:
            if candidate in current:
                marker = candidate
                break

        if not marker:
            print("❌ Insert marker for posts array not found in src/data/posts.ts")
            return False

        new_content = current.replace(marker, f"{marker}\n{entry},")
        encoded = base64.b64encode(new_content.encode('utf-8')).decode('utf-8')

        r = requests.put(
            f"https://api.github.com/repos/{GITHUB_REPO}/contents/src/data/posts.ts",
            headers={
                'Authorization': f'token {GITHUB_PAT}',
                'Accept': 'application/vnd.github.v3+json'
            },
            json={
                'message': f'blog: {post["title"][:60]}',
                'content': encoded,
                'sha': sha
            }
        )
        return r.status_code in [200, 201]
    except Exception as e:
        print(f"GitHub error: {e}")
        return False


# ── Telegram helpers ──────────────────────────────────────────────────────────
async def send_long_text(bot, chat_id: int, text: str, prefix: str = ''):
    """Split long text into 3800-char chunks and send each."""
    max_len = 3800
    if prefix:
        text = prefix + text
    chunks = [text[i:i+max_len] for i in range(0, len(text), max_len)]
    for i, chunk in enumerate(chunks):
        label = f"[{i+1}/{len(chunks)}]\n" if len(chunks) > 1 else ''
        await bot.send_message(
            chat_id=chat_id,
            text=label + chunk,
            parse_mode=None  # plain text for content — avoids markdown parse errors
        )


# ── HANDLERS ──────────────────────────────────────────────────────────────────
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not authorized(update): return
    state['mode'] = None
    state['pending'] = None

    await update.message.reply_text(
        "🤖 *Adithya Hub Bot v2*\n\n"
        "*How to publish a post:*\n"
        "1️⃣ Send me any blog title\n"
        "2️⃣ Pick a category\n"
        "3️⃣ Add custom notes (optional)\n"
        "4️⃣ Gemini generates 1000+ word post\n"
        "5️⃣ Read full content here before publishing\n"
        "6️⃣ Edit anything or approve\n"
        "7️⃣ One tap → live on site + all socials\n\n"
        "*Commands:*\n"
        "/start — reset bot\n"
        "/status — site health check\n"
        "/stats — your blog stats\n"
        "/cancel — cancel current post\n\n"
        "Send me a title to begin 👇",
        parse_mode='Markdown'
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not authorized(update): return

    text = update.message.text.strip()
    if text.startswith('/'):
        return

    # If bot is waiting for edit input
    if state['mode'] == 'awaiting_edit':
        await apply_edit(update, context, text)
        return

    # If bot is waiting for custom notes
    if state['mode'] == 'awaiting_notes':
        await generate_with_notes(update, context, text)
        return

    # Otherwise treat as new title
    state['pending'] = None
    state['mode'] = None
    state['pending_title'] = text
    context.user_data['pending_title'] = text

    # Use short index callback_data to stay well within Telegram's 64-byte limit
    keyboard = [
        [InlineKeyboardButton(label, callback_data=f"cat:{i}")]
        for i, (label, _) in enumerate(CATEGORIES)
    ]

    await update.message.reply_text(
        f"📝 *Title received:*\n_{text}_\n\nPick a category:",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup(keyboard)
    )


async def handle_category_select(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if not authorized(update): return
    await query.answer()

    try:
        cat_idx = int(query.data.split(':', 1)[1])
        category = CATEGORIES[cat_idx][1]
    except (ValueError, IndexError):
        category = 'Machine Learning'

    title = context.user_data.get('pending_title') or state.get('pending_title', '')
    if not title:
        await query.edit_message_text("❌ Title was lost. Please send the title again.")
        return

    state['pending_category'] = category
    context.user_data['pending_category'] = category

    await query.edit_message_text(
        f"✅ *{category}* selected for:\n_{title}_\n\n"
        f"Add any personal notes for Gemini?\n"
        f"(Real details, specific angle, things to mention)\n\n"
        f"Example: _'mention how I debugged the Pinecone connection issue at 2am'_\n\n"
        f"Or tap Skip to generate now:",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("⚡ Skip — Generate Now", callback_data="notes:skip")]
        ])
    )
    state['mode'] = 'awaiting_notes'


async def generate_with_notes(update: Update, context: ContextTypes.DEFAULT_TYPE, notes: str):
    title    = context.user_data.get('pending_title') or state.get('pending_title', '')
    category = context.user_data.get('pending_category') or state.get('pending_category', 'Machine Learning')
    state['mode'] = None
    state['pending_notes'] = notes

    await update.message.reply_text(
        f"⏳ Generating with Gemini...\n\n"
        f"*Title:* {title}\n"
        f"*Category:* {category}\n"
        f"*Notes:* {notes[:100]}\n\n"
        f"Takes 20–40 seconds...",
        parse_mode='Markdown'
    )
    await _do_generate(update.message, context, title, category, notes)


async def handle_notes_skip(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if not authorized(update): return
    await query.answer()
    state['mode'] = None
    state['pending_notes'] = ''

    title    = context.user_data.get('pending_title') or state.get('pending_title', '')
    category = context.user_data.get('pending_category') or state.get('pending_category', 'Machine Learning')

    await query.edit_message_text(
        f"⏳ Generating with Gemini...\n\n"
        f"*Title:* {title}\n"
        f"*Category:* {category}\n\n"
        f"Takes 20–40 seconds...",
        parse_mode='Markdown'
    )
    await _do_generate(query.message, context, title, category, '')


async def _do_generate(message, context, title: str, category: str, notes: str):
    try:
        post = generate_post(title, category, notes)
        state['pending'] = post

        bot = context.bot
        chat_id = TELEGRAM_CHAT_ID

        # ── Send summary card ─────────────────────────────────────────────────
        summary = (
            f"✅ *Post Generated*\n\n"
            f"📝 *Words:* {post['word_count']} "
            f"({'✅ Good length' if 300 <= post['word_count'] <= 500 else '⚠️ Check length'})\n"
            f"⏱ *Read time:* {post['readTime']}\n\n"
            f"*Display title:*\n_{post['title']}_\n\n"
            f"*SEO title (Google):*\n_{post.get('seoTitle', post['title'])}_\n\n"
            f"*Meta description:*\n_{post['excerpt']}_\n\n"
            f"*Slug:* `{post['slug']}`\n"
            f"*URL:* {SITE_URL}/blog/{post['slug']}\n\n"
            f"*Tags:* {', '.join(post['tags'])}\n\n"
            f"Sending full content below 👇"
        )
        await bot.send_message(chat_id=chat_id, text=summary, parse_mode='Markdown')

        # ── Send full HTML content (split into chunks) ────────────────────────
        clean_content = re.sub('<[^>]+>', '', post['content'])
        await send_long_text(
            bot, chat_id, clean_content,
            prefix="📄 FULL POST CONTENT (plain text preview):\n\n"
        )

        # ── Send Canva image prompt ───────────────────────────────────────────
        await bot.send_message(
            chat_id=chat_id,
            text=f"🎨 *Canva Cover Prompt:*\n\n{post['canva_prompt']}"
        )

        # ── Action buttons ────────────────────────────────────────────────────
        await bot.send_message(
            chat_id=chat_id,
            text="What do you want to do?",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("✅ Publish Now", callback_data="action:publish")],
                [
                    InlineKeyboardButton("✏️ Edit Title",   callback_data="edit:title"),
                    InlineKeyboardButton("✏️ Edit Excerpt", callback_data="edit:excerpt"),
                ],
                [
                    InlineKeyboardButton("🔖 Mark Featured", callback_data="edit:featured"),
                    InlineKeyboardButton("🔄 Regenerate",    callback_data="action:regen"),
                ],
                [InlineKeyboardButton("❌ Discard",          callback_data="action:discard")],
            ])
        )

    except Exception as e:
        await context.bot.send_message(
            chat_id=TELEGRAM_CHAT_ID,
            text=f"❌ Generation failed: {str(e)}\n\nSend /start and try again."
        )


async def handle_edit_button(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if not authorized(update): return
    await query.answer()

    field = query.data.split(':')[1]

    if field == 'featured':
        if state['pending']:
            state['pending']['featured'] = not state['pending'].get('featured', False)
            status = 'ON ⭐' if state['pending']['featured'] else 'OFF'
            await query.edit_message_text(
                f"Featured flag toggled: *{status}*\n\nWhat do you want to do?",
                parse_mode='Markdown',
                reply_markup=InlineKeyboardMarkup([
                    [InlineKeyboardButton("✅ Publish Now",    callback_data="action:publish")],
                    [
                        InlineKeyboardButton("✏️ Edit Title",   callback_data="edit:title"),
                        InlineKeyboardButton("✏️ Edit Excerpt", callback_data="edit:excerpt"),
                    ],
                    [
                        InlineKeyboardButton("🔖 Toggle Featured", callback_data="edit:featured"),
                        InlineKeyboardButton("🔄 Regenerate",   callback_data="action:regen"),
                    ],
                    [InlineKeyboardButton("❌ Discard",         callback_data="action:discard")],
                ])
            )
        return

    prompts = {
        'title':   '✏️ Send the new *title* now:',
        'excerpt': '✏️ Send the new *excerpt* (max 160 chars) now:',
        'content': '✏️ Send the *replacement paragraph* now.\n(Replaces the opening paragraph)',
    }

    state['mode'] = 'awaiting_edit'
    state['edit_field'] = field

    await query.edit_message_text(
        prompts.get(field, f'✏️ Send new value for *{field}*:'),
        parse_mode='Markdown'
    )


async def apply_edit(update: Update, context: ContextTypes.DEFAULT_TYPE, new_value: str):
    field = state.get('edit_field')
    state['mode'] = None
    state['edit_field'] = None

    if not state['pending'] or not field:
        await update.message.reply_text("❌ No post in progress. Send /start.")
        return

    if field == 'title':
        state['pending']['title'] = new_value
        state['pending']['slug'] = re.sub(r'[^a-z0-9]+', '-', new_value.lower()).strip('-')
        state['pending']['whatsapp_text'] = generate_whatsapp_status(
            new_value, state['pending']['slug'], state['pending']['category']
        )
        state['pending']['canva_prompt'] = generate_canva_prompt(
            new_value, state['pending']['category']
        )
    elif field == 'excerpt':
        state['pending']['excerpt'] = new_value[:160]

    await update.message.reply_text(
        f"✅ *{field.capitalize()}* updated.\n\n"
        f"New value: _{new_value[:120]}_\n\n"
        f"What next?",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("✅ Publish Now",  callback_data="action:publish")],
            [
                InlineKeyboardButton("✏️ Edit Title",   callback_data="edit:title"),
                InlineKeyboardButton("✏️ Edit Excerpt", callback_data="edit:excerpt"),
            ],
            [
                InlineKeyboardButton("🔖 Mark Featured", callback_data="edit:featured"),
                InlineKeyboardButton("🔄 Regenerate",   callback_data="action:regen"),
            ],
            [InlineKeyboardButton("❌ Discard",       callback_data="action:discard")],
        ])
    )


async def handle_action(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if not authorized(update): return
    await query.answer()

    action = query.data.split(':')[1]

    if action == 'discard':
        state['pending'] = None
        state['mode'] = None
        await query.edit_message_text("❌ Post discarded. Send a new title anytime.")
        return

    if action == 'regen':
        post = state['pending']
        if not post:
            await query.edit_message_text("❌ No post. Send /start.")
            return
        await query.edit_message_text("🔄 Regenerating with Gemini...")
        await _do_generate(
            query.message, context,
            post['title'], post['category'], state.get('pending_notes', '')
        )
        return

    if action == 'publish':
        post = state['pending']
        if not post:
            await query.edit_message_text("❌ No post found. Send /start.")
            return

        await query.edit_message_text("⏳ Committing to GitHub...")

        success = commit_to_github(post)

        if success:
            post_url = f"{SITE_URL}/blog/{post['slug']}"
            state['pending'] = None

            # Send WhatsApp status text separately
            await context.bot.send_message(
                chat_id=TELEGRAM_CHAT_ID,
                text=f"📱 *WhatsApp Status — copy this:*\n\n{post['whatsapp_text']}",
                parse_mode='Markdown'
            )

            await query.edit_message_text(
                f"🚀 *Published!*\n\n"
                f"*Post:* {post['title']}\n"
                f"*URL:* {post_url}\n\n"
                f"GitHub Actions running:\n"
                f"• ✅ Site deploying (30 sec)\n"
                f"• ⏳ Telegram notification (1 min)\n"
                f"• ⏳ Dev.to crosspost (1 min)\n"
                f"• ⏳ Brevo newsletter (1 min)\n\n"
                f"WhatsApp text sent above 👆\n\n"
                f"Actions log:\n"
                f"github.com/{GITHUB_REPO}/actions",
                parse_mode='Markdown'
            )
        else:
            await query.edit_message_text(
                "❌ GitHub commit failed.\n"
                "Check MAIN secret has repo write scope.\n"
                "Post still saved — tap Publish again or /start."
            )


async def status_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not authorized(update): return
    pages = [
        ('Homepage', SITE_URL),
        ('Blog',     f"{SITE_URL}/blog"),
        ('Services', f"{SITE_URL}/services"),
        ('Freelance',f"{SITE_URL}/freelance"),
    ]
    msg = "🔍 *Site Health*\n\n"
    for name, url in pages:
        try:
            r = requests.get(url, timeout=8)
            ms = round(r.elapsed.total_seconds() * 1000)
            icon = '✅' if r.status_code == 200 else '❌'
            msg += f"{icon} {name}: {r.status_code} ({ms}ms)\n"
        except Exception:
            msg += f"❌ {name}: Timeout\n"
    await update.message.reply_text(msg, parse_mode='Markdown')


async def stats_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not authorized(update): return

    # 1. Get Brevo subscriber count (Primary via Vercel endpoint, fallback to direct Brevo)
    sub_count = 'N/A'
    try:
        r = requests.get(
            "https://adithya-ai-hub.vercel.app/api/subscribers",
            headers={'x-secret-key': NEWSLETTER_SECRET},
            timeout=10
        )
        if r.status_code == 200:
            sub_count = r.json().get('count', 'N/A')
    except Exception:
        pass

    if sub_count == 'N/A':
        brevo_key = os.environ.get('BREVO_API_KEY', '')
        brevo_list = os.environ.get('BREVO_LIST_ID', '3')
        if brevo_key:
            try:
                r = requests.get(
                    f"https://api.brevo.com/v3/contacts/lists/{brevo_list}",
                    headers={'api-key': brevo_key},
                    timeout=10
                )
                if r.status_code == 200:
                    sub_count = r.json().get('uniqueSubscribers', 'N/A')
            except Exception:
                pass

    # 2. Get GitHub commit count
    commit_count = 'N/A'
    if GITHUB_PAT:
        try:
            r = requests.get(
                f"https://api.github.com/repos/{GITHUB_REPO}/commits?per_page=100",
                headers={'Authorization': f'token {GITHUB_PAT}'},
                timeout=10
            )
            if r.status_code == 200:
                commit_count = len(r.json())
        except Exception:
            pass

    # 3. Get total blog post count from posts.ts
    total_posts = 'N/A'
    try:
        content, _ = get_posts_file()
        array_match = re.search(r'posts\s*(?::\s*[^=]+)?=\s*\[', content)
        scope = content[array_match.end():] if array_match else content
        total_posts = len(re.findall(r"slug:\s*['\"`]", scope))
    except Exception:
        pass

    today = datetime.now().strftime('%Y-%m-%d')

    await update.message.reply_text(
        f"📊 *Blog Stats*\n\n"
        f"📧 Subscribers: *{sub_count}*\n"
        f"📝 Published posts: *{total_posts}*\n"
        f"💻 Recent commits: *{commit_count}*\n"
        f"🌐 Site: {SITE_URL}\n"
        f"📅 Date: {today}\n\n"
        f"Full analytics in Brevo → Reports",
        parse_mode='Markdown'
    )


async def cancel_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not authorized(update): return
    state['pending'] = None
    state['mode'] = None
    await update.message.reply_text("❌ Cancelled. Send any title to start a new post.")


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    if not TELEGRAM_BOT_TOKEN:
        print("❌ TELEGRAM_BOT_TOKEN is not configured.")
        return

    # Start dummy HTTP health check server for Render in a daemon thread
    threading.Thread(target=run_http_server, daemon=True).start()
    print(f"🌐 Health check HTTP server active on port {os.environ.get('PORT', 8080)}")

    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    app.add_handler(CommandHandler('start',  start))
    app.add_handler(CommandHandler('status', status_command))
    app.add_handler(CommandHandler('stats',  stats_command))
    app.add_handler(CommandHandler('cancel', cancel_command))

    app.add_handler(CallbackQueryHandler(handle_category_select, pattern='^cat:'))
    app.add_handler(CallbackQueryHandler(handle_notes_skip,      pattern='^notes:skip'))
    app.add_handler(CallbackQueryHandler(handle_edit_button,     pattern='^edit:'))
    app.add_handler(CallbackQueryHandler(handle_action,          pattern='^action:'))

    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("🤖 Adithya Hub Bot v2 running...")
    app.run_polling(drop_pending_updates=True)


if __name__ == '__main__':
    main()
