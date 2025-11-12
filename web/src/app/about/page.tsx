import { Navigation } from "@/components/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const clientsDesktop = [
    ["Narkins Builders", "Groovy Pakistan", "Olly Shinder"],
    ["Bin Yousuf Group", "Parcheh81", "Tiny Footprint Coffee"],
    ["Lexa", "Finlit", "Ek Qadam Aur"],
    ["Wish Apparels","Kiswa Noir", "BLVD"],
    ["CLTRD Legacy"],
  ];

  const clientsMobile = [
    ["Narkins Builders", "Parcheh81"],
    ["Bin Yousuf Group", "Tiny Footprint Coffee"],
    ["Lexa", "Ek Qadam Aur"],
    ["Olly Shinder", "Groovy Pakistan"],
    ["Wish Apparels", "Finlit"],
    ["Kiswa Noir", "BLVD"],
    ["CLTRD Legacy"],
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-3 pt-[72px] pb-12 -max-w-[1440px]">
        {/* Hero Image */}
        <div className="grid grid-cols-12 gap-[12px]">
          <div className="col-span-12 sm:col-span-10">
            <div className="relative w-full aspect-[3/1] rounded-[5px] overflow-hidden">
              <Image
                src="/images/about-page/kabeer-and-ossaid-ai-landscape.png"
                alt="The members of otherdev"
                fill
                className="object-cover bg-neutral-400 blur-md"
                priority
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-[30px] grid grid-cols-8 sm:grid-cols-12 gap-[6px] sm:gap-[12px]">
          <div className="col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6 xl:col-span-5">
            <p className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
              About
            </p>
            <p className="mt-[9px] text-black text-[12px] font-normal leading-[14px] tracking-[-0.24px] whitespace-pre-line">
              otherdev produces digital platforms for pioneering creatives.
              Based in Karachi City, we are a full-service web development and
              design studio specializing in the fashion and design fields, with
              a focus on bringing ideas to life through thoughtful design. Our
              team consists of Kabeer Jaffri and Ossaid Qadri, who met while
              studying at Habib Public School.
            </p>
          </div>
        </div>

        {/* Clients Section */}
        <div className="mt-[30px] grid grid-cols-12 gap-[12px]">
          <div className="col-span-12 sm:col-span-8 md:col-span-7 lg:col-span-6">
            <p className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
              Clients
            </p>
            <div className="mt-[9px] grid grid-cols-2 sm:grid-cols-3 gap-[12px] gap-y-[6px]">
              {clientsDesktop.map((row, rowIndex) =>
                row.map((client, colIndex) => (
                  <p
                    key={`desktop-${rowIndex}-${colIndex}`}
                    className="hidden sm:block text-black text-[11px] font-normal leading-[14px] tracking-[-0.24px]"
                  >
                    {client}
                  </p>
                )),
              )}
              {clientsMobile.map((row, rowIndex) =>
                row.map((client, colIndex) => (
                  <p
                    key={`mobile-${rowIndex}-${colIndex}`}
                    className="sm:hidden text-black text-[11px] font-normal leading-[14px] tracking-[-0.24px]"
                  >
                    {client}
                  </p>
                )),
              )}
            </div>
          </div>
        </div>

        {/* Social Section */}
        <section className="mt-[30px]">
          <h2 className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px] mb-[13px]">
            Social
          </h2>
          <div className="flex items-center gap-[6px] mb-[56px]">
            <Link
              href="https://instagram.com/other.dev"
              className="h-[21px] px-1.5 bg-neutral-200 rounded-md flex items-center justify-center text-[#686868] text-[10px] font-normal leading-[14px] tracking-[-0.24px] hover:bg-neutral-300 transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="http://linkedin.com/company/theotherdev/"
              className="h-[21px] px-1.5 bg-neutral-200 rounded-md flex items-center justify-center text-[#686868] text-[10px] font-normal leading-[14px] tracking-[-0.24px] hover:bg-neutral-300 transition-colors"
            >
              LinkedIn
            </Link>
            {/* <Link
              href="https://silk.co"
              className="h-[21px] px-1.5 bg-neutral-200 rounded-md flex items-center justify-center text-[#686868] text-[10px] font-normal leading-[14px] tracking-[-0.24px] hover:bg-neutral-300 transition-colors"
            >
              Silk
            </Link> */}
          </div>

          {/* Footer */}
          <p className="text-[#686868] text-[11px] font-normal leading-[14px] tracking-[-0.24px]">
            © other dev
          </p>
        </section>
      </main>
    </div>
  );
}
