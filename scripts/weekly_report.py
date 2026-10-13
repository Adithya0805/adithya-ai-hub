import os
import re
import sys
import base64
import requests
from datetime import datetime, timedelta, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    token    = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id  = os.environ.get('TELEGRAM_CHAT_ID', '')
    brevo_key= os.environ.get('BREVO_API_KEY', '')
    brevo_id = os.environ.get('BREVO_LIST_ID', '3')
    gh_pat   = os.environ.get('MAIN') or os.environ.get('GITHUB_PAT') or os.environ.get('GITHUB_TOKEN', '')
    site_url = os.environ.get('SITE_URL', 'https://adithya-ai-hub.vercel.app').rstrip('/')
    newsletter_secret = os.environ.get('NEWSLETTER_SECRET', 'Adithya@0805')

    week_ago = (datetime.now(timezone.utc) - timedelta(days=7)).strftime('%Y-%m-%dT%H:%M:%SZ')
    today    = datetime.now().strftime('%B %d, %Y')

    # 1. Subscriber count (Primary via Vercel active Brevo endpoint, fallback to direct Brevo API)
    sub_count = 'N/A'
    try:
        r = requests.get(
            "https://adithya-ai-hub.vercel.app/api/subscribers",
            headers={'x-secret-key': newsletter_secret},
            timeout=10
        )
        if r.ok:
            sub_count = r.json().get('count', 'N/A')
    except Exception:
        pass

    if sub_count == 'N/A' and brevo_key:
        try:
            r = requests.get(
                f"https://api.brevo.com/v3/contacts/lists/{brevo_id}",
                headers={'api-key': brevo_key},
                timeout=10
            )
            if r.ok:
                sub_count = r.json().get('uniqueSubscribers', 'N/A')
        except Exception:
            pass

    # 2. Commits this week
    commits_this_week = 0
    try:
        headers = {'Authorization': f'token {gh_pat}'} if gh_pat else {}
        r = requests.get(
            f"https://api.github.com/repos/Adithya0805/adithya-ai-hub/commits"
            f"?since={week_ago}&per_page=100",
            headers=headers,
            timeout=10
        )
        if r.ok and isinstance(r.json(), list):
            commits_this_week = len(r.json())
    except Exception:
        pass

    # 3. Total posts (from local src/data/posts.ts or GitHub API)
    total_posts = 'N/A'
    try:
        if os.path.exists('src/data/posts.ts'):
            with open('src/data/posts.ts', 'r', encoding='utf-8') as f:
                content = f.read()
        else:
            headers = {'Authorization': f'token {gh_pat}'} if gh_pat else {}
            r = requests.get(
                "https://api.github.com/repos/Adithya0805/adithya-ai-hub/contents/src/data/posts.ts",
                headers=headers,
                timeout=10
            )
            content = base64.b64decode(r.json()['content']).decode('utf-8') if r.ok else ''

        if content:
            array_match = re.search(r'posts\s*(?::\s*[^=]+)?=\s*\[', content)
            scope = content[array_match.end():] if array_match else content
            total_posts = len(re.findall(r"slug:\s*['\"`]", scope))
    except Exception:
        pass

    # 4. Site health
    pages = ['', '/blog', '/services', '/freelance']
    healthy = 0
    for p in pages:
        try:
            if requests.get(f"{site_url}{p}", timeout=8).status_code == 200:
                healthy += 1
        except Exception:
            pass

    msg = (
        f"📊 *Weekly Report — {today}*\n\n"
        f"📧 *Subscribers:* {sub_count}\n"
        f"📝 *Total blog posts:* {total_posts}\n"
        f"💻 *Commits this week:* {commits_this_week}\n"
        f"🌐 *Pages healthy:* {healthy}/{len(pages)}\n\n"
        f"*Next week goals:*\n"
        f"• Publish 1 new blog post\n"
        f"• Apply to 5 ML/AI Engineer roles\n"
        f"• Update one freelance client\n\n"
        f"Keep building. 🔥\n"
        f"{site_url}"
    )

    if token and chat_id:
        res = requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={'chat_id': chat_id, 'text': msg, 'parse_mode': 'Markdown'}
        )
        if res.status_code == 200:
            print("✅ Weekly report sent")
        else:
            print(f"❌ Telegram error: {res.text}")
    else:
        print("ℹ️ Previewing weekly report:")
        print(msg)

if __name__ == '__main__':
    main()
