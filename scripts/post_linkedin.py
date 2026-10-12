import os
import sys
import requests

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    token = os.environ.get('LINKEDIN_ACCESS_TOKEN')
    person_urn = os.environ.get('LINKEDIN_PERSON_URN')
    title = os.environ.get('POST_TITLE', '')
    slug = os.environ.get('POST_SLUG', '')
    excerpt = os.environ.get('POST_EXCERPT', '')
    category = os.environ.get('POST_CATEGORY', '')
    site_url = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev')

    if not token or not person_urn:
        print("❌ LinkedIn error: LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN missing")
        return

    post_url = f"{site_url}/blog/{slug}"

    # LinkedIn post — no link in body, put link in comment
    # This avoids LinkedIn suppressing reach for external links
    commentary = f"""Just published a new post on Adithya AI Hub 🚀

{title}

{excerpt[:300]}

Category: {category}

Read full post: {post_url}

#AI #MachineLearning #TamilNadu #OpenToWork #AIEngineer #FreshersIndia"""

    payload = {
        "author": person_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": commentary
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    response = requests.post(
        "https://api.linkedin.com/v2/ugcPosts",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        },
        json=payload
    )

    if response.status_code in [200, 201]:
        print("✅ LinkedIn: Posted successfully")
    else:
        print(f"❌ LinkedIn error: {response.status_code} — {response.text}")

if __name__ == '__main__':
    main()
