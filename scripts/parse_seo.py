import openpyxl
import json
import re

excel_path = r'c:\Users\asus system\Downloads\RAPID  SEO KEYWORDS JUL 2026 .xlsx'
wb = openpyxl.load_workbook(excel_path)

# 1. COMBO SEO Keywords
sheet_combo = wb['COMBO SEO']
combo_all = []
combo_sections = {"primary": [], "secondary": [], "local": [], "longTail": []}
current_sec = "primary"

for r in range(1, sheet_combo.max_row + 1):
    val = sheet_combo.cell(r, 1).value
    if not val:
        continue
    v = val.strip()
    if "Primary SEO Keywords" in v:
        current_sec = "primary"
    elif "Secondary Keywords" in v:
        current_sec = "secondary"
    elif "UAE / Local" in v:
        current_sec = "local"
    elif "Long-Tail" in v:
        current_sec = "longTail"
    elif not v.startswith("SEO Keywords"):
        combo_sections[current_sec].append(v)
        combo_all.append(v)

# 2. UAE STATES
sheet_states = wb['UAE - STATES']
states = [sheet_states.cell(r, 1).value.strip() for r in range(1, sheet_states.max_row + 1) if sheet_states.cell(r, 1).value and sheet_states.cell(r, 1).value.strip()]

# 3. PRODUCTS
sheet_prod = wb['Product']
products_seo = []
for r in range(2, sheet_prod.max_row + 1):
    cat = sheet_prod.cell(r, 1).value
    pname = sheet_prod.cell(r, 2).value
    longname = sheet_prod.cell(r, 3).value
    desc = sheet_prod.cell(r, 4).value
    if pname:
        products_seo.append({
            "category": str(cat).strip() if cat else "",
            "name": str(pname).strip(),
            "longName": str(longname).strip() if longname else "",
            "description": str(desc).strip() if desc else ""
        })

# 4. PROJECTS
sheet_proj = wb['Ptojects']
projects_seo = []
for r in range(2, sheet_proj.max_row + 1):
    pname = sheet_proj.cell(r, 1).value
    ploc = sheet_proj.cell(r, 2).value
    pdetails = sheet_proj.cell(r, 3).value
    if pname:
        projects_seo.append({
            "name": str(pname).strip(),
            "location": str(ploc).strip() if ploc else "",
            "details": str(pdetails).strip() if pdetails else ""
        })

# 5. TAJ UAE
sheet_taj = wb['TAJ UAE']
taj_rows = [sheet_taj.cell(r, 1).value.strip() for r in range(1, sheet_taj.max_row + 1) if sheet_taj.cell(r, 1).value and sheet_taj.cell(r, 1).value.strip()]

# Section boundaries in TAJ UAE:
# Rows 1 to 362 are general brand & UAE Emirates keywords
# Rows 363 to 842 are service-specific keywords

brand_and_emirates = taj_rows[:362]
brand_clean = [k for k in brand_and_emirates if not any(k.startswith(x) for x in ['SEO Keywords', '6. Painting'])]

# Service sections mapping (row numbers in sheet, 1-indexed)
service_section_ranges = [
    ("waterproofing", 365, 450, "1. All Types of Waterproofing"),
    ("swimming-pools", 450, 512, "2. Swimming Pools Installation"),
    ("electrical-installations", 512, 551, "3. Electrical Installations & Fit-Out"),
    ("plumbing-sanitary", 551, 597, "4. Plumbing & Sanitary Installation Works"),
    ("floor-wall-tiling", 597, 639, "5. Floor & Wall Tiling Work"),
    ("plastering-block-works", 639, 682, "6. Plastering & Rendering Works"),
    ("painting-contracting", 682, 714, "7. Painting Contracting Services"),
    ("false-ceiling-partitions", 714, 755, "8. False Ceiling & Light Partitions Installation"),
    ("hvac-air-conditioning", 755, 793, "9. Air Conditioning, Ventilation & Air Filtration (HVAC)"),
    ("carpentry-wood-flooring", 793, 831, "10. Carpentry & Professional Wood Flooring"),
    ("building-cleaning-services", 831, 843, "11. Building Cleaning Services"),
]

services_seo = {}
for slug, start_row, end_row, title in service_section_ranges:
    kw_list = []
    for r in range(start_row, end_row):
        val = sheet_taj.cell(r, 1).value
        if val:
            v = val.strip()
            # Skip the section header itself
            if not v.startswith(title[:3]):
                kw_list.append(v)
    services_seo[slug] = {
        "title": title,
        "keywords": kw_list
    }

output = {
    "states": states,
    "brandKeywords": brand_clean,
    "comboKeywords": {
        "all": combo_all,
        "sections": combo_sections
    },
    "servicesSeo": services_seo,
    "productsSeo": products_seo,
    "projectsSeo": projects_seo
}

with open(r'data\seoKeywordsData.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("Saved to data/seoKeywordsData.json successfully!")
print("Brand keywords count:", len(brand_clean))
print("Combo keywords count:", len(combo_all))
print("Services covered:", list(services_seo.keys()))

