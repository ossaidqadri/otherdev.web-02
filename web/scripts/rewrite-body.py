import os
os.environ['DATABASE_URL'] = open('D:/work/otherdev-web-v2/web/.env').read().split('DATABASE_URL=')[1].split('\n')[0]

from pymongo import MongoClient
from bson import ObjectId

client = MongoClient(os.environ['DATABASE_URL'])
db = client.get_database()

updates = [
    {
        '_id': ObjectId('69ff47b009e6adf1f17fb588'),  # Car Wala
        'description': 'Car Wala is a professional car detailing service in Karachi offering interior cleaning, paint correction, and ceramic coating. We built a Next.js booking platform with live scheduling via Cal.com, automated Google Sheets lead capture, and an ElevenLabs AI chat widget.',
    },
    {
        '_id': ObjectId('69ff47af09e6adf1f17fb583'),  # Adina Household
        'description': 'Adina Household sells premium ceramic tableware and dinnerware online. We built a headless Shopify Hydrogen storefront with 30+ locale-aware routes, GSAP animations, wishlist, Instagram feed, and WhatsApp contact.',
    },
    {
        '_id': ObjectId('69ff47ac09e6adf1f17fb574'),  # Boulevard Pakistan
        'description': 'Boulevard Pakistan is a contemporary menswear brand. Since 2021, Other Dev has shaped their digital identity — a Shopify theme with critical CSS inlining, link prefetching, and modular architecture for performance-first e-commerce.',
    },
    {
        '_id': ObjectId('69ff47ad09e6adf1f17fb579'),  # Kiswa Noire
        'description': 'Kiswa Noire is a contemporary fashion label rooted in refined craftsmanship and dark elegance. We built a minimalist Shopify theme with 30+ languages, WCAG 2.1 AA accessibility, custom Web Components, and Swiper carousels.',
    },
    {
        '_id': ObjectId('69ff47a809e6adf1f17fb55b'),  # Parcheh81
        'description': 'Parcheh81 sells premium Pakistani textiles online with a Shopify theme that translates fabric texture and artistry into an immersive digital shopping experience — mobile-first design with Instagram integration.',
    },
    {
        '_id': ObjectId('69ff47a509e6adf1f17fb54c'),  # Narkins Builders
        'description': 'Narkins Builders showcase their construction portfolio and win more projects with a Next.js PWA — TinaCMS visual editing, MySQL backend, GSAP animations, and Google Sheets CRM integration for leads.',
    },
    {
        '_id': ObjectId('69ff47a609e6adf1f17fb551'),  # Finlit
        'description': 'Finlit built a full-stack SaaS learning platform with branding and visual identity, helping users confidently navigate personal finance — from trading basics to advanced investment strategies.',
    },
    {
        '_id': ObjectId('69ff47a209e6adf1f17fb53b'),  # Lexa
        'description': 'Lexa AI cuts contract review from hours to seconds for law firms across Asia and the Middle East — real-time collaborative editing with TipTap and YJS, e-signature workflows, and multi-party audit trails.',
    },
    {
        '_id': ObjectId('69ff47a109e6adf1f17fb533'),  # Bin Yousuf
        'description': 'Bin Yousuf Group attracts international investors to their Karachi waterfront properties (EMAAR Oceanfront, HMR Waterfront) with an Astro real estate platform — GSAP animations, Google Sheets lead capture, and WhatsApp integration.',
    },
    {
        '_id': ObjectId('69ff47a409e6adf1f17fb547'),  # Wish
        'description': 'Wish Apparels sells minimalist fashion online with a custom Shopify theme — 25+ locales, advanced product zoom, five curated color schemes, and Core Web Vitals-optimized performance.',
    },
]

col = db.projects
for u in updates:
    result = col.update_one({'_id': u['_id']}, {'$set': {'description': u['description']}})
    status = 'OK' if result.modifiedCount == 1 else 'FAIL'
    print(f'[{status}] {u["description"][:60]}...')

client.close()
print('\nDone.')