import re
import os

file_path = 'index.html'
if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the #rental tab link and its SVG
    # We look for the anchor tag, then the SVG block, and replace the SVG with the icon
    # The pattern needs to be robust enough to match the actual file content
    pattern = r'(<a href="#rental"[^>]*>)\s*<svg[\s\S]*?</svg>'
    replacement = r'\1\n                                        <i class="fal fa-plane me-2" style="font-size: 24px;"></i>'

    new_content = re.sub(pattern, replacement, content, count=1)

    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated index.html")
    else:
        print("Pattern not found or no change needed.")
else:
    print("index.html not found")
