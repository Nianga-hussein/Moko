import os

file_path = r"c:\Users\cerc\Documents\GitHub\flynow\flight-listing.html"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if '<h5 class="lightest-black">Bébé</h5>' in line:
        skip = True
    
    if '<!-- Flight Listing End -->' in line:
        skip = False
        continue # Skip this line too as it closes the section we are removing

    if not skip:
        # Update title
        if '<h1 class="fw-700 lightest-black">Tous les services</h1>' in line:
            new_lines.append(line.replace('Tous les services', 'SOUS-CATÉGORIES DES 20 GRANDES CATÉGORIES – MOKO'))
        else:
            new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Updated flight-listing.html")
