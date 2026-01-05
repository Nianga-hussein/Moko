import os

file_path = r'C:\Users\cerc\Documents\GitHub\flynow\assets\css\app.css'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('#f33c0e', '#FF6600')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Successfully updated color.")
except Exception as e:
    print(f"Error: {e}")
