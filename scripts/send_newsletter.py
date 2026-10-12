import os
import sys
import requests
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    api_key = os.environ.get('BREVO_API_KEY')
    list_id_raw = os.environ.get('BREVO_LIST_ID')

    if not api_key or not list_id_raw:
        print("❌ Brevo error: BREVO_API_KEY or BREVO_LIST_ID missing")
        return

    try:
        list_id = int(list_id_raw)
    except ValueError:
        print(f"❌ Brevo error: BREVO_LIST_ID '{list_id_raw}' is not a valid integer")
        return

    title = os.environ.get('POST_TITLE', '')
    slug = os.environ.get('POST_SLUG', '')
    excerpt = os.environ.get('POST_EXCERPT', '')
    category = os.environ.get('POST_CATEGORY', '')
    read_time = os.environ.get('POST_READ_TIME', '8 min read')
    site_url = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev')

    post_url = f"{site_url}/blog/{slug}"
    scheduled = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

    response = requests.post(
        "https://api.brevo.com/v3/emailCampaigns",
        headers={
            "api-key": api_key,
            "Content-Type": "application/json"
        },
        json={
            "name": f"New Post — {title[:50]}",
            "subject": f"New post: {title}",
            "sender": {
                "name": "Adithya | AI Hub",
                "email": "adithyaadhi0805@gmail.com"
            },
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
      </td></tr>

      <tr><td style="padding:36px 0 28px;">
        <p style="font-size:11px;color:#555;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;font-family:Arial,sans-serif;">
          NEW POST · {category.upper()} · {read_time.upper()}
        </p>
        <h1 style="font-size:30px;font-weight:400;color:#f0f0f0;margin:0 0 20px;line-height:1.2;letter-spacing:-0.5px;">
          {title}
        </h1>
        <p style="font-size:15px;color:#888;line-height:1.8;margin:0 0 32px;font-family:Arial,sans-serif;">
          {excerpt[:280]}
        </p>
        <a href="{post_url}"
           style="display:inline-block;background:#c8a96e;color:#0a0a0a;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:4px;font-family:Arial,sans-serif;">
          Read Full Article →
        </a>
      </td></tr>

      <tr><td style="border-top:1px solid #222;padding-top:28px;padding-bottom:48px;">
        <p style="font-size:14px;font-weight:700;color:#f0f0f0;margin:0 0 4px;">Adithya Kuppusamy</p>
        <p style="font-size:12px;color:#555;margin:0 0 16px;font-family:Arial,sans-serif;">AI Engineer · Tamil Nadu</p>
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
            "scheduledAt": scheduled
        }
    )

    if response.status_code in [200, 201]:
        data = response.json()
        print(f"✅ Brevo: Newsletter scheduled — campaign ID {data.get('id')}")
    else:
        print(f"❌ Brevo error: {response.status_code} — {response.text}")

if __name__ == '__main__':
    main()
