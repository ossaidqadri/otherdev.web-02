import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  slug: string
  image: string
}

export function ProjectCard({
  title,
  slug,
  image,
}: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block">
      <Card className="relative aspect-square overflow-hidden bg-white p-3 transition-all hover:shadow-lg">
        <div className="relative h-full w-full rounded-sm overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Card>
    </Link>
  )
}
