import os
import sys
import requests

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    title = os.environ.get('POST_TITLE', '')
    slug = os.environ.get('POST_SLUG', '')
    excerpt = os.environ.get('POST_EXCERPT', '')
    category = os.environ.get('POST_CATEGORY', '')
    read_time = os.environ.get('POST_READ_TIME', '8 min read')
    site_url = os.environ.get('SITE_URL', 'https://adithya-ai-hub.vercel.app').rstrip('/')
    newsletter_secret = os.environ.get('NEWSLETTER_SECRET', 'Adithya@0805')

    if not title or not slug:
        print("❌ Brevo error: POST_TITLE or POST_SLUG missing")
        return

    # 1. Primary: Dispatch via Vercel API endpoint (uses Vercel's active Brevo API Key & authorized IP)
    vercel_api_url = "https://adithya-ai-hub.vercel.app/api/send-newsletter"
    try:
        res = requests.post(
            vercel_api_url,
            headers={
                "Content-Type": "application/json",
                "x-secret-key": newsletter_secret
            },
            json={
                "postTitle": title,
                "postSlug": slug,
                "postExcerpt": excerpt,
                "postCategory": category,
                "postReadTime": read_time
            },
            timeout=25
        )
        if res.status_code == 200:
            data = res.json()
            sent_count = data.get('sentCount', 0)
            total = data.get('totalSubscribers', 0)
            print(f"✅ Brevo: Newsletter sent to {sent_count}/{total} subscriber(s) in List #{data.get('listId', 3)}!")
            return
        else:
            print(f"⚠️ Vercel newsletter endpoint returned {res.status_code}: {res.text}")
    except Exception as e:
        print(f"⚠️ Vercel endpoint exception: {e}")

    # 2. Fallback: Direct Brevo API call if BREVO_API_KEY is valid
    api_key = os.environ.get('BREVO_API_KEY')
    list_id = int(os.environ.get('BREVO_LIST_ID', '3'))
    if not api_key:
        print("❌ Brevo error: Could not send newsletter")
        return

    list_res = requests.get(
        f"https://api.brevo.com/v3/contacts/lists/{list_id}/contacts?limit=50&offset=0",
        headers={"api-key": api_key, "Content-Type": "application/json"}
    )
    if list_res.status_code != 200:
        print(f"❌ Brevo error: {list_res.status_code} — {list_res.text}")
        return

    contacts = list_res.json().get('contacts', [])
    post_url = f"{site_url}/blog/{slug}"
    sent = 0
    for c in contacts:
        email = c.get('email')
        if not email:
            continue
        r = requests.post(
            "https://api.brevo.com/v3/smtp/email",
            headers={"api-key": api_key, "Content-Type": "application/json"},
            json={
                "sender": {"name": "Adithya | AI Hub", "email": "adithyaadhi0805@gmail.com"},
                "to": [{"email": email}],
                "subject": f"New on Adithya AI Hub: {title}",
                "htmlContent": f"<h1>{title}</h1><p>{excerpt}</p><p><a href='{post_url}'>Read Full Article →</a></p>"
            }
        )
        if r.status_code in [200, 201]:
            sent += 1

    print(f"✅ Brevo: Direct email sent to {sent} subscriber(s)")

if __name__ == '__main__':
    main()
