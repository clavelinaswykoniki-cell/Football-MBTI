import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    orig_content = content

    # CSS variables and tailwind classes replacement
    replacements = [
        ("kobe-purple", "primary-color-a"),
        ("kobe-gold", "accent-color-a"),
        ("lebron-wine", "primary-color-b"),
        ("lebron-gold", "accent-color-b"),
        ("color-kobe-purple", "color-primary-color-a"),
        ("color-kobe-gold", "color-accent-color-a"),
        ("color-lebron-wine", "color-primary-color-b"),
        ("color-lebron-gold", "color-accent-color-b"),
    ]
    for old, new in replacements:
        content = content.replace(old, new)
        # Also handle camelCase if any (e.g. colorKobePurple)
        old_camel = "".join(x.capitalize() or '_' for x in old.split('-'))
        old_camel = old_camel[0].lower() + old_camel[1:]
        new_camel = "".join(x.capitalize() or '_' for x in new.split('-'))
        new_camel = new_camel[0].lower() + new_camel[1:]
        content = content.replace(old_camel, new_camel)

    # Now replace "kobe" and "lebron" globally
    
    # lowercase
    content = re.sub(r'\bkobe\b', 'playerA', content)
    content = re.sub(r'\blebron\b', 'playerB', content)
    
    # Capitalized
    content = re.sub(r'\bKobe\b', 'PlayerA', content)
    content = re.sub(r'\bLebron\b', 'PlayerB', content)
    content = re.sub(r'\bLeBron\b', 'PlayerB', content)
    
    # UPPERCASE
    content = re.sub(r'\bKOBE\b', 'PLAYERA', content)
    content = re.sub(r'\bLEBRON\b', 'PLAYERB', content)

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.js', '.jsx')):
            filepath = os.path.join(root, file)
            replace_in_file(filepath)
