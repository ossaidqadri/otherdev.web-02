export interface PlaylistOrImage {
  id: string;
  title: string;
  image: string;
  description: string;
  isPlaylistOrImage: true;
  url?: string;
  media?: string[];
}

export const playlistsAndImages: PlaylistOrImage[] = [
  {
    id: "control-loops-logo",
    title: "Behind Control Loops Software's Logo",
    image: "/images/expertise-page/control-loops-logo-design.webp",
    description: "How we worked on Control Loops identity",
    url: "https://controlloops.com",
    isPlaylistOrImage: true,
  },
  {
    id: "packaging-full",
    title: "Designing packaging for Other Dev hampers",
    image: "/images/about-page/packaging-vertical.webp",
    description: "Bringing Other Dev's design to the physical world",

    isPlaylistOrImage: true,
  },
  {
    id: "talha-and-kabeer",
    title: "Behind the scenes of Wish*",
    image: "/images/about-page/talha-and-me-123651.jpg",
    description: "Bringing Other Dev's design to the physical world",

    isPlaylistOrImage: true,
  },
];
