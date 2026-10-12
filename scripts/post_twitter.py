import os
import sys
import tweepy

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    api_key = os.environ.get('TWITTER_API_KEY')
    api_secret = os.environ.get('TWITTER_API_SECRET')
    access_token = os.environ.get('TWITTER_ACCESS_TOKEN')
    access_token_secret = os.environ.get('TWITTER_ACCESS_SECRET')

    if not all([api_key, api_secret, access_token, access_token_secret]):
        print("❌ Twitter error: Missing credentials in environment")
        return

    client = tweepy.Client(
        consumer_key=api_key,
        consumer_secret=api_secret,
        access_token=access_token,
        access_token_secret=access_token_secret
    )

    title = os.environ.get('POST_TITLE', '')
    slug = os.environ.get('POST_SLUG', '')
    category = os.environ.get('POST_CATEGORY', '')
    site_url = os.environ.get('SITE_URL', 'https://adithyaai.is-cool.dev')

    post_url = f"{site_url}/blog/{slug}"

    # Twitter has 280 char limit — keep it tight
    tag_map = {
        'Machine Learning': '#MachineLearning #AI #Python',
        'Interview Prep': '#TCS #Infosys #CampusPlacement #Fresher',
        'Career': '#OpenToWork #AIEngineer #TamilNadu',
        'Python': '#Python #Programming #100DaysOfCode',
    }
    tags = tag_map.get(category, '#AI #MachineLearning #OpenToWork')

    tweet = f"New post: {title}\n\n{post_url}\n\n{tags}"

    # Truncate if over 280
    if len(tweet) > 280:
        max_title = 280 - len(post_url) - len(tags) - 15
        tweet = f"New post: {title[:max_title]}...\n\n{post_url}\n\n{tags}"

    try:
        response = client.create_tweet(text=tweet)
        if response and response.data:
            print(f"✅ Twitter: Posted — tweet ID {response.data['id']}")
        else:
            print("❌ Twitter: Failed to post")
    except Exception as e:
        print(f"❌ Twitter exception: {e}")

if __name__ == '__main__':
    main()
