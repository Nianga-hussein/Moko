import os
import re

files = [
    "index.html",
    "tour-detail.html",
    "hotel-listing.html",
    "flight-listing.html",
    "flight-booking.html",
    "car-listing.html",
    "about-us.html",
    "hotel-detail.html",
    "tour-packages.html",
    "hotel-booking.html",
    "sign-up.html",
    "login.html",
    "contact.html",
    "car-detail.html",
    "privacy-policy.html"
]

menu_items = [
    {"label": "Accueil", "href": "index.html", "files": ["index.html"]},
    {"label": "Services", "href": "javascript:void(0);", "type": "dropdown", "files": ["flight-listing.html", "car-listing.html", "hotel-listing.html", "tour-packages.html", "car-booking.html", "hotel-booking.html", "tour-detail.html", "car-detail.html", "hotel-detail.html", "privacy-policy.html"], "submenu": [
        {"label": "Tous les services", "href": "flight-listing.html"},
        {"label": "Commander", "href": "flight-booking.html"}
    ]},
    {"label": "Commandant", "href": "flight-booking.html", "files": ["flight-booking.html"]},
    {"label": "A propos", "href": "about-us.html", "files": ["about-us.html"]},
    {"label": "Contactez", "href": "contact.html", "files": ["contact.html"]},
    {"label": "Connexion et Inscription", "href": "login.html", "files": ["login.html", "sign-up.html"]}
]

def generate_menu(current_file):
    html = '<ul class="main-menu__list">\n'
    for item in menu_items:
        is_active = current_file in item.get("files", [])
        active_class = ' class="active"' if is_active else ''
        
        if item.get("type") == "dropdown":
            dropdown_class = ' class="dropdown"'
            html += f'                                    <li{dropdown_class}>\n'
            html += f'                                        <a href="{item["href"]}"{active_class}>{item["label"]}</a>\n'
            html += '                                        <ul class="sub-menu">\n'
            for sub in item["submenu"]:
                sub_active = ' class="active"' if sub["href"] == current_file else ''
                html += f'                                            <li><a href="{sub["href"]}"{sub_active}>{sub["label"]}</a></li>\n'
            html += '                                        </ul>\n'
            html += '                                    </li>\n'
        else:
            html += f'                                    <li><a href="{item["href"]}"{active_class}>{item["label"]}</a></li>\n'
    html += '                                </ul>'
    return html

base_path = r"c:\Users\cerc\Documents\GitHub\flynow"

for file_name in files:
    file_path = os.path.join(base_path, file_name)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        pattern = re.compile(r'<ul class="main-menu__list">.*?</ul>', re.DOTALL)
        
        new_menu = generate_menu(file_name)
        
        if pattern.search(content):
            new_content = pattern.sub(new_menu, content)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_name}")
        else:
            print(f"Could not find menu in {file_name}")
    except Exception as e:
        print(f"Error processing {file_name}: {e}")
