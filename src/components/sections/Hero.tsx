"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CanvasParticles from "@/components/webgl/CanvasParticles";

const MARQUEE_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "GSAP",
  "Framer Motion",
  "Tailwind CSS",
  "Python",
  "REST APIs",
  "MongoDB",
  "Gemini API",
];

// Separator glyph between marquee items
const SEP = "·";

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Clip-reveal each character from below
      tl.to(".char-span", {
        y: "0%",
        duration: 0.9,
        stagger: 0.038,
        ease: "power4.out",
      });

      // 2. Descriptor line fade-up
      tl.fromTo(
        ".hero-descriptor",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        "-=0.35"
      );

      // 3. Bottom meta + scroll hint
      tl.fromTo(
        ".hero-bottom",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        "-=0.2"
      );

      // 4. Marquee strip slides up
      tl.fromTo(
        ".hero-marquee",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-themeBg text-themeText"
    >
      {/* Background WebGL canvas */}
      <div className="absolute inset-0 z-0">
        <CanvasParticles />
      </div>

      {/* Section watermark */}
      <div className="absolute top-12 left-8 font-mono text-[10vw] font-bold text-white/[0.015] leading-none pointer-events-none select-none z-0">
        01
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col flex-1 pt-28 pb-0">

        {/* Giant name — vertically centered in remaining space */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12">

          {/* Name block */}
          <div className="flex flex-col items-center select-none">
            {/* SAURAV */}
            <div
              className="flex justify-center leading-[0.88] tracking-[-0.02em] text-[clamp(3.5rem,13vw,11rem)] font-mono font-bold text-white"
              aria-hidden="true"
            >
              {"SAURAV".split("").map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ lineHeight: "0.92" }}>
                  <span className="char-span inline-block translate-y-[110%]">{ch}</span>
                </span>
              ))}
            </div>

            {/* PUNJABI */}
            <div
              className="flex justify-center leading-[0.88] tracking-[-0.02em] text-[clamp(3.5rem,13vw,11rem)] font-mono font-bold text-white mt-1"
              aria-hidden="true"
            >
              {"PUNJABI".split("").map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ lineHeight: "0.92" }}>
                  <span className="char-span inline-block translate-y-[110%]">{ch}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Descriptor line — two-column split */}
          <div className="hero-descriptor opacity-0 mt-10 w-full max-w-5xl flex justify-between items-center px-1 md:px-0">
            <span className="font-mono text-[9px] md:text-[11px] tracking-[0.22em] text-[#6c757d] uppercase">
              Frontend-Focused Fullstack Dev
            </span>
            <span className="font-mono text-[9px] md:text-[11px] tracking-[0.22em] text-[#6c757d] uppercase">
              Pune · India · 2026
            </span>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-10 w-full border-t border-[#495057]/40">
          {/* Scroll hint + status */}
          <div className="hero-bottom opacity-0 w-full px-8 md:px-12 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#6c757d] uppercase select-none">
              <span className="inline-block animate-bounce">↓</span>
              <span>Scroll</span>
            </div>

            {/* Open to Work pill */}
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/80 uppercase select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              Open to Work
            </div>
          </div>

          {/* ── Infinite marquee strip ── */}
          <div
            className="hero-marquee opacity-0 w-full overflow-hidden border-t border-[#495057]/20 py-3"
          >
            {/* Doubled content for seamless loop */}
            <div className="flex whitespace-nowrap animate-marquee gap-10">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] tracking-[0.2em] text-[#6c757d] uppercase inline-flex items-center gap-10"
                >
                  {item}
                  <span className="text-[#495057]">{SEP}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
