import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OtherDev",
  description: "Digital platforms for pioneering creatives",
  icons: {
    icon: "/TheOtherDevLogo.svg",
  },
  openGraph: {
    title: "OtherDev",
    description: "Digital platforms for pioneering creatives",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OtherDev Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OtherDev",
    description: "Digital platforms for pioneering creatives",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-[Arial,sans-serif] antialiased">{children}</body>
    </html>
  );
}
