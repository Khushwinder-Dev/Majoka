import json

with open('data/seoKeywordsData.json', 'r', encoding='utf-8') as f:
    seo = json.load(f)

with open('data/services_en.json', 'r', encoding='utf-8') as f:
    services = json.load(f)

combo_all = seo['comboKeywords']['all']
brand_all = seo['brandKeywords']
services_seo = seo['servicesSeo']

def assign_subservice_keywords(service_slug, sub_slug, service_kws):
    sub_kws = []
    
    # Special case: Combo System
    if sub_slug == 'combo-system-roof-waterproofing':
        return list(dict.fromkeys(combo_all + [k for k in service_kws if 'combo' in k.lower() or 'roof' in k.lower()]))
    
    # Specific matching rules for subservices
    terms = sub_slug.replace('-', ' ').split()
    # Filter terms to meaningful stems
    meaningful_terms = [t for t in terms if t not in ['works', 'services', 'and', 'or', 'system', 'systems', 'installation', 'solutions']]
    
    for kw in service_kws:
        kw_lower = kw.lower()
        if any(term in kw_lower for term in meaningful_terms):
            sub_kws.append(kw)
            
    # If too few, add relevant service kws
    if len(sub_kws) < 3:
        for kw in service_kws[:6]:
            if kw not in sub_kws:
                sub_kws.append(kw)
                
    return list(dict.fromkeys(sub_kws))

for s in services:
    slug = s.get('serviceSlug')
    sec = services_seo.get(slug, {})
    kws = sec.get('keywords', [])
    
    # Merge existing and new service keywords
    existing = s.get('seoKeywords', []) or []
    s['seoKeywords'] = list(dict.fromkeys(existing + kws[:15]))
    
    if 'subservices' in s and isinstance(s['subservices'], list):
        for sub in s['subservices']:
            sub_slug = sub.get('serviceSlug')
            sub_kws = assign_subservice_keywords(slug, sub_slug, kws)
            sub['seoKeywords'] = sub_kws

with open('data/services_en.json', 'w', encoding='utf-8') as f:
    json.dump(services, f, ensure_ascii=False, indent=2)

# Also update services_ar.json if structure matches
try:
    with open('data/services_ar.json', 'r', encoding='utf-8') as f:
        services_ar = json.load(f)
    for s_idx, s in enumerate(services_ar):
        if s_idx < len(services):
            s['seoKeywords'] = services[s_idx]['seoKeywords']
            if 'subservices' in s and isinstance(s['subservices'], list):
                for sub_idx, sub in enumerate(s['subservices']):
                    if sub_idx < len(services[s_idx].get('subservices', [])):
                        sub['seoKeywords'] = services[s_idx]['subservices'][sub_idx]['seoKeywords']
    with open('data/services_ar.json', 'w', encoding='utf-8') as f:
        json.dump(services_ar, f, ensure_ascii=False, indent=2)
except Exception as e:
    print("Notice on ar:", e)

print("Enrichment complete!")
for s in services:
    print(f"{s['serviceTitle']}: {len(s.get('seoKeywords', []))} main kws")
    for sub in s.get('subservices', []):
        print(f"   - {sub['serviceTitle']}: {len(sub.get('seoKeywords', []))} sub kws")

