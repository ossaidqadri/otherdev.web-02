import { Navigation } from "@/components/navigation"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-3 pt-20 pb-12">
        <div className="mb-8">
          <p className="text-[11px] leading-[14px] text-black font-normal max-w-2xl">
            otherdev produces digital platforms for pioneering creatives. Based in New York City, we are a full-service web development and design studio specializing in the fashion and design fields.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              slug={project.slug}
              image={project.image}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
