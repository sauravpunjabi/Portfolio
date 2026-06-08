"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const slideUpReveal = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen py-24 relative bg-themeBg text-themeText flex flex-col justify-center border-t border-[var(--border)]"
    >
      {/* Large faint section watermark (IBM Plex Mono, #ffffff/[0.015]) */}
      <div className="absolute top-12 left-8 font-mono text-[10vw] font-bold text-[#ffffff]/[0.015] leading-none pointer-events-none select-none">
        03
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        {/* Section Label */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="block w-6 h-px bg-[#495057]" />
            <span className="font-mono text-[10px] text-[#6c757d] tracking-[0.25em] uppercase">
              03 / ABOUT
            </span>
          </div>
        </div>

        {/* 50/50 Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start w-full">
          {/* Left Column: Big Statement & Paragraphs */}
          <motion.div
            variants={slideUpReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-8 w-full"
          >
            <h2 className="font-mono font-bold text-4xl md:text-5xl leading-[1.15] tracking-tight uppercase text-[#ffffff]">
              FRONTEND IS<br />
              WHERE LOGIC<br />
              MEETS CRAFT
            </h2>

            <div className="flex flex-col gap-4 font-mono text-xs md:text-sm text-[#6c757d] leading-relaxed max-w-lg">
              <p>
                I&apos;m Saurav Punjabi, a frontend-focused fullstack developer based in Pune, India. 
                I design and build software at the intersection of clean mathematical logic and physical 
                craft — focusing on the small details that make an interface feel responsive and alive.
              </p>
              <p>
                Currently completing my MCA at MIT-WPU while interning at Siddesh Technologies, I build 
                highly interactive, visual systems using React, Next.js, and GSAP. I thrive on 
                solving UI bottlenecks, refining micro-interactions, and shipping production-grade code.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Skills Spec Sheet & Currently Block */}
          <motion.div
            variants={slideUpReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-10 w-full lg:border-l border-[#495057] lg:pl-16 pt-10 lg:pt-0"
          >
            {/* Skills Spec List */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] text-[#6c757d] tracking-[0.22em] uppercase block mb-2">
                TECHNICAL SPECIFICATIONS
              </span>
              <div className="flex flex-col gap-6">
                {skills.map((group) => (
                  <div key={group.category} className="flex flex-col gap-1">
                    <span className="font-mono text-base tracking-widest text-[#ffffff] uppercase font-bold">
                      {group.category}
                    </span>
                    <span className="font-mono text-xs text-[#6c757d] lowercase tracking-wide">
                      {group.items.join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently status Block (#000000 surface, #495057 border, 2em border-radius, p-8) */}
            <div className="border border-[#495057] p-8 bg-[#000000] rounded-[2em]">
              <span className="font-mono text-[10px] text-[#6c757d] tracking-[0.2em] block mb-4 uppercase">
                CURRENTLY
              </span>
              <ul className="flex flex-col gap-3 font-mono text-[11px] text-[#ffffff]/80">
                <li className="flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span>Interning at Siddesh Technologies</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span>Building F1Pulse</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span>Open to full-time roles</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
