import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { projects } from "@/lib/projects"
import Image from "next/image"

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />

      <main className="container mx-auto px-3 pr-3 md:pr-[8%] lg:pr-[15%] pt-[60px] pb-12">
        <div className="grid grid-cols-12 mb-8">
          <p className="text-[#686868] text-[11px] leading-[14px] font-normal col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6">
            We work closely with our collaborators to engineer premium web and design solutions. Below is a selection showcasing some of our most recent work.
          </p>
        </div>

        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[13px]">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col gap-[13px]">
              <Link href={`/work/${project.slug}`} className="block group">
                <div className="bg-neutral-200 rounded-[5px] aspect-square flex items-center justify-center overflow-hidden p-[50px] transition-transform duration-300 group-hover:scale-[0.99]">
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </Link>

              <Link href={`/work/${project.slug}`} className="box-border flex flex-col items-start pb-[3px] pt-0 px-0 relative shrink-0">
                <div className="box-border flex flex-col items-start mb-[-3px] relative shrink-0 w-full">
                  <div className="flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[11.4px] text-black tracking-[-0.24px] w-full">
                    <p className="leading-[14px] whitespace-pre-wrap">{project.title}</p>
                  </div>
                </div>
                <div className="box-border flex flex-col items-start mb-[-3px] pb-0 pt-[9px] px-0 relative shrink-0 w-full">
                  <div className="flex flex-col font-normal justify-center leading-[14px] not-italic relative shrink-0 text-[#686868] text-[11.1px] tracking-[-0.24px] w-full whitespace-pre-wrap">
                    <p className="mb-0">{project.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}

        </div>
      </main>

      <footer className="container mx-auto px-3 pb-12">
        <p className="text-[#686868] text-[10.9px] leading-[14px] tracking-[-0.24px] font-normal">
          © taw vision llc
        </p>
      </footer>
    </div>
  )
}
