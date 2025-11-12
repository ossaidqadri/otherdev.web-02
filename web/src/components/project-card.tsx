import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  slug: string
  image: string
  description?: string
}

export function ProjectCard({
  title,
  slug,
  image,
}: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block">
      <Card className="relative aspect-square overflow-hidden bg-background rounded-[5px] transition-all hover:shadow-lg">
        <div className="relative h-full w-full p-[24px] flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            fill
            className="!object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Card>
    </Link>
  )
}
