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

# Config
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = int(os.environ.get('TELEGRAM_CHAT_ID', '0')) if os.environ.get('TELEGRAM_CHAT_ID') else 0
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
GITHUB_PAT = os.environ.get('MAIN') or os.environ.get('GITHUB_PAT', '')
GITHUB_REPO = os.environ.get('GITHUB_REPO', 'Adithya0805/adithya-ai-hub')
SITE_URL = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev').rstrip('/')

# Init Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
try:
    model = genai.GenerativeModel('gemini-2.5-flash')
except Exception:
    model = genai.GenerativeModel('gemini-flash-latest')

# State storage (in-memory — bot is single user)
pending_post = {}


# ─── RENDER HEALTH CHECK SERVER ───────────────────────────────────────────────
# Render free Web Services require listening on $PORT to mark deployment as live

class HealthCheckHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"Adithya AI Hub Telegram Bot is active and running!")

    def log_message(self, format, *args):
        pass  # Suppress HTTP log spam in console

def run_http_server():
    port = int(os.environ.get('PORT', 8080))
    server = HTTPServer(('0.0.0.0', port), HealthCheckHandler)
    server.serve_forever()


# ─── SECURITY: Only respond to your Telegram ID ───────────────────────────────

def is_authorized(update: Update) -> bool:
    if not TELEGRAM_CHAT_ID:
        return True
    return update.effective_user.id == TELEGRAM_CHAT_ID


# ─── GEMINI: Generate full blog post ──────────────────────────────────────────

def generate_post(title: str, category: str) -> dict:
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    date = datetime.now().strftime('%Y-%m-%d')

    prompt = f"""You are Adithya Kuppusamy, a 2025 B.Tech AI & Data Science graduate from Tamil Nadu, India.
Write a complete, genuine, personal blog post for your portfolio site adithyaai.is-cool.dev.

POST TITLE: {title}
CATEGORY: {category}

STRICT REQUIREMENTS:
- Minimum 800 words of real, readable content
- First person voice — "I built", "I learned", "In my experience"
- Mention Tamil Nadu context where relevant
- Include real code examples with <pre><code> tags where relevant
- Use these HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <pre><code>, <strong>
- End with your signature: — Adithya Kuppusamy, AI Engineer, Tamil Nadu
- NO markdown, NO backticks — pure HTML content only
- Make it genuinely useful to Indian engineering students

Write ONLY the HTML content body. No title tag. No head tag. Start directly with <h2>.
"""

    response = model.generate_content(prompt)
    content = response.text.strip()

    # Generate excerpt
    excerpt_prompt = f"Write a 1-sentence excerpt (max 180 chars) for this blog post titled: {title}. Be specific and compelling. Output only the sentence."
    excerpt = model.generate_content(excerpt_prompt).text.strip()[:180]

    # Estimate read time
    word_count = len(re.sub('<[^>]+>', '', content).split())
    read_time = f"{max(5, word_count // 200)} min read"

    tag_map = {
        'Machine Learning': ['LangChain', 'Python', 'AI', 'Machine Learning'],
        'Interview Prep': ['TCS', 'Interview', 'Career', 'Fresher', 'Campus Placement'],
        'Career': ['Career', 'Tamil Nadu', 'AI Engineer', 'OpenToWork'],
        'Python': ['Python', 'Tutorial', 'Programming', 'Beginners'],
        'Cloud & AI': ['AWS', 'Cloud', 'AI', 'Python'],
        'Project': ['AI', 'Project', 'Python', 'Machine Learning'],
    }
    tags = tag_map.get(category, ['AI', 'Machine Learning', 'Python'])

    return {
        'slug': slug,
        'title': title,
        'date': date,
        'excerpt': excerpt,
        'tags': tags,
        'category': category,
        'readTime': read_time,
        'featured': False,
        'content': content
    }


# ─── GITHUB: Commit post to posts.ts ──────────────────────────────────────────

def get_current_posts_file():
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/src/data/posts.ts"
    headers = {
        'Authorization': f'token {GITHUB_PAT}',
        'Accept': 'application/vnd.github.v3+json'
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    content = base64.b64decode(data['content']).decode('utf-8')
    sha = data['sha']
    return content, sha


def build_post_entry(post: dict) -> str:
    tags_str = json.dumps(post['tags'])
    # Escape backticks and template expressions in content
    content_escaped = post['content'].replace('`', r'\`').replace('${', r'\${')
    title_escaped = post['title'].replace("'", "\\'")
    excerpt_escaped = post['excerpt'].replace("'", "\\'")
    slug = post['slug']
    date = post['date']
    category = post['category']
    read_time = post['readTime']
    featured = str(post['featured']).lower()

    return f"""  {{
    slug: '{slug}',
    title: '{title_escaped}',
    date: '{date}',
    excerpt: '{excerpt_escaped}',
    tags: {tags_str},
    category: '{category}',
    readTime: '{read_time}',
    featured: {featured},
    content: `
{content_escaped}
    `
  }}"""


def commit_post_to_github(post: dict) -> bool:
    try:
        current_content, sha = get_current_posts_file()
        post_entry = build_post_entry(post)

        # Insert new post as first item in the array
        # Supports both `export const posts: Post[] = [` and `export const blogPosts`
        candidates = [
            'export const posts: Post[] = [',
            'export const posts = [',
            'export const blogPosts: BlogPost[] = [',
            'export const blogPosts = ['
        ]
        insert_marker = None
        for candidate in candidates:
            if candidate in current_content:
                insert_marker = candidate
                break

        if not insert_marker:
            print("❌ Insert marker for posts array not found in src/data/posts.ts")
            return False

        new_content = current_content.replace(
            insert_marker,
            f"{insert_marker}\n{post_entry},"
        )

        encoded = base64.b64encode(new_content.encode('utf-8')).decode('utf-8')

        url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/src/data/posts.ts"
        headers = {
            'Authorization': f'token {GITHUB_PAT}',
            'Accept': 'application/vnd.github.v3+json'
        }
        payload = {
            'message': f'blog: auto-publish — {post["title"][:60]}',
            'content': encoded,
            'sha': sha
        }

        response = requests.put(url, headers=headers, json=payload)
        return response.status_code in [200, 201]

    except Exception as e:
        print(f"GitHub commit error: {e}")
        return False


# ─── TELEGRAM HANDLERS ─────────────────────────────────────────────────────────

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        return
    await update.message.reply_text(
        "🤖 *Adithya AI Hub Bot*\n\n"
        "Send me a blog post title and I'll:\n"
        "1. Generate full post with Gemini\n"
        "2. Show you a preview\n"
        "3. On approval → commit to GitHub\n"
        "4. GitHub Actions posts everywhere\n\n"
        "Just send me any blog title to start.\n\n"
        "Commands:\n"
        "/start — this message\n"
        "/status — check site health\n"
        "/cancel — cancel current post",
        parse_mode='Markdown'
    )


CATEGORIES = [
    'Machine Learning',
    'Interview Prep',
    'Career',
    'Python',
    'Cloud & AI',
    'Project'
]

async def handle_title(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        return

    title = update.message.text.strip()

    # Skip if it looks like a command
    if title.startswith('/'):
        return

    # Store title in session state (avoids Telegram 64-byte callback_data limit)
    pending_post['title'] = title
    context.user_data['title'] = title

    keyboard = [
        [InlineKeyboardButton(cat, callback_data=f"cat:{i}")]
        for i, cat in enumerate(CATEGORIES)
    ]

    await update.message.reply_text(
        f"📝 Got it: *{title}*\n\nWhich category?",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup(keyboard)
    )


async def handle_category(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if not is_authorized(update):
        return

    await query.answer()
    data = query.data

    if not data.startswith('cat:'):
        return

    try:
        cat_index = int(data.split(':', 1)[1])
        category = CATEGORIES[cat_index]
    except (ValueError, IndexError):
        category = 'Machine Learning'

    title = context.user_data.get('title') or pending_post.get('title', '')
    if not title:
        await query.edit_message_text("❌ Title was lost. Please send the title again.")
        return

    pending_post['category'] = category
    context.user_data['category'] = category

    await query.edit_message_text(
        f"⏳ Generating post with Gemini...\n\n"
        f"*Title:* {title}\n"
        f"*Category:* {category}\n\n"
        f"This takes 15–30 seconds.",
        parse_mode='Markdown'
    )

    try:
        post = generate_post(title, category)
        pending_post['data'] = post

        # Preview — show first 600 chars of content (stripped of HTML)
        preview_text = re.sub('<[^>]+>', '', post['content'])[:600]

        await query.edit_message_text(
            f"✅ *Post Generated*\n\n"
            f"*Title:* {post['title']}\n"
            f"*Slug:* `{post['slug']}`\n"
            f"*Category:* {post['category']}\n"
            f"*Read time:* {post['readTime']}\n"
            f"*Excerpt:* {post['excerpt']}\n\n"
            f"*Preview (first 600 chars):*\n"
            f"_{preview_text}..._\n\n"
            f"Publish this post?",
            parse_mode='Markdown',
            reply_markup=InlineKeyboardMarkup([
                [
                    InlineKeyboardButton("✅ Publish Now", callback_data="publish:yes"),
                    InlineKeyboardButton("❌ Discard", callback_data="publish:no"),
                ],
                [InlineKeyboardButton("🔄 Regenerate", callback_data="regen:yes")]
            ])
        )

    except Exception as e:
        await query.edit_message_text(
            f"❌ Gemini error: {str(e)}\n\nTry again with /start",
            parse_mode='Markdown'
        )


async def handle_publish(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if not is_authorized(update):
        return

    await query.answer()
    data = query.data

    if data == 'publish:no':
        pending_post.clear()
        context.user_data.clear()
        await query.edit_message_text("❌ Post discarded. Send a new title anytime.")
        return

    if data == 'regen:yes':
        title = context.user_data.get('title') or pending_post.get('title', '')
        category = context.user_data.get('category') or pending_post.get('category', 'Machine Learning')
        if not title:
            await query.edit_message_text("❌ Title was lost. Please send the title again.")
            return

        await query.edit_message_text(f"🔄 Regenerating with Gemini...")
        try:
            post = generate_post(title, category)
            pending_post['data'] = post
            preview_text = re.sub('<[^>]+>', '', post['content'])[:600]
            await query.edit_message_text(
                f"✅ *Regenerated*\n\n"
                f"*Excerpt:* {post['excerpt']}\n\n"
                f"*Preview:*\n_{preview_text}..._\n\nPublish?",
                parse_mode='Markdown',
                reply_markup=InlineKeyboardMarkup([
                    [
                        InlineKeyboardButton("✅ Publish Now", callback_data="publish:yes"),
                        InlineKeyboardButton("❌ Discard", callback_data="publish:no"),
                    ],
                    [InlineKeyboardButton("🔄 Regenerate Again", callback_data="regen:yes")]
                ])
            )
        except Exception as e:
            await query.edit_message_text(f"❌ Error: {e}")
        return

    if data == 'publish:yes':
        post = pending_post.get('data')
        if not post:
            await query.edit_message_text("❌ No post found. Send a title to start again.")
            return

        await query.edit_message_text(
            f"⏳ Committing to GitHub...\n\n"
            f"This triggers GitHub Actions which will post everywhere in ~2 minutes.",
            parse_mode='Markdown'
        )

        success = commit_post_to_github(post)

        if success:
            post_url = f"{SITE_URL}/blog/{post['slug']}"
            pending_post.clear()
            await query.edit_message_text(
                f"🚀 *Published Successfully!*\n\n"
                f"*Post:* {post['title']}\n"
                f"*URL:* {post_url}\n\n"
                f"GitHub Actions is now running:\n"
                f"• ✅ Site updating (30 sec)\n"
                f"• ⏳ Telegram notification (1 min)\n"
                f"• ⏳ Dev.to crosspost (1 min)\n"
                f"• ⏳ Brevo newsletter (1 min)\n\n"
                f"Check Actions tab for live status:\n"
                f"github.com/{GITHUB_REPO}/actions",
                parse_mode='Markdown'
            )
        else:
            await query.edit_message_text(
                "❌ GitHub commit failed.\n\n"
                "Check your MAIN secret has repo write access.\n"
                "Post content is still saved — try /retry or send title again."
            )


async def status_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        return

    pages = [
        ('Homepage', SITE_URL),
        ('Blog', f"{SITE_URL}/blog"),
        ('Services', f"{SITE_URL}/services"),
    ]

    msg = "🔍 *Site Health Check*\n\n"
    for name, url in pages:
        try:
            r = requests.get(url, timeout=8)
            ms = round(r.elapsed.total_seconds() * 1000)
            icon = '✅' if r.status_code == 200 else '❌'
            msg += f"{icon} {name}: {r.status_code} ({ms}ms)\n"
        except:
            msg += f"❌ {name}: Timeout\n"

    await update.message.reply_text(msg, parse_mode='Markdown')


async def cancel_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        return
    pending_post.clear()
    await update.message.reply_text("❌ Cancelled. Send a new title anytime.")


# ─── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    if not TELEGRAM_BOT_TOKEN:
        print("❌ TELEGRAM_BOT_TOKEN is not configured.")
        return

    # Start dummy HTTP health check server for Render in a daemon thread
    threading.Thread(target=run_http_server, daemon=True).start()
    print(f"🌐 Health check HTTP server active on port {os.environ.get('PORT', 8080)}")

    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    app.add_handler(CommandHandler('start', start))
    app.add_handler(CommandHandler('status', status_command))
    app.add_handler(CommandHandler('cancel', cancel_command))
    app.add_handler(CallbackQueryHandler(handle_category, pattern='^cat:'))
    app.add_handler(CallbackQueryHandler(handle_publish, pattern='^publish:'))
    app.add_handler(CallbackQueryHandler(handle_publish, pattern='^regen:'))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_title))

    print("🤖 Bot is running...")
    app.run_polling(drop_pending_updates=True)


if __name__ == '__main__':
    main()
