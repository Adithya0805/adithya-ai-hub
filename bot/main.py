import os
import sys
import json
import base64
import re
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
import requests
import google.generativeai as genai
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

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
try:
    model = genai.GenerativeModel('gemini-2.5-flash')
except Exception:
    model = genai.GenerativeModel('gemini-flash-latest')

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


# ── GEMINI: Generate high-quality personal post ───────────────────────────────
def generate_post(title: str, category: str, custom_notes: str = '') -> dict:
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    date = datetime.now().strftime('%Y-%m-%d')

    # Pull in real project context based on category
    project_context = {
        'Machine Learning': (
            'Your real projects: MediGuard V2 (LangGraph 5-agent clinical AI, '
            'AWS Bedrock, Pinecone RAG over WHO/ICD-10/OpenFDA), TownRise AI '
            '(Gemini + Supabase + OpenStreetMap nightly refresh), Urimai AI '
            '(64 Tamil Nadu gov schemes, 199 eligibility rules, Tamil NLP). '
            'Reference these where relevant.'
        ),
        'Interview Prep': (
            'You appeared for TCS NQT April 2026 at iON Digital Zone Vellore — '
            'Aptitude medium/tight, Verbal harder than expected, Coding Q1 partial only. '
            'Also prepared for Infosys SP/DSE April 26 2026. Declined Imagecon India '
            'Technical Mentor role — wanted to build, not teach. '
            'AWS Cloud Practitioner failed by narrow margin, retaking when feasible. '
            'Use these real experiences to make the post authentic.'
        ),
        'Career': (
            'You are from Ambur, Tamil Nadu — a town known for leather, not software. '
            'Middle-class family. Motivated by making your family proud. '
            'Run FutureLogic AI targeting Tamil Nadu SMEs. '
            'Freelance clients: Aranya Organic Dairy Farm (aranyaorganicdairyfarm.com), '
            'SR Travels (sr-travels-tau.vercel.app), Dino Leathers (leather goods, Ambur). '
            'Job-seeking for ML/AI Engineer roles while building.'
        ),
        'Python': (
            'You use Python for: FastAPI backends, LangGraph agents, Pinecone RAG pipelines, '
            'Binance trading bot (HMAC-SHA256 signing), GitHub Actions automation scripts, '
            'Whisper Tamil speech-to-text (SHAKTI project), DeepEval safety testing. '
            'Always show real code from your actual work.'
        ),
        'Project': (
            'Your flagship projects: MediGuard V2 (healthcare AI, FastAPI + LangGraph + '
            'AWS Bedrock + Pinecone + Supabase + Next.js, deployed Cloud Run), '
            'Urimai AI (Tamil Nadu gov scheme assistant, 49/49 tests passing, '
            '18 REST endpoints, production deployed), '
            'TownRise AI (real estate intelligence, Next.js + Supabase + Gemini, '
            'nightly GitHub Actions cron), '
            'Dino Leathers (D2C PWA, WhatsApp checkout, Ambur leather market). '
            'Be specific — name real files, real errors you hit, real decisions you made.'
        ),
        'Cloud & AI': (
            'Real cloud experience: AWS Bedrock (Claude 3 Sonnet/Haiku inference, '
            'Titan embeddings, IAM setup, us-east-1 region), '
            'Google Cloud Run (MediGuard V2 backend deployment), '
            'GitHub Actions (nightly cron, CI/CD, auto-publish pipeline), '
            'Vercel (all frontends), Supabase (PostgreSQL + RLS + Storage + Auth). '
            'Include real errors you hit and how you fixed them.'
        ),
    }

    context_str = project_context.get(category, project_context['Machine Learning'])
    custom_section = f'\nExtra notes from author: {custom_notes}' if custom_notes else ''

    prompt = f"""You are Adithya Kuppusamy writing a blog post for {SITE_URL}.

REAL IDENTITY:
- 2025 B.Tech AI & DS graduate, Dhanalakshmi Srinivasan College, Coimbatore
- From Ambur, Tamil Nadu (leather town, not a tech hub)
- Middle-class family, first-gen tech career
- Stack: Python, LangGraph, FastAPI, AWS Bedrock, Pinecone, Next.js, Supabase, Gemini API
- Currently job-seeking ML/AI Engineer roles while freelancing via FutureLogic AI

REAL PROJECT CONTEXT FOR THIS CATEGORY:
{context_str}
{custom_section}

POST TITLE: {title}
CATEGORY: {category}
TARGET AUDIENCE: Indian engineering students and freshers, especially from Tamil Nadu

STRICT CONTENT RULES:
1. MINIMUM 1000 words — no exceptions
2. FIRST PERSON ALWAYS — "I built", "I learned", "When I was working on"
3. ANTI-GENERIC — never write "In today's rapidly evolving AI landscape"
4. START with a real problem or personal moment — not a definition
5. INCLUDE at least 2 real code blocks with <pre><code> tags
6. MENTION at least one Tamil Nadu / South India reference naturally
7. INCLUDE one section called "What I Got Wrong" or "What Actually Happened"
   — show real mistakes, not just successes
8. END with: <p><em>— Adithya Kuppusamy, AI Engineer, Ambur, Tamil Nadu</em></p>

HTML RULES:
- Use ONLY these tags: <h2> <h3> <p> <ul> <li> <pre><code> <strong> <em>
- NO markdown, NO backticks outside code blocks
- NO triple backticks — use <pre><code> instead
- Start DIRECTLY with <h2> — no preamble

Write the complete post now. Make it the kind of post that a Tamil Nadu engineering
student reads at midnight and thinks "this person gets it."
"""

    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.85,
            max_output_tokens=4000,
        )
    )
    content = response.text.strip()

    # Generate excerpt
    excerpt_prompt = (
        f"Write ONE compelling sentence (max 160 chars) as excerpt for a blog post titled: "
        f"'{title}'. Be specific. Mention Tamil Nadu or the real tech stack if relevant. "
        f"Output only the sentence, no quotes."
    )
    excerpt = model.generate_content(excerpt_prompt).text.strip()[:160]

    # Generate Canva image prompt
    canva_prompt = generate_canva_prompt(title, category)

    # Generate WhatsApp status text
    whatsapp_text = generate_whatsapp_status(title, slug, category)

    # Estimate read time
    word_count = len(re.sub('<[^>]+>', '', content).split())
    read_time = f"{max(6, word_count // 200)} min read"

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
    excerpt_escaped = post['excerpt'].replace(chr(39), chr(92) + chr(39))

    return (
        f"  {{\n"
        f"    slug: '{post['slug']}',\n"
        f"    title: '{title_escaped}',\n"
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
            f"✅ *Post Generated — {post['word_count']} words*\n\n"
            f"*Slug:* `{post['slug']}`\n"
            f"*Category:* {post['category']}\n"
            f"*Read time:* {post['readTime']}\n\n"
            f"*Excerpt:*\n_{post['excerpt']}_\n\n"
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
