export interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  url?: string;
  media?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "The Whitney Review",
    slug: "the-whitney-review",
    image: "/projects/whitney-review.jpg",
    description:
      "The Whitney Review of New Writing is an independent journal of literary criticism based in New York City.",
    url: "whitneyreview.org",
  },
  {
    id: "2",
    title: "BASKETCASE",
    slug: "basketcase",
    image: "/projects/basketcase.jpg",
    description:
      "Basketcase is a California-based brand infusing raw graphic-centric designs into modern menswear staples.",
  },
  {
    id: "3",
    title: "Studio Stuff",
    slug: "studio-stuff",
    image: "/projects/studio-stuff.jpg",
    description:
      "Studio Stuff is a graphic design agency led by Stu Maingot, creating bold and vibrant designs.",
  },
  {
    id: "4",
    title: "Constant Practice",
    slug: "constant-practice",
    image: "/projects/constant-practice.jpg",
    description:
      "Constant Practice sells archive fashion, specializing in retro-futuristic utilitarian garments and accessories.",
  },
  {
    id: "5",
    title: "Olly Shinder",
    slug: "olly-shinder",
    image: "/projects/olly-shinder.jpg",
    description:
      "Olly Shinder reimagines menswear with a queer lens, combining clubwear and technical apparel elements.",
  },
  {
    id: "6",
    title: "Surf Gang Records",
    slug: "surf-gang-records",
    image: "/projects/surf-gang-records.jpg",
    description:
      "Surf Gang is a NYC-based producer collective and label, known for their seminal hip-hop contributions.",
  },
  {
    id: "7",
    title: "iessi",
    slug: "iessi",
    image: "/projects/iessi.jpg",
    description:
      "Iessi is a sophisticated, alcohol-free aperitif inspired by Friulian tradition and modern Italian design.",
  },
  {
    id: "8",
    title: "BRYAN JIMENÈZ",
    slug: "bryan-jimenez",
    image: "/projects/bryan-jimenez.jpg",
    description:
      "Bryan Jimenèz blends workwear, military, and utilitarian fashion influences to create an expressive and fluid vision for menswear.",
  },
  {
    id: "9",
    title: "Paint Cracking",
    slug: "paint-cracking",
    image: "/projects/paint-cracking.jpg",
    description:
      "Paintcracking is a LA-based avant-garde tattoo project, featuring bold angular forms inspired by paint degradation.",
  },
  {
    id: "10",
    title: "Fey Fey Worldwide",
    slug: "fey-fey-worldwide",
    image: "/projects/fey-fey-worldwide.jpg",
    description:
      "Fey Fey Worldwide explores modern femininity through humor, blending performance and storytelling into garment making.",
  },
  {
    id: "11",
    title: "Margot Magazine",
    slug: "margot-magazine",
    image: "/projects/margot-magazine.jpg",
    description:
      "Margot is a magazine that celebrates women of uncommon passion and infinite curiosity.",
  },
  {
    id: "12",
    title: "Leila Čičić",
    slug: "leila-cicic",
    image: "/projects/leila-cicic.jpg",
    description:
      "Leila Čičić is an art and design director previously working at Bureau Borsche and &Walsh.",
  },
  {
    id: "13",
    title: "Ranxelle Levin",
    slug: "ranxelle-levin",
    image: "/projects/ranxelle-levin.jpg",
    description:
      "[Design Manual] is artist Ranxelle Levin's exploration in design, footwear, styling and more.",
  },
];
