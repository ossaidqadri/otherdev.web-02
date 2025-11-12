export interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  url?: string;
  media?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "SEO Implementation & Technical Optimization for Narkins Builders",
    slug: "narkins-seo-2025",
    image:
      "/images/projects/narkins-seo-2025/narkins-seo-implementation-cover.webp",
    description:
      "Comprehensive SEO transformation for Narkins Builders featuring technical optimization, schema markup, and MDX blog migration. Achieved 30% traffic improvement and elevated their rankings to compete with industry giants in Pakistan's real estate market.",
    url: "narkinsbuilders.com",
    media: [
      "/images/projects/narkins-seo-2025/search-console-performance.webp",
      "/images/projects/narkins-seo-2025/search-console-insights.webp",
      "/images/projects/narkins-seo-2025/pagespeed-seo-score.webp",
      "/images/projects/narkins-seo-2025/schema-markup-code.webp",
    ],
  },
  {
    id: "2",
    title: "Real Estate Platform Development for Bin Yousuf Group",
    slug: "bin-yousuf-2025",
    image: "/images/projects/bin-yousuf-2025/byg-website-homepage-cover.webp",
    description:
      "Sophisticated real estate platform for Bin Yousuf Group showcasing premium waterfront properties in Karachi. Features interactive galleries, Google Sheets lead integration, and optimized UX for Emaar Oceanfront and HMR Waterfront luxury investments.",
    url: "binyousufgroup.com",
    media: [
      "/images/projects/bin-yousuf-2025/byg-property-showcase.webp",
      "/images/projects/bin-yousuf-2025/emaar-properties-mobile.webp",
      "/images/projects/bin-yousuf-2025/hmr-waterfront-gallery.webp",
      "/images/projects/bin-yousuf-2025/lead-management-system.webp",
      "/images/projects/bin-yousuf-2025/luxury-apartments-karachi.webp",
      "/images/projects/bin-yousuf-2025/byg-logo-brand.webp",
    ],
  },
  {
    id: "3",
    title: "AI Legal Assistant Platform Development for Lexa",
    slug: "lexa-2025",
    image: "/images/projects/lexa-2025/lexa-platform-homepage.webp",
    description:
      "Intelligent AI legal assistant platform for law firms and SMEs featuring real-time contract analysis and automated document generation. Combines advanced NLP with collaborative editing for legal professionals across Asia and the Middle East.",
    url: "lexa.deployments.otherdev.com",
    media: [
      "/images/projects/lexa-2025/lexa-platform-homepage.webp",
      "/images/projects/lexa-2025/lexa-document-editor.webp",
      "/images/projects/lexa-2025/lexa-collaboration-features.webp",
      "/images/projects/lexa-2025/lexa-legal-templates.webp",
    ],
  },
  {
    id: "4",
    title: "E-commerce Platform Development for Kiswa Noire",
    slug: "kiswa-noire-2025",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Sophisticated e-commerce platform for premium Danish children's brand Kiswa Noire featuring Scandinavian minimalism. Custom Shopify solution with multilingual support and geolocation-based personalization for European markets.",
    url: "kiswanoire.com",
    media: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "5",
    title: "Branding & website development for Wish",
    slug: "wish-2024",
    image: "/images/projects/wish-2024/wishapparels.com_.webp",
    description:
      "Complete branding and e-commerce platform for Wish Apparels showcasing their clothing line with high-quality visuals. Intuitive design with seamless shopping experience that communicates the brand's ethos and drives customer engagement.",
    url: "wishapparels.com",
    media: [
      "/images/projects/wish-2024/upper-slideshow-1.webp",
      "/images/projects/wish-2024/1743813808292_100.webp",
      "/images/projects/wish-2024/wish-girl-11.webp",
      "/images/projects/wish-2024/wish-boy-1.webp",
      "/images/projects/wish-2024/wish-logo.webp",
      "/images/projects/wish-2024/with-other-dev.webp",
    ],
  },
  {
    id: "6",
    title: "Website infrastructure creation for Narkins Builders",
    slug: "narkins-2025",
    image: "/images/projects/narkins-2025/narkinsbuilders.com_.webp",
    description:
      "Robust website infrastructure for Narkins Builders showcasing their construction portfolio and services. User-friendly platform designed to facilitate client inquiries and enhance digital communication with stakeholders.",
    url: "narkinsbuilders.com",
    media: [
      "/images/projects/narkins-2025/narkins-collage.webp",
      "/images/projects/narkins-2025/1743813250549_100.webp",
      "/images/projects/narkins-2025/hcr_new.webp",
    ],
  },
  {
    id: "7",
    title: "Branding & SaaS Platform Development for Finlit",
    slug: "finlit-2025",
    image: "/images/projects/finlit-2025/finlit.deployments.otherdev.com_.png",
    description:
      "Comprehensive SaaS platform development for Finlit including branding, visual identity, and full-stack learning application. Minimalist design that empowers users to confidently navigate the world of finance.",
    url: "finlit.deployments.otherdev.com",
    media: [
      "/images/projects/finlit-2025/finlit-group.png",
      "/images/projects/finlit-2025/finlit-home-mobile.png",
      "/images/projects/finlit-2025/team-groupchat.png",
      "/images/projects/finlit-2025/finlit-courses-macbook.png",
      "/images/projects/finlit-2025/finlit-logo.png",
      "/images/projects/finlit-2025/finlit.deployments.otherdev.com_trading_1x1.png",
    ],
  },
  {
    id: "8",
    title: "Website Development for Groovy Pakistan",
    slug: "groovy-pakistan-2024",
    image: "/images/projects/groovy-pakistan-2024/groovy-main.png",
    description:
      "Strategic e-commerce website development for Groovy Pakistan mirroring the brand's dynamic spirit. Straightforward and engaging digital space that provides an intuitive pathway for customers to explore and purchase products.",
    url: "groovypakistan.com",
    media: [
      "/images/projects/groovy-pakistan-2024/groovy-group.png",
      "/images/projects/groovy-pakistan-2024/groovy-home-mobile.png",
      "/images/projects/groovy-pakistan-2024/pants.jpg",
      "/images/projects/groovy-pakistan-2024/shirts-cropped.png",
    ],
  },
  {
    id: "9",
    title: "Branding & website development for Parcheh81",
    slug: "parcheh81-2024",
    image: "/images/projects/parcheh81-2024/Parcheh.nyc_collections_all.webp",
    description:
      "Tailored e-commerce platform for Parcheh translating the texture and artistry of their textiles into digital experience. Elegant and intuitive design offering an immersive journey into the brand's world of premium fabrics.",
    url: "parcheh81.com",
    media: [
      "/images/projects/parcheh81-2024/parcheh-home-mobile.png",
      "/images/projects/parcheh81-2024/parcheh-menu-mobile.png",
      "/images/projects/parcheh81-2024/parcheh-logo-gridded.png",
      "/images/projects/parcheh81-2024/girl-standing-square.png",
    ],
  },
  {
    id: "10",
    title: "Payment infrastructure migration for Tiny-Footprint Coffee",
    slug: "tinyfootprintcoffee",
    image:
      "/images/projects/tinyfootprintcoffee/tinyfootprintcoffeecoverpage.png",
    description:
      "Strategic subscription migration from Recharge to Shopify Payments for Tiny Footprint Coffee, the world's first carbon-negative coffee company. Seamless transition with data integrity ensuring uninterrupted service for their mission-supporting subscribers.",
    url: "tinyfootprintcoffee.com",
    media: [
      "/images/projects/parcheh81-2024/parcheh-home-mobile.png",
      "/images/projects/parcheh81-2024/parcheh-menu-mobile.png",
      "/images/projects/parcheh81-2024/parcheh-logo-gridded.png",
      "/images/projects/parcheh81-2024/girl-standing-square.png",
    ],
  },
  {
    id: "11",
    title: "Enterprise infrastructure development for Ek Qadam Aur",
    slug: "ekqadamaur-2023",
    image:
      "https://cdn.jsdelivr.net/gh/kabeer11000/docs-hosted@redirector-content/theotherdev/new-web/ekqadamaur.webp",
    description: "Website Design, Website Development & Infrastructure",
    url: "ekqadamaur.kabeers.network",
  },
];
