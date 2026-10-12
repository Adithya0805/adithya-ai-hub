import os
import sys
import requests

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    title = os.environ.get('POST_TITLE', '')
    slug = os.environ.get('POST_SLUG', '')
    excerpt = os.environ.get('POST_EXCERPT', '')
    category = os.environ.get('POST_CATEGORY', '')
    site_url = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev')

    if not token or not chat_id:
        print("❌ Telegram error: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing")
        return

    post_url = f"{site_url}/blog/{slug}"

    message = f"""📝 *New Blog Post Published*

*{title}*

_{excerpt[:180]}..._

🏷 {category}
🔗 {post_url}

#AI #MachineLearning #TamilNadu"""

    response = requests.post(
        f"https://api.telegram.org/bot{token}/sendMessage",
        json={
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'Markdown',
            'disable_web_page_preview': False
        }
    )

    if response.status_code == 200:
        print("✅ Telegram: Posted successfully")
    else:
        print(f"❌ Telegram error: {response.text}")

if __name__ == '__main__':
    main()
