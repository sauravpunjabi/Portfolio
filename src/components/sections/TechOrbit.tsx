"use client";

import { motion } from "framer-motion";
import { FadeUp, SplitTextReveal } from "@/components/core/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { skills } from "@/lib/data";

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "◈",
  Backend: "◎",
  "AI & ML": "◉",
  Tools: "◇",
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "rgba(96,165,250,0.12)",
  Backend: "rgba(52,211,153,0.10)",
  "AI & ML": "rgba(167,139,250,0.10)",
  Tools: "rgba(251,191,36,0.08)",
};

const CATEGORY_BORDER_COLORS: Record<string, string> = {
  Frontend: "rgba(96,165,250,0.2)",
  Backend: "rgba(52,211,153,0.18)",
  "AI & ML": "rgba(167,139,250,0.18)",
  Tools: "rgba(251,191,36,0.15)",
};

function SkillChip({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay }}
      style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
      className="px-4 py-2.5 rounded-lg border font-mono text-sm text-zinc-400 cursor-default"
    >
      {skill}
    </motion.div>
  );
}

function CategoryBlock({
  category,
  items,
  index,
}: {
  category: string;
  items: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden border"
      style={{
        borderColor: CATEGORY_BORDER_COLORS[category],
        background: CATEGORY_COLORS[category],
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <span className="text-zinc-500 text-base">{CATEGORY_ICONS[category]}</span>
        <span className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase">
          {category}
        </span>
      </div>

      {/* Skills */}
      <div className="p-6 flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <SkillChip key={skill} skill={skill} delay={index * 0.08 + i * 0.03} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechOrbit() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <FadeUp delay={0} className="mb-4">
              <div className="flex items-center gap-3">
                <span className="block w-8 h-px bg-zinc-700" />
                <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">
                  Tech Stack
                </span>
              </div>
            </FadeUp>

            <SplitTextReveal
              text={"The tools I\nbuild with."}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight text-zinc-50"
              stagger={0.1}
            />
          </div>

          <FadeUp delay={0.2}>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              A curated stack built from real project experience — not just
              tutorials.
            </p>
          </FadeUp>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group, i) => (
            <CategoryBlock
              key={group.category}
              category={group.category}
              items={group.items}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
