import re
import os
import shutil

file_path = 'index.html'
temp_path = 'index_new.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the #rental tab link and its SVG
    pattern = r'(<a href="#rental"[^>]*>)\s*<svg[\s\S]*?</svg>'
    replacement = r'\1\n                                        <i class="fal fa-plane me-2" style="font-size: 24px;"></i>'

    new_content = re.sub(pattern, replacement, content, count=1)

    if content != new_content:
        try:
            with open(temp_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            # Replace original file
            shutil.move(temp_path, file_path)
            print("Successfully updated index.html")
        except Exception as e:
            print(f"Error writing file: {e}")
    else:
        print("Pattern not found or no change needed.")
else:
    print("index.html not found")
