import Image from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "relative aspect-square overflow-hidden rounded-[5px] transition-all flex items-center justify-center",
  {
    variants: {
      variant: {
        home: "bg-background hover:shadow-lg",
        work: "bg-neutral-200",
      },
    },
    defaultVariants: {
      variant: "home",
    },
  },
);

const imageContainerVariants = cva("relative w-full h-full", {
  variants: {
    variant: {
      home: "p-[24px]",
      work: "p-[50px]",
    },
  },
  defaultVariants: {
    variant: "home",
  },
});

const imageVariants = cva("object-contain transition-transform duration-300", {
  variants: {
    variant: {
      home: "group-hover:scale-[1.02]",
      work: "group-hover:scale-[0.99]",
    },
  },
  defaultVariants: {
    variant: "home",
  },
});

interface ProjectCardProps extends VariantProps<typeof cardVariants> {
  title: string;
  slug: string;
  image: string;
  description?: string;
  showText?: boolean;
}

export function ProjectCard({
  title,
  slug,
  image,
  description,
  variant,
  showText = false,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-[13px]">
      <Link href={`/work/${slug}`} className="block group">
        <div className={cardVariants({ variant })}>
          <div className={imageContainerVariants({ variant })}>
            <Image
              src={image}
              alt={title}
              fill
              className={imageVariants({ variant })}
            />
          </div>
        </div>
      </Link>

      {showText && (
        <Link
          href={`/work/${slug}`}
          className="box-border flex flex-col items-start pb-[3px] pt-0 px-0 relative shrink-0"
        >
          <div className="box-border flex flex-col items-start mb-[-3px] relative shrink-0 w-full">
            <div className="flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[11.4px] text-black tracking-[-0.24px] w-full">
              <p className="leading-[14px] whitespace-pre-wrap">{title}</p>
            </div>
          </div>
          <div className="box-border flex flex-col items-start mb-[-3px] pb-0 pt-[9px] px-0 relative shrink-0 w-full">
            <div className="flex flex-col font-normal justify-center leading-[14px] not-italic relative shrink-0 text-[#686868] text-[11.1px] tracking-[-0.24px] w-full whitespace-pre-wrap">
              <p className="mb-0">{description}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
