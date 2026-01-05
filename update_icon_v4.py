import re
import os
import shutil
import tempfile

base_dir = r'c:\Users\cerc\Documents\GitHub\flynow'
file_path = os.path.join(base_dir, 'index.html')

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the #rental tab link and its SVG
    pattern = r'(<a href="#rental"[^>]*>)\s*<svg[\s\S]*?</svg>'
    replacement = r'\1\n                                        <i class="fal fa-plane me-2" style="font-size: 24px;"></i>'

    new_content = re.sub(pattern, replacement, content, count=1)

    if content != new_content:
        try:
            # Create a temp file
            fd, temp_path = tempfile.mkstemp(suffix='.html', text=True)
            with os.fdopen(fd, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            # Copy back to original
            shutil.copy2(temp_path, file_path)
            os.remove(temp_path)
            print("Successfully updated index.html")
        except Exception as e:
            print(f"Error: {e}")
    else:
        print("Pattern not found or no change needed.")
else:
    print(f"{file_path} not found")
