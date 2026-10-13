import os
import re
import sys
import requests
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    site_url = os.environ.get('SITE_URL', 'https://adithya-ai-hub.vercel.app').rstrip('/')
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    newsletter_secret = os.environ.get('NEWSLETTER_SECRET', 'Adithya@0805')

    week = datetime.now(timezone.utc).strftime('%B %d, %Y')

    # Extract latest post slug from src/data/posts.ts
    latest_slug = "building-and-deploying-aranya-organic-dairy-farm-live-ai-engineer-guide"
    latest_title = f"Weekly Digest — {week}"
    try:
        with open('src/data/posts.ts', 'r', encoding='utf-8') as f:
            content = f.read()
        array_match = re.search(r'posts\s*(?::\s*[^=]+)?=\s*\[', content)
        scope = content[array_match.end():] if array_match else content
        slug_match = re.search(r"slug:\s*['\"`]([^'\"`]+)['\"`]", scope)
        title_match = re.search(r"title:\s*['\"`]([^'\"`]+)['\"`]", scope)
        if slug_match:
            latest_slug = slug_match.group(1)
        if title_match:
            latest_title = f"Weekly Digest ({week}): {title_match.group(1)}"
    except Exception:
        pass

    # Send Weekly Digest via Vercel API endpoint (uses Vercel's active Brevo API Key)
    vercel_api_url = "https://adithya-ai-hub.vercel.app/api/send-newsletter"
    try:
        res = requests.post(
            vercel_api_url,
            headers={
                "Content-Type": "application/json",
                "x-secret-key": newsletter_secret
            },
            json={
                "postTitle": latest_title,
                "postSlug": latest_slug,
                "postExcerpt": "Every Monday I send a brief update on what I shipped, learned, or published this week on Adithya AI Hub. Check out our latest featured engineering breakdown below.",
                "postCategory": "WEEKLY DIGEST",
                "postReadTime": "5 min read"
            },
            timeout=25
        )
        if res.status_code == 200:
            data = res.json()
            print(f"✅ Weekly digest sent via Brevo to {data.get('sentCount', 0)} subscriber(s)")
        else:
            print(f"❌ Weekly digest error: {res.status_code} — {res.text}")
    except Exception as e:
        print(f"❌ Weekly digest exception: {e}")

    # Notify on Telegram if configured
    if token and chat_id:
        requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={
                'chat_id': chat_id,
                'text': f"📧 Weekly newsletter sent to subscribers — {week}",
                'parse_mode': 'Markdown'
            }
        )

if __name__ == '__main__':
    main()
