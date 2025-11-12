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
    image: "/images/projects/narkins-seo-2025/narkins-seo-implementation-cover.webp",
    description:
      "Our collaboration with Narkins Builders involved implementing a comprehensive SEO transformation that elevated their digital presence from non-ranking status to competing directly with industry giants like Zameen.com and OLX.com in Pakistan's competitive real estate market. We executed a complete technical SEO overhaul featuring advanced schema markup, blog system migration from WordPress to MDX, and strategic content optimization. The project included developing custom SEO components, implementing analytics tracking, and establishing a scalable content architecture. Our systematic approach resulted in a 30% immediate traffic improvement, enhanced search engine indexing, and a robust technical foundation that positions Narkins Builders for first-page rankings in their target market.",
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
      "Our collaboration with Bin Yousuf Group involved creating a sophisticated real estate platform that showcases premium waterfront properties in Karachi's most exclusive developments. As official sales partners of Emaar Oceanfront and HMR Waterfront, they required a digital presence that matched their premium positioning while providing advanced lead management capabilities. We delivered a comprehensive solution featuring interactive property galleries, seamless Google Sheets integration for real-time lead tracking, and optimized user experience that converts visitors into qualified prospects for luxury oceanfront investments.",
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
      "Our collaboration with Lexa involved developing an intelligent AI legal assistant that transforms how law firms and SMEs approach contract drafting and document management. We built a sophisticated AI-powered platform that serves as a virtual legal assistant, providing real-time contract analysis, automated document generation, and intelligent legal recommendations. The platform combines advanced natural language processing with collaborative editing capabilities, enabling legal professionals across Asia and the Middle East to draft, review, and manage contracts with AI-driven insights while maintaining the highest standards of accuracy and compliance.",
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
      "Our collaboration with Kiswa Noire involved creating a sophisticated e-commerce platform for this premium Danish children's lifestyle brand. We developed a highly customized Shopify solution that embodies Scandinavian minimalism while delivering advanced functionality for international markets. The platform features comprehensive multilingual support, geolocation-based personalization, and seamless shopping experiences across all touchpoints. Our work focused on translating Kiswa Noire's design philosophy into a digital experience that resonates with parents seeking quality, sustainable children's products across European markets.",
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
      "Our collaboration with Wish Apparels involved crafting a digital experience that mirrors the quality and style of their upcoming clothing line. We designed an intuitive e-commerce platform that not only showcases their products with high-quality visuals and detailed information but also provides a seamless and secure shopping journey. The branding and design elements, meticulously developed in tandem with the website, work harmoniously to communicate the brand's ethos and appeal to their target audience. This project underscores our agency's commitment to creating impactful digital solutions that drive brand growth and customer engagement for innovative businesses.",
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
      "We partnered with Narkins Builders, a leading construction company, to create a robust and scalable website infrastructure that forms the foundation of their online presence. This project involved designing and developing a user-friendly platform to showcase their portfolio of construction projects, provide detailed information about their services, and facilitate client inquiries. Our focus was on building a reliable and efficient system that supports Narkins Builders' growth and enhances their digital communication with stakeholders.",
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
      "Our collaboration with Finlit involved the comprehensive creation of their SaaS platform, from initial branding and visual identity to the full-stack development of an intuitive and engaging learning application. We focused on delivering a minimalist yet impactful digital experience that empowers users to confidently navigate the world of finance.",
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
      "The core of our engagement with Groovy Pakistan was the strategic design and robust development of their e-commerce website. Our aim was to construct a digital space that not only mirrors the brand's dynamic spirit but also provides a straightforward and engaging pathway for customers to explore and purchase their products.",
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
      "Our collaboration with Parcheh (Persian for 'fabric') focused on crafting a digital experience true to its name. We translated the unique texture, artistry, and narrative of their textiles into a tailored e-commerce platform where the fabric's details truly shine. The result is an elegant and intuitive site offering users an immersive journey into the brand's world, showcasing our ability to capture a brand's core essence through sophisticated digital design.",
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
    title:
      "Payment infrastructure migration for Tiny-Footprint Coffee",
    slug: "tinyfootprintcoffee",
    image: "/images/projects/tinyfootprintcoffee/tinyfootprintcoffeecoverpage.png",
    description:
      "Our collaboration with Tiny Footprint Coffee, the world's first carbon-negative coffee company, centered on strategically migrating their vital subscription services from Recharge to Shopify Payments. The goal was to unify their e-commerce operations and streamline backend management, freeing them to better focus on their core mission of funding reforestation through coffee sales, while maintaining a seamless experience for their loyal, mission-supporting subscribers. We executed a meticulously planned transition ensuring data integrity and uninterrupted service, resulting in an efficient subscription system fully integrated within Shopify. This project highlights our expertise in complex e-commerce migrations for purpose-driven brands.",
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
    description:
      "Website Design, Website Development & Infrastructure",
    url: "ekqadamaur.kabeers.network",
  },
];
