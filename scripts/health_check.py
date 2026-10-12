import os
import sys
import requests
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def check_url(url):
    try:
        r = requests.get(url, timeout=10)
        return r.status_code, round(r.elapsed.total_seconds() * 1000)
    except Exception as e:
        return 0, 0

def send_telegram(token, chat_id, message):
    try:
        requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={'chat_id': chat_id, 'text': message, 'parse_mode': 'Markdown'}
        )
    except Exception as e:
        print(f"❌ Telegram send error: {e}")

def main():
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    site_url = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev')

    pages = [
        ('Homepage', site_url),
        ('Blog', f"{site_url}/blog"),
        ('Services', f"{site_url}/services"),
        ('Freelance', f"{site_url}/freelance"),
        ('About', f"{site_url}/about"),
    ]

    results = []
    all_ok = True

    for name, url in pages:
        status, ms = check_url(url)
        ok = status == 200
        if not ok:
            all_ok = False
        results.append((name, status, ms, ok))

    if not all_ok:
        # Alert — something is down
        msg = f"🚨 *Site Health Alert — {site_url}*\n\n"
        for name, status, ms, ok in results:
            icon = '✅' if ok else '❌'
            msg += f"{icon} {name}: {status} ({ms}ms)\n"
        msg += f"\n⏰ Checked at {datetime.now(timezone.utc).strftime('%H:%M UTC')}"
        if token and chat_id:
            send_telegram(token, chat_id, msg)
            print("❌ Site issues detected — Telegram alert sent")
        else:
            print("❌ Site issues detected — Telegram token or chat ID missing")
    else:
        # Only log to console — no Telegram spam when healthy
        print(f"✅ All {len(pages)} pages healthy")
        for name, status, ms, ok in results:
            print(f"  {name}: {status} — {ms}ms")

if __name__ == '__main__':
    main()
