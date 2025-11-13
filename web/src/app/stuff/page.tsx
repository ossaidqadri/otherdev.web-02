import type { Metadata } from "next";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Stuff | OtherDev - Creative Projects & Experiments",
  description:
    "Discover our creative experiments, side projects, and explorations in digital design and development. OtherDev's collection of innovative work.",
  keywords: [
    "creative projects",
    "experiments",
    "digital design",
    "development",
    "portfolio",
    "OtherDev",
  ],
  openGraph: {
    title: "Stuff | OtherDev",
    description:
      "Creative projects and digital experiments from the OtherDev team.",
    type: "website",
    url: "https://otherdev.com/stuff",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OtherDev Creative Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stuff | OtherDev",
    description: "Creative projects and digital experiments",
    images: ["/og-image.png"],
  },
  // canonical: "https://otherdev.com/stuff",
};

export default function StuffPage() {
  // JSON-LD Structured Data
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Stuff - Creative Projects & Experiments",
    url: "https://otherdev.com/stuff",
    description:
      "Creative projects and digital experiments from the OtherDev team.",
    creator: {
      "@type": "Organization",
      name: "OtherDev",
      url: "https://otherdev.com",
    },
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-3 pr-3 md:pr-[8%] lg:pr-[15%] pt-[60px] pb-12">
        <div className="grid grid-cols-12 mb-8">
          <p className="text-[#686868] text-[11px] leading-[14px] font-normal col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6">
            Beyond our client work, we explore creative experiments and side
            projects that push the boundaries of digital design and development.
          </p>
        </div>

        <div className="mt-[30px]">
          <div className="text-center py-20">
            <h2 className="text-[22.7px] leading-[28px] tracking-[-0.48px] font-normal text-black mb-4">
              Coming Soon
            </h2>
            <p className="text-[#686868] text-[11.3px] leading-[14px] tracking-[-0.24px] font-normal">
              We're working on some exciting creative projects. Stay tuned!
            </p>
          </div>
        </div>
        <Footer />
      </main>

      {/* JSON-LD Structured Data */}
      <Script
        id="stuff-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </div>
  );
}
