import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 13);

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      <Navigation />

      <main className="px-3">
        <div className="pt-[69px]">
          <h1 className="text-[22.7px] leading-[28px] tracking-[-0.48px] font-normal text-black mb-[29px]">
            {project.title}
          </h1>

          {project.url && (
            <div className="text-[11.1px] leading-[14px] tracking-[-0.24px] font-normal text-black mb-[24px]">
              {project.url}
            </div>
          )}

          <p className="text-[11.1px] leading-[14px] tracking-[-0.24px] font-normal text-black mb-[64px] max-w-[532px]">
            {project.description}
          </p>
        </div>

        <div className="bg-neutral-200 rounded-[5px] p-[12px] mb-[35.37px]">
          <div className="flex flex-col gap-[90px] max-w-[803px] mx-auto py-[78px]">
            <div className="bg-neutral-300 w-full aspect-[803/501.88] rounded-sm" />
            <div className="bg-neutral-300 w-full aspect-[803/501.88] rounded-sm" />
            <div className="bg-neutral-300 w-full aspect-[803/501.88] rounded-sm" />
          </div>
        </div>

        <div className="mb-[10.63px]">
          <h2 className="text-[11.4px] leading-[14px] tracking-[-0.24px] font-normal text-[#686868]">
            Related Projects
          </h2>
        </div>

        <div className="overflow-x-auto overflow-y-clip pb-[6px] mb-[57px] -mx-3 scrollbar-hide">
          <div className="flex gap-[12px] px-3">
            {relatedProjects.map((relatedProject) => (
              <div key={relatedProject.id} className="flex-shrink-0 w-[600px]">
                <ProjectCard
                  title={relatedProject.title}
                  slug={relatedProject.slug}
                  image={relatedProject.image}
                  description={relatedProject.description}
                  variant="work"
                  showText={true}
                />
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/work"
          className="inline-flex bg-neutral-200 rounded-[5px] h-[21px] px-[6px] items-center mb-[34.66px]"
        >
          <span className="text-[10.3px] leading-[14px] tracking-[-0.24px] font-normal text-[#686868]">
            Back to Work
          </span>
        </Link>
      </main>

      <footer className="px-3 pb-[37.37px]">
        <p className="text-[#686868] text-[10.9px] leading-[14px] tracking-[-0.24px] font-normal">
          © taw vision llc
        </p>
      </footer>
    </div>
  );
}
