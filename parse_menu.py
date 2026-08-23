from bs4 import BeautifulSoup
import json
import re

with open('/Users/samirpanchal/.gemini/antigravity-ide/brain/c46c3b1f-d494-41e7-acaa-02c3a87c3a83/.system_generated/steps/20/content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract just the HTML part
html = html.split('---', 1)[-1]
soup = BeautifulSoup(html, 'html.parser')

products_menu = soup.find(lambda tag: tag.name == 'a' and 'Products' in tag.text)
if products_menu:
    parent_li = products_menu.find_parent('li')
    
    def parse_ul(ul):
        items = []
        for li in ul.find_all('li', recursive=False):
            a = li.find('a', recursive=False)
            if not a:
                continue
            name = a.text.strip()
            sub_ul = li.find('ul', recursive=False)
            if sub_ul:
                items.append({"name": name, "subcategories": parse_ul(sub_ul)})
            else:
                items.append({"name": name})
        return items
    
    ul = parent_li.find('ul', recursive=False)
    if ul:
        menu = parse_ul(ul)
        print(json.dumps(menu, indent=2))
