"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { FadeUp } from "@/components/core/TextReveal";
import MagneticButton from "@/components/core/MagneticButton";
import { projects, type Project } from "@/lib/data";

interface CaseStudyClientProps {
  project: Project;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <FadeUp>
      <div className="flex items-center gap-3 mb-6">
        <span className="block w-6 h-px bg-[#495057]" />
        <span className="font-mono text-[10px] text-[#6c757d] tracking-[0.2em] uppercase">
          {label}
        </span>
      </div>
    </FadeUp>
  );
}

function Divider() {
  return <div className="h-px bg-[#495057]/40 my-16 md:my-24" />;
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <div className="min-h-screen bg-[#212529] text-[#ffffff] font-mono selection:bg-accent selection:text-[#ffffff]">
      {/* Back button link */}
      <div className="fixed top-8 left-6 md:left-12 z-40">
        <MagneticButton
          href="/"
          className="flex items-center gap-2 text-[#6c757d] hover:text-[#ffffff] transition-colors duration-150 text-xs font-bold font-mono tracking-wider uppercase border border-[#495057] bg-[#000000] px-5 py-2.5 rounded-[2em]"
          as="a"
        >
          <span>←</span>
          <span>Back</span>
        </MagneticButton>
      </div>

      {/* Hero Header */}
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end overflow-hidden pb-12 pt-36">
        {/* Giant background typography watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none select-none">
          <span className="font-mono text-[16vw] font-bold text-[#ffffff]/[0.012] leading-none whitespace-nowrap uppercase">
            {project.title}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          {/* Category & Year */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-[10px] text-[#6c757d] bg-[#000000] border border-[#495057] px-3.5 py-1.5 rounded-[2em] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#6c757d] font-bold">{project.year}</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#ffffff] leading-[0.95] uppercase"
            >
              {project.title}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
              className="text-lg md:text-xl text-[#6c757d] lowercase font-normal"
            >
              {project.subtitle}
            </motion.p>
          </div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-[2em] border border-[#495057] text-[#ffffff] text-xs font-bold uppercase tracking-wider bg-[#000000] hover:border-[#ffffff] transition-colors duration-200"
            >
              <span>[github]</span>
              <span>↗</span>
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-[2em] bg-accent text-[#ffffff] text-xs font-bold uppercase tracking-wider hover:bg-[#8b5cf6] transition-colors duration-200"
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-8 pb-32 relative z-10">
        {/* Tags list */}
        <FadeUp className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-[#6c757d] bg-[#000000] border border-[#495057] px-3.5 py-1.5 rounded-[2em]"
            >
              {tag}
            </span>
          ))}
        </FadeUp>

        <Divider />

        {/* Overview grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <SectionLabel label="Overview" />
            <FadeUp delay={0.1}>
              <p className="text-[#6c757d] text-sm md:text-base leading-relaxed max-w-xl">
                {project.longDescription}
              </p>
            </FadeUp>
          </div>

          {/* Outcomes list */}
          <div>
            <SectionLabel label="Key Outcomes" />
            <div className="space-y-4">
              {project.outcomes.map((outcome, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.05}>
                  <div className="flex items-start gap-4 p-6 rounded-[2em] border border-[#495057] bg-[#000000] shadow-sm">
                    <span className="font-mono text-accent text-xs font-bold shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[#ffffff]/90 text-xs md:text-sm leading-relaxed">{outcome}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* Problem & Solution block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FadeUp>
            <div className="p-8 rounded-[2em] border border-[#495057] bg-[#000000] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="font-mono text-[10px] text-[#6c757d] tracking-widest uppercase">
                    The Problem
                  </span>
                </div>
                <p className="text-[#6c757d] text-xs md:text-sm leading-relaxed">{project.problem}</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="p-8 rounded-[2em] border border-[#495057] bg-[#000000] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="font-mono text-[10px] text-[#6c757d] tracking-widest uppercase">
                    The Solution
                  </span>
                </div>
                <p className="text-[#ffffff]/90 text-xs md:text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </FadeUp>
        </div>

        <Divider />

        {/* Architecture grid */}
        <div className="mb-16">
          <SectionLabel label="Technical Architecture" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.architecture.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.05}>
                <div className="p-6 rounded-[2em] border border-[#495057] bg-[#000000] group hover:border-[#ffffff] transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-accent text-xs font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-bold text-sm text-[#ffffff] uppercase tracking-wider">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[#6c757d] text-xs leading-relaxed group-hover:text-[#ffffff]/90 transition-colors">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <Divider />

        {/* Engineering Challenges */}
        <div className="mb-16">
          <SectionLabel label="Engineering Challenges" />
          <div className="space-y-4">
            {project.challenges.map((challenge, i) => (
              <FadeUp key={challenge.title} delay={i * 0.05}>
                <div className="flex flex-col md:flex-row gap-6 p-8 rounded-[2em] border border-[#495057] bg-[#000000] group hover:border-[#ffffff] transition-all duration-200">
                  <div className="md:w-72 shrink-0">
                    <h4 className="font-bold text-sm text-[#ffffff] uppercase tracking-wider">
                      {challenge.title}
                    </h4>
                  </div>
                  <p className="text-[#6c757d] text-xs md:text-sm leading-relaxed group-hover:text-[#ffffff]/90 transition-colors">
                    {challenge.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <Divider />

        {/* More Work Navigator */}
        <div>
          <SectionLabel label="More Work" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.05}>
                <Link href={`/work/${p.id}`} className="block group">
                  <div className="p-6 rounded-[2em] border border-[#495057] bg-[#000000] hover:border-[#ffffff] transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[9px] text-[#6c757d] uppercase tracking-widest">{p.category}</span>
                      <span className="text-[#6c757d] group-hover:text-[#ffffff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150">
                        ↗
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#ffffff] group-hover:text-accent transition-colors uppercase">
                      {p.title}
                    </h4>
                    <p className="text-[#6c757d] text-xs lowercase mt-1">{p.subtitle}</p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
