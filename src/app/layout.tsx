import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/core/Navbar";
import LenisProvider from "@/components/core/LenisProvider";
import AudioToggle from "@/components/core/AudioToggle";
import CustomCursor from "@/components/core/CustomCursor";
import ScrollIndicator from "@/components/core/ScrollIndicator";

const monoFont = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saurav Punjabi — Frontend-Focused Fullstack Developer",
  description:
    "I build digital products that balance engineering precision with human-centered design. Frontend-focused fullstack developer based in Pune, India.",
  keywords: [
    "Saurav Punjabi",
    "Frontend Developer",
    "Fullstack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Pune",
    "India",
  ],
  authors: [{ name: "Saurav Punjabi", url: "https://github.com/sauravpunjabi" }],
  openGraph: {
    title: "Saurav Punjabi — Frontend-Focused Fullstack Developer",
    description:
      "I build digital products that balance engineering precision with human-centered design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={monoFont.variable}>
      <body className="bg-themeBg text-themeText antialiased overflow-x-hidden relative">
        <LenisProvider>
          <CustomCursor />
          <ScrollIndicator />
          <AudioToggle />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
