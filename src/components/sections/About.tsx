"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp, SplitTextReveal, TextRevealLine } from "@/components/core/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { education } from "@/lib/data";

const STATS = [
  { value: "3+", label: "Years of coding" },
  { value: "5+", label: "Projects shipped" },
  { value: "2", label: "Degrees in progress" },
  { value: "10+", label: "Technologies" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/[0.025] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section label */}
        <FadeUp delay={0} className="mb-16">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-px bg-zinc-700" />
            <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">
              About
            </span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Text */}
          <div>
            <SplitTextReveal
              text={"Full-stack craftsman\nobsessed with the\nexperience."}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-zinc-50"
              wrapperClassName="mb-10"
              stagger={0.1}
            />

            <FadeUp delay={0.3} className="space-y-5 mb-10">
              <p className="text-zinc-400 text-base md:text-lg leading-[1.75]">
                I&apos;m Saurav Punjabi, a frontend-focused fullstack developer
                based in Pune. I believe the best software lives at the
                intersection of clean engineering and thoughtful design — where
                what you build is just as considered as how it works.
              </p>
              <p className="text-zinc-400 text-base md:text-lg leading-[1.75]">
                My work spans AI-powered tools, SaaS platforms, and interactive
                web experiences. I care deeply about performance, interaction
                quality, and the small details that make an interface feel
                alive and intentional.
              </p>
              <p className="text-zinc-400 text-base md:text-lg leading-[1.75]">
                Currently interning at Siddesh Technologies while completing my
                Master in Computer Applications at MIT-WPU, Pune.
              </p>
            </FadeUp>

            {/* Education */}
            <FadeUp delay={0.5}>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="flex items-start justify-between gap-4 py-4 border-b border-white/[0.06]"
                  >
                    <div>
                      <p className="text-zinc-200 text-sm font-medium">{edu.degree}</p>
                      <p className="text-zinc-500 text-sm font-mono mt-0.5">{edu.school}</p>
                    </div>
                    <span className="font-mono text-xs text-zinc-600 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right: Stats + Abstract */}
          <div ref={ref} className="flex flex-col justify-between gap-12">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {STATS.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                    delay: i * 0.08,
                  }}
                  className="bg-zinc-950 p-8 group hover:bg-zinc-900/50 transition-colors duration-300"
                >
                  <div className="text-4xl md:text-5xl font-bold text-zinc-50 mb-2 font-mono group-hover:text-blue-400 transition-colors duration-300">
                    {value}
                  </div>
                  <div className="text-xs text-zinc-500 tracking-wide uppercase font-mono">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Abstract visual — geometric lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative h-48 rounded-2xl border border-white/[0.06] bg-zinc-900/30 overflow-hidden"
            >
              {/* Grid lines */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="rgba(96,165,250,0.3)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Glowing orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl" />

              {/* Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-7xl font-bold text-white/[0.04] select-none">
                  SP
                </span>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4">
                <div className="w-2 h-2 rounded-full bg-blue-400/60 animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-zinc-700 tracking-widest">
                  PUNE · INDIA
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
