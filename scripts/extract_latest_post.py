"""
Reads src/data/posts.ts, extracts the first (latest) post,
and outputs it as GitHub Actions step outputs.
"""
import re
import os
import sys
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def get_changed_files():
    result = subprocess.run(
        ['git', 'diff', '--name-only', 'HEAD~1', 'HEAD'],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        return ['src/data/posts.ts']
    return result.stdout.strip().split('\n')

def extract_field(content, field):
    pattern = rf"{field}:\s*['\"`]([^'\"`]+)['\"`]"
    match = re.search(pattern, content)
    return match.group(1) if match else ''

def main():
    changed = get_changed_files()
    github_output = os.environ.get('GITHUB_OUTPUT')

    def write_output(lines):
        if github_output:
            with open(github_output, 'a', encoding='utf-8') as f:
                for line in lines:
                    f.write(f"{line}\n")
        else:
            print("Local test output:")
            for line in lines:
                print(line)

    if not any('posts.ts' in f for f in changed):
        print("No post changes detected in posts.ts")
        write_output(['post_found=false'])
        return

    with open('src/data/posts.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip interface definitions and find the `posts` array
    array_match = re.search(r'posts\s*(?::\s*[^=]+)?=\s*\[', content)
    search_scope = content[array_match.end():] if array_match else content

    # Find the first post object (first item in the array with a quoted slug)
    first_post_match = re.search(r'\{\s*slug:\s*[\'\"`]([^\'\"`]+)[\'\"`].*?\}', search_scope, re.DOTALL)
    if not first_post_match:
        print("No valid post found in posts array")
        write_output(['post_found=false'])
        return

    post_content = first_post_match.group(0)

    slug = extract_field(post_content, 'slug')
    title = extract_field(post_content, 'title')
    excerpt = extract_field(post_content, 'excerpt')
    category = extract_field(post_content, 'category')
    read_time = extract_field(post_content, 'readTime')

    print(f"Found post: {title} ({slug})")

    write_output([
        'post_found=true',
        f'post_slug={slug}',
        f'post_title={title}',
        f'post_excerpt={excerpt[:200]}',
        f'post_category={category}',
        f'post_read_time={read_time}',
    ])

if __name__ == '__main__':
    main()
