import { Navigation } from "@/components/navigation";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="container mx-auto px-3 pr-3 md:pr-[8%] lg:pr-[15%] pt-[60px] pb-12">
        <div className="grid grid-cols-12 mb-8">
          <p className="text-[#686868] text-[11px] leading-[14px] font-normal col-span-7 sm:col-span-8 md:col-span-7 lg:col-span-6">
            We work closely with our collaborators to engineer premium web and
            design solutions. Below is a selection showcasing some of our most
            recent work.
          </p>
        </div>

        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[13px]">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              slug={project.slug}
              image={project.image}
              description={project.description}
              variant="work"
              showText={true}
            />
          ))}
        </div>
      </main>

      <footer className="container mx-auto px-3 pb-12">
        <p className="text-[#686868] text-[10.9px] leading-[14px] tracking-[-0.24px] font-normal">
          © other dev
        </p>
      </footer>
    </div>
  );
}
