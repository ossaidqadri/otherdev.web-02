import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen relative">
      <Navigation />

      <main className="px-3">
        <div className="pt-[69px]">
          <h1 className="text-[22.7px] leading-[28px] tracking-[-0.48px] font-normal text-black mb-[29px]">
            {project.title}
          </h1>

          {project.url && (
            <a
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.1px] leading-[14px] tracking-[-0.24px] font-normal text-black mb-[24px] inline-block hover:underline"
            >
              {project.url}
            </a>
          )}

          <p className="text-[11.1px] sm:text-[11.3px] leading-[14px] tracking-[-0.24px] font-normal text-black mb-[64px] max-w-[315px] sm:max-w-[532px]">
            {project.description}
          </p>
        </div>

        {project.media && project.media.length > 0 && (
          <div className="bg-neutral-200 rounded-[5px] mb-[35.37px] md:mr-[15.3%]">
            <div className="flex flex-col gap-[90px] md:px-[145px] md:max-w-none lg:max-w-[803px] lg:mx-auto lg:px-0 py-[78px]">
              {project.media.map((mediaUrl, index) => (
                <Image
                  key={mediaUrl + index}
                  src={mediaUrl}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={800}
                  height={800} unoptimized
                  sizes="100vw"
                  className={cn("w-full h-auto object-contain rounded-[5px] px-6")}
                  style={{ width: '100%', height: 'auto' }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-[10.63px]">
          <h2 className="text-[11.4px] leading-[14px] tracking-[-0.24px] font-normal text-[#686868]">
            Related Projects
          </h2>
        </div>

        <div className="overflow-x-auto overflow-y-clip pb-[6px] mb-[57px] -mx-3 scrollbar-hide">
          <div className="flex gap-[12px] px-3">
            {relatedProjects.map((relatedProject) => (
              <div
                key={relatedProject.id}
                className="flex-shrink-0 w-[320px] sm:w-[600px]"
              >
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
          © other dev
        </p>
      </footer>
    </div>
  );
}
