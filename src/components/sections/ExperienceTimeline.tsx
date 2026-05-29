"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp, SplitTextReveal } from "@/components/core/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { experience } from "@/lib/data";

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof experience)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 pb-16 md:pb-20 relative"
    >
      {/* Timeline line */}
      <div className="hidden md:block absolute left-[199px] top-1 bottom-0 w-px bg-white/[0.06]">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="w-full h-full bg-gradient-to-b from-blue-400/30 to-transparent origin-top"
        />
      </div>

      {/* Left: Meta */}
      <div className="md:text-right">
        <div className="font-mono text-xs text-zinc-600 tracking-widest uppercase mb-2">
          {entry.period}
        </div>
        <div className="font-mono text-xs text-zinc-700 tracking-wider">
          {entry.location}
        </div>
        <div className="mt-2">
          <span className="inline-block font-mono text-[10px] px-2 py-1 rounded-md border border-white/[0.06] text-zinc-600">
            {entry.type}
          </span>
        </div>
      </div>

      {/* Right: Content */}
      <div className="relative">
        {/* Timeline dot */}
        <div className="hidden md:block absolute -left-[41px] top-1 w-2 h-2 rounded-full bg-blue-400/60 ring-4 ring-zinc-950" />

        <div className="mb-1">
          {entry.current && (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-blue-400 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              CURRENT
            </motion.span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-zinc-50 mb-1">
          {entry.role}
        </h3>
        <p className="text-zinc-400 font-medium mb-6">{entry.company}</p>

        <ul className="space-y-3">
          {entry.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: EASE_OUT_EXPO,
                delay: 0.3 + i * 0.07,
              }}
              className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed"
            >
              <span className="mt-2 w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
              {bullet}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-20">
          <FadeUp delay={0} className="mb-4">
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-zinc-700" />
              <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">
                Experience
              </span>
            </div>
          </FadeUp>

          <SplitTextReveal
            text={"Where I've\nbeen building."}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight text-zinc-50"
            stagger={0.1}
          />
        </div>

        {/* Timeline */}
        <div>
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Open to work notice */}
        <FadeUp delay={0.2}>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-zinc-900/30">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-green-400/80"
              />
              <span className="font-mono text-sm text-zinc-300">
                Open to full-time roles &amp; freelance projects
              </span>
            </div>
            <a
              href="mailto:sauravpunjabi123@gmail.com"
              className="ml-auto text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1.5"
            >
              Let&apos;s talk
              <span className="text-xs">→</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
