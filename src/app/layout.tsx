import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Cursor from "@/story/Cursor";
import GlobalCanvas from "@/components/webgl/GlobalCanvas";

const displayFont = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saurav Punjabi — Frontend-Focused Fullstack Developer",
  description:
    "A portfolio told as a story. I build digital products that balance engineering precision with human-centered design. Frontend-focused fullstack developer based in Pune, India.",
  keywords: [
    "Saurav Punjabi",
    "Frontend Developer",
    "Fullstack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Pune",
    "India",
  ],
  authors: [{ name: "Saurav Punjabi", url: "https://github.com/sauravpunjabi" }],
  openGraph: {
    title: "Saurav Punjabi — Frontend-Focused Fullstack Developer",
    description:
      "A portfolio told as a story — WebGL, GSAP, and engineering precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${monoFont.variable} ${displayFont.variable}`}>
      <body className="antialiased overflow-x-hidden relative">
        <GlobalCanvas />
        <main>{children}</main>
        <Cursor />
      </body>
    </html>
  );
}
