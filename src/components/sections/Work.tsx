"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";

function ProjectThumbnail({ projectId }: { projectId: string }) {
  // Programmatic technical vector previews using design system colors (#000000 surface, #495057 border, #ffffff text)
  if (projectId === "f1pulse") {
    return (
      <div className="w-full h-full bg-[#000000] border border-[#495057] p-4 flex flex-col justify-between font-mono text-[8px] text-accent select-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
        <div className="flex justify-between items-center border-b border-accent/20 pb-1.5 z-10">
          <span>SYS_VAL: telemetry</span>
          <span>● F1_PULSE</span>
        </div>
        <div className="flex-1 flex items-end gap-1 justify-center z-10 py-1">
          {[30, 50, 40, 70, 85, 95, 60, 70, 80, 100, 45, 60].map((h, i) => (
            <div key={i} className="w-2.5 bg-accent/20 border-t border-accent" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between items-center border-t border-accent/20 pt-1.5 z-10 text-[7px] text-[#ffffff]/50">
          <span>LAP_SPLIT: -0.142s</span>
          <span>RPM: 11,800</span>
        </div>
      </div>
    );
  }

  if (projectId === "jarvis") {
    return (
      <div className="w-full h-full bg-[#000000] border border-[#495057] p-4 flex flex-col justify-between font-mono text-[8px] text-blue-400 select-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
        <div className="flex justify-between items-center border-b border-blue-500/20 pb-1.5 z-10">
          <span>VOICE_ASSISTANT: ACTIVE</span>
          <span>1.84s LATENCY</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1 z-10 py-1">
          {[20, 50, 30, 90, 80, 100, 60, 40, 75, 20].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: ["20%", "85%", "20%"] }}
              transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
              className="w-1.5 bg-blue-500/30 border-t border-blue-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between items-center border-t border-blue-500/20 pt-1.5 z-10 text-[7px] text-[#ffffff]/50">
          <span>STT: whisper-local</span>
          <span>TTS: edge-neural</span>
        </div>
      </div>
    );
  }

  if (projectId === "autoserve") {
    return (
      <div className="w-full h-full bg-[#000000] border border-[#495057] p-4 flex flex-col justify-between font-mono text-[8px] text-emerald-400 select-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
        <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1.5 z-10">
          <span>SaaS: Multi-Tenant</span>
          <span>ROLE: ADMIN</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1 z-10 py-1 text-[7px]">
          <div className="border border-emerald-500/10 p-1 bg-emerald-500/5 flex justify-between">
            <span>JOB_CARD_#1024</span>
            <span>SYNCED</span>
          </div>
          <div className="border border-emerald-500/10 p-1 bg-emerald-500/5 flex justify-between">
            <span>INVENTORY_LOCK</span>
            <span>ACTIVE</span>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-emerald-500/20 pt-1.5 z-10 text-[7px] text-[#ffffff]/50">
          <span>DB: PostgreSQL</span>
          <span>SECURITY: RLS</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#000000] border border-[#495057] p-4 flex flex-col justify-between font-mono text-[8px] text-purple-400 select-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
      <div className="flex justify-between items-center border-b border-purple-500/20 pb-1.5 z-10">
        <span>PREP_BOT: gemini</span>
        <span>JSON_SCHEMA: ENFORCED</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1.5 z-10 py-1 text-[6.5px]">
        <div className="max-w-[80%] border border-purple-500/20 p-1 bg-purple-500/5 self-start">
          <span>Q: Explaining hooks?</span>
        </div>
        <div className="max-w-[80%] border border-purple-500/20 p-1 bg-purple-500/10 self-end text-right">
          <span>A: State lifecycle...</span>
        </div>
      </div>
      <div className="flex justify-between items-center border-t border-purple-500/20 pt-1.5 z-10 text-[7px] text-[#ffffff]/50">
        <span>STORE: Firebase</span>
        <span>FLOW: INTERACTIVE</span>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Work() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="min-h-screen py-24 relative bg-themeBg text-themeText flex flex-col justify-center border-t border-[var(--border)]"
    >
      {/* Section number background watermark (IBM Plex Mono, #ffffff/[0.015]) */}
      <div className="absolute top-12 left-8 font-mono text-[10vw] font-bold text-[#ffffff]/[0.015] leading-none pointer-events-none select-none">
        02
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        {/* Section Label */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="block w-6 h-px bg-[#495057]" />
            <span className="font-mono text-[10px] text-[#6c757d] tracking-[0.25em] uppercase">
              02 / SELECTED WORK
            </span>
          </div>
        </div>

        {/* Full-width Stacked Project Rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="border-t border-[#495057] w-full"
        >
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => router.push(`/work/${project.id}`)}
                className="group flex flex-col md:grid md:grid-cols-[60px_2.5fr_3fr_100px_40px] items-start md:items-center py-8 md:py-12 border-b border-[#495057] hover:bg-[#ffffff] hover:text-[#212529] cursor-pointer transition-colors duration-150 relative px-4 select-none"
              >
                {/* Index in mono */}
                <span className="font-mono text-xs text-[#6c757d] group-hover:text-[#212529]/70 transition-colors mb-2 md:mb-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Project name in IBM Plex Mono, bold */}
                <h3 className="font-mono text-2xl md:text-3xl font-bold uppercase leading-none tracking-tight">
                  {project.title}
                </h3>

                {/* Description in IBM Plex Mono */}
                <p className="font-mono text-xs text-[#6c757d] group-hover:text-[#212529]/85 transition-colors max-w-lg my-3 md:my-0 leading-relaxed">
                  {project.description}
                </p>

                {/* Year in mono */}
                <span className="font-mono text-xs text-[#6c757d] group-hover:text-[#212529]/70 transition-colors mb-3 md:mb-0">
                  {project.year}
                </span>

                {/* Arrow right */}
                <motion.span
                  animate={isHovered ? { x: 10 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-mono text-sm font-bold"
                >
                  →
                </motion.span>

                {/* Absolute Pinned Hover Thumbnail Preview */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-24 top-1/2 -translate-y-1/2 w-[280px] h-[180px] z-30 pointer-events-none hidden lg:block overflow-hidden shadow-2xl bg-[#000000]"
                    >
                      <ProjectThumbnail projectId={project.id} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
