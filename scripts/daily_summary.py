import os
import sys
import requests
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    github_token = os.environ.get('GITHUB_TOKEN', '')
    username = os.environ.get('GITHUB_ACTOR', 'Adithya0805')

    headers = {'Authorization': f'token {github_token}'} if github_token else {}

    # Get today's commits across all repos
    today = datetime.now(timezone.utc).strftime('%Y-%m-%d')

    repos_res = requests.get(
        f"https://api.github.com/users/{username}/repos?per_page=20&sort=updated",
        headers=headers
    )
    repos = repos_res.json() if repos_res.status_code == 200 else []

    commit_count = 0
    active_repos = []

    if isinstance(repos, list):
        for repo in repos[:10]:
            repo_name = repo.get('name')
            if not repo_name:
                continue
            commits_res = requests.get(
                f"https://api.github.com/repos/{username}/{repo_name}/commits"
                f"?author={username}&since={today}T00:00:00Z",
                headers=headers
            )
            if commits_res.status_code == 200:
                commits = commits_res.json()
                if isinstance(commits, list) and commits:
                    commit_count += len(commits)
                    active_repos.append(f"  • {repo_name}: {len(commits)} commit(s)")

    now = datetime.now(timezone.utc)
    ist_hour = (now.hour + 5 + ((now.minute + 30) // 60)) % 24
    ist_min = (now.minute + 30) % 60

    msg = f"""📊 *Daily Summary — {today}*

*GitHub Activity:*
Commits today: {commit_count}
"""
    if active_repos:
        msg += "\n".join(active_repos)
    else:
        msg += "No commits today"

    msg += f"""

*Portfolio:* adithyaai.is-cool.dev
*Time:* {ist_hour:02d}:{ist_min:02d} IST

Keep building. 🔥"""

    if token and chat_id:
        res = requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={'chat_id': chat_id, 'text': msg, 'parse_mode': 'Markdown'}
        )
        if res.status_code == 200:
            print("✅ Daily summary sent to Telegram")
        else:
            print(f"❌ Telegram error: {res.text}")
    else:
        print("ℹ️ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not provided. Previewing summary:")
        print(msg)

if __name__ == '__main__':
    main()
