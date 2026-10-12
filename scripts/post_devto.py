import os
import sys
import requests

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    api_key = os.environ.get('DEVTO_API_KEY')
    title = os.environ.get('POST_TITLE', '')
    slug = os.environ.get('POST_SLUG', '')
    excerpt = os.environ.get('POST_EXCERPT', '')
    category = os.environ.get('POST_CATEGORY', '')
    site_url = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev')

    if not api_key:
        print("❌ Dev.to error: DEVTO_API_KEY missing")
        return

    post_url = f"{site_url}/blog/{slug}"

    tag_map = {
        'Machine Learning': ['machinelearning', 'ai', 'python', 'tutorial'],
        'Interview Prep': ['career', 'interviews', 'programming', 'beginners'],
        'Career': ['career', 'ai', 'webdev', 'beginners'],
        'Python': ['python', 'programming', 'tutorial', 'beginners'],
    }
    tags = tag_map.get(category, ['ai', 'machinelearning', 'python', 'tutorial'])

    # Dev.to crosspost — canonical URL points to your site
    body = f"""{excerpt}

---

*This is a crosspost. Read the full article with code examples at:*

**[{title}]({post_url})**

---

*Written by Adithya Kuppusamy — AI Engineer from Tamil Nadu, India.*
*Portfolio: [{site_url}]({site_url})*"""

    payload = {
        "article": {
            "title": title,
            "body_markdown": body,
            "published": True,
            "tags": tags[:4],
            "canonical_url": post_url,
            "description": excerpt[:155]
        }
    }

    response = requests.post(
        "https://dev.to/api/articles",
        headers={
            "api-key": api_key,
            "Content-Type": "application/json"
        },
        json=payload
    )

    if response.status_code in [200, 201]:
        data = response.json()
        print(f"✅ Dev.to: Posted — {data.get('url', 'no URL')}")
    else:
        print(f"❌ Dev.to error: {response.status_code} — {response.text}")

if __name__ == '__main__':
    main()
