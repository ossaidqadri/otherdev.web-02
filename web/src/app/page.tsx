import { Navigation } from "@/components/navigation"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-3 pr-3 md:pr-[8%] lg:pr-[15%] pt-[60px] pb-12">
        <div className="grid grid-cols-12 mb-8">
          <p className="text-[#686868] text-[11px] leading-[14px] font-normal col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6">
            otherdev produces digital platforms for pioneering creatives. Based in Karachi City, we are a full-service web development and design studio specializing in the fashion and design fields.
          </p>
        </div>
        <div className="mt-[30px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[12px] gap-y-[15px]">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              slug={project.slug}
              image={project.image}
              description={project.description}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
