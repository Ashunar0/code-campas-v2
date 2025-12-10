
import os
import re

TARGET_DIR = "/Users/a.kawanobe/dev/next/code-campas-v2/src/app/(dashboard)/contents"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    original_content = "".join(lines)
    modified_lines = []
    
    # 1. Remove title if present at the very beginning
    # We strip empty lines at start first to find the title? 
    # Or strict strictly first line? User said "冒頭の # タイトル を消す".
    # Usually it's the first non-empty line or strictly the first line.
    # Let's assume strictly first, or maybe check first few lines. 
    # Safest is to check if the first non-empty line is a title.
    
    header_removed = False
    content_start_index = 0
    
    # Check for title in the first few lines
    for i, line in enumerate(lines):
        if line.strip() == "":
            continue
        if line.startswith("# "):
            # This is the title line, exclude it
            # We will rebuild content from lines excluding this one
            header_removed = True
            # We only remove the FIRST h1 found at the top
            lines[i] = "" # Replace with empty or just drop. 
            # If we drop, we might mess up spacing, but for title it's usually fine.
            break
        else:
            # Found content that is not a title before finding a title
            # Assume no title to remove or it's not "at the top"
            break
            
    content = "".join(lines)
    
    # 2. Replace internal links: [text](path) -> text
    # Negative lookbehind (?<!!) to skip images including ![
    # Negative lookahead (?!http) to skip external links
    # We need to be careful not to match ![...](...) as a link if the lookbehind fails.
    # The pattern matches [text](path).
    
    def link_replacer(match):
        return match.group(1)

    # Regex explanation:
    # (?<!!) : Not preceded by ! (to avoid images)
    # \[([^\]]+)\] : Capture group 1 is the link text inside []
    # \((?!http|https)([^)]+)\) : Match (path) where path doesn't start with http or https
    
    content = re.sub(r'(?<!\!)\[([^\]\n]+)\]\((?!http|https)[^)]+\)', link_replacer, content)

    # 3. Replace HTML comments with JSX comments
    # <!-- ... --> -> {/* ... */}
    # Use dotall to match newlines
    
    def comment_replacer(match):
        inner = match.group(1)
        return f"{{/*{inner}*/}}"

    content = re.sub(r'<!--([\s\S]*?)-->', comment_replacer, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Modified: {filepath}")
        return True
    return False

def main():
    count = 0
    for root, dirs, files in os.walk(TARGET_DIR):
        for file in files:
            if file.endswith(".mdx"):
                path = os.path.join(root, file)
                if process_file(path):
                    count += 1
    print(f"Total modified files: {count}")

if __name__ == "__main__":
    main()
