import { Navigation } from "@/components/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const clientsDesktop = [
    ["Basketcase Gallery", "J.L-A.L", "Olly Shinder"],
    ["Bryan Jimenèz", "Juliet Johnstone", "ROA Hiking"],
    ["Constant Practice", "Koss, Inc", "Ranxelle Soria"],
    ["David Casavant", "Kunai Online", "Regrets Only"],
    ["Dover Street Market", "Lil Uzi Vert", "SALEM"],
    ["Fey Fey Worldwide", "Magic Molecule", "SPECIAL OFFER, Inc."],
    ["Genius", "Margot Magazine", "Surf Gang Records"],
    ["Geoffrey B. Small", "New Balance", "World Health Organization"],
    ["Iessi", "Oddli Inc", "Worldwide Staffing"],
  ];

  const clientsMobile = [
    ["Basketcase Gallery", "Magic Molecule"],
    ["Bryan Jimenèz", "Margot Magazine"],
    ["Constant Practice", "New Balance"],
    ["David Casavant", "Oddli Inc"],
    ["Dover Street Market", "Olly Shinder"],
    ["Fey Fey Worldwide", "ROA Hiking"],
    ["Genius", "Ranxelle Soria"],
    ["Geoffrey B. Small", "Regrets Only"],
    ["Iessi", "SALEM"],
    ["J.L-A.L", "SPECIAL OFFER, Inc."],
    ["Juliet Johnstone", "Surf Gang Records"],
    ["Koss, Inc", "World Health Organization"],
    ["Kunai Online", "Worldwide Staffing"],
    ["Lil Uzi Vert"],
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-3 pt-[60px] pb-12 max-w-[1440px]">
        {/* Hero Image */}
        <div className="relative w-full aspect-[2.13/1] sm:aspect-[2.13/1] rounded-md overflow-hidden mb-[48px] sm:mb-[72px]">
          <Image
            src="http://localhost:3845/assets/12da3270cd67fe63eae4c97fe2ca6224ebe275fc.png"
            alt="The members of otherdev"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* About Section */}
        <section className="mb-[42px] sm:mb-[52px]">
          <h2 className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px] mb-[18px]">
            About
          </h2>
          <div className="space-y-[14px] max-w-[490px]">
            <p className="text-black text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
              otherdev produces digital platforms for pioneering creatives. Based in Karachi City, we are a
              full-service web development and design studio specializing in the fashion and design fields, with
              a focus on bringing ideas to life through thoughtful design.
            </p>
            <p className="text-black text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
              Our team consists of Oliver Buckley and Tomás Carlson, who met while studying computer
              science at Northeastern University.
            </p>
          </div>
        </section>

        {/* Clients Section - Desktop (3 columns) */}
        <section className="mb-[54px] hidden sm:block">
          <h2 className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px] mb-[18px]">
            Clients
          </h2>
          <div className="grid grid-cols-3 gap-x-[102px] gap-y-[15px] max-w-[580px]">
            {clientsDesktop.map((row, rowIndex) =>
              row.map((client, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="text-black text-[11px] font-normal leading-[14px] tracking-[-0.24px]"
                >
                  {client}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Clients Section - Mobile (2 columns) */}
        <section className="mb-[54px] sm:hidden">
          <h2 className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px] mb-[18px]">
            Clients
          </h2>
          <div className="grid grid-cols-2 gap-x-[108px] gap-y-[15px]">
            {clientsMobile.map((row, rowIndex) =>
              row.map((client, colIndex) => (
                <div
                  key={`mobile-${rowIndex}-${colIndex}`}
                  className="text-black text-[11px] font-normal leading-[14px] tracking-[-0.24px]"
                >
                  {client}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Social Section */}
        <section>
          <h2 className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px] mb-[13px]">
            Social
          </h2>
          <div className="flex items-center gap-[6px] mb-[56px]">
            <Link
              href="https://instagram.com"
              className="h-[21px] px-1.5 bg-neutral-200 rounded-md flex items-center justify-center text-[#686868] text-[10px] font-normal leading-[14px] tracking-[-0.24px] hover:bg-neutral-300 transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://linkedin.com"
              className="h-[21px] px-1.5 bg-neutral-200 rounded-md flex items-center justify-center text-[#686868] text-[10px] font-normal leading-[14px] tracking-[-0.24px] hover:bg-neutral-300 transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://silk.co"
              className="h-[21px] px-1.5 bg-neutral-200 rounded-md flex items-center justify-center text-[#686868] text-[10px] font-normal leading-[14px] tracking-[-0.24px] hover:bg-neutral-300 transition-colors"
            >
              Silk
            </Link>
          </div>

          {/* Footer */}
          <p className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
            © otherdev llc
          </p>
        </section>
      </main>
    </div>
  );
}
