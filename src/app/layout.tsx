import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import Navbar from "@/components/core/Navbar";
import CustomCursor from "@/components/core/CustomCursor";
import LenisProvider from "@/components/core/LenisProvider";

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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#09090B] text-[#FAFAFA] antialiased overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
