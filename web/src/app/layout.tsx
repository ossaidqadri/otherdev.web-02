import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OtherDev",
  description: "Digital platforms for pioneering creatives",
  icons: {
    icon: "/TheOtherDevLogo.svg",
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
