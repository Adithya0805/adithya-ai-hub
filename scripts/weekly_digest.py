import os
import sys
import requests
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    api_key = os.environ.get('BREVO_API_KEY')
    list_id_raw = os.environ.get('BREVO_LIST_ID')
    site_url = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev')
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    if not api_key or not list_id_raw:
        print("❌ Brevo error: BREVO_API_KEY or BREVO_LIST_ID missing")
        return

    try:
        list_id = int(list_id_raw)
    except ValueError:
        print(f"❌ Brevo error: BREVO_LIST_ID '{list_id_raw}' is not an integer")
        return

    week = datetime.now(timezone.utc).strftime('%B %d, %Y')

    response = requests.post(
        "https://api.brevo.com/v3/emailCampaigns",
        headers={"api-key": api_key, "Content-Type": "application/json"},
        json={
            "name": f"Weekly Digest — {week}",
            "subject": f"This week on Adithya AI Hub",
            "sender": {"name": "Adithya | AI Hub", "email": "adithyaadhi0805@gmail.com"},
            "type": "classic",
            "htmlContent": f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 20px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <tr><td style="padding-bottom:32px;border-bottom:1px solid #222;">
        <p style="font-size:18px;font-weight:700;color:#f0f0f0;margin:0;">Adithya AI Hub</p>
        <p style="font-size:11px;color:#555;letter-spacing:2px;text-transform:uppercase;margin:4px 0 0;font-family:Arial,sans-serif;">Weekly Digest · {week}</p>
      </td></tr>
      <tr><td style="padding:36px 0;">
        <h1 style="font-size:28px;font-weight:400;color:#f0f0f0;margin:0 0 20px;">What happened this week</h1>
        <p style="font-size:15px;color:#888;line-height:1.8;margin:0 0 32px;font-family:Arial,sans-serif;">
          Every Monday I send a brief update on what I shipped, learned, or published this week.
          Check the full blog for deep-dive posts.
        </p>
        <a href="{site_url}/blog"
           style="display:inline-block;background:#c8a96e;color:#0a0a0a;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:4px;font-family:Arial,sans-serif;">
          Read All Posts →
        </a>
      </td></tr>
      <tr><td style="border-top:1px solid #222;padding-top:24px;padding-bottom:48px;">
        <p style="font-size:12px;color:#333;margin:0;font-family:Arial,sans-serif;">
          <a href="{site_url}" style="color:#555;">{site_url}</a> ·
          <a href="{{{{unsubscribeUrl}}}}" style="color:#333;">Unsubscribe</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>
            """,
            "recipients": {"listIds": [list_id]},
            "scheduledAt": datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    )

    if response.status_code in [200, 201]:
        print("✅ Weekly digest scheduled via Brevo")
    else:
        print(f"❌ Brevo error: {response.text}")

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
