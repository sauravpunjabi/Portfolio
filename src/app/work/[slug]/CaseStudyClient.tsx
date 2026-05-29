"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, ArrowUpRight } from "lucide-react";
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
      <div className="flex items-center gap-3 mb-8">
        <span className="block w-6 h-px bg-zinc-700" />
        <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">
          {label}
        </span>
      </div>
    </FadeUp>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.06] my-16 md:my-24" />;
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Back link */}
      <div className="fixed top-8 left-6 md:left-12 z-40">
        <MagneticButton
          href="/"
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors duration-200 text-sm"
          as="a"
        >
          <ArrowLeft size={14} />
          Back
        </MagneticButton>
      </div>

      {/* Hero */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cs-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(96,165,250,0.15)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cs-grid)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B]" />
        </div>

        {/* Giant background title */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
          <span className="font-mono text-[15vw] font-bold text-white/[0.025] select-none leading-none whitespace-nowrap">
            {project.title}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-16 pt-40">
          {/* Category + Year */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="font-mono text-xs text-zinc-500 bg-zinc-900 border border-white/[0.06] px-3 py-1.5 rounded-full">
              {project.category}
            </span>
            <span className="font-mono text-xs text-zinc-700">{project.year}</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-50 leading-[0.95]"
            >
              {project.title}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.18 }}
              className="text-2xl md:text-3xl text-zinc-500 font-medium"
            >
              {project.subtitle}
            </motion.p>
          </div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-zinc-300 text-sm hover:border-white/20 hover:text-white transition-all duration-300"
            >
              <Github size={14} />
              View Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-50 text-zinc-900 text-sm font-semibold hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Live Demo
                <ExternalLink size={14} />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-32">
        {/* Tags */}
        <FadeUp className="flex flex-wrap gap-2 mb-16">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-white/[0.06] px-3 py-1.5 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </FadeUp>

        <Divider />

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <SectionLabel label="Overview" />
            <FadeUp delay={0.1}>
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
                {project.longDescription}
              </p>
            </FadeUp>
          </div>

          {/* Key outcomes */}
          <div>
            <SectionLabel label="Outcomes" />
            <div className="space-y-4">
              {project.outcomes.map((outcome, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.07}>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-zinc-900/30">
                    <span className="font-mono text-blue-400/60 text-sm shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-zinc-300 text-sm leading-relaxed">{outcome}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FadeUp>
            <div className="p-8 rounded-2xl border border-white/[0.06] bg-zinc-900/30 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <span className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase">
                  The Problem
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="p-8 rounded-2xl border border-white/[0.06] bg-zinc-900/30 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
                <span className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase">
                  The Solution
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
            </div>
          </FadeUp>
        </div>

        <Divider />

        {/* Architecture */}
        <div className="mb-16">
          <SectionLabel label="Architecture" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.architecture.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-900/20 group hover:border-blue-400/20 hover:bg-zinc-900/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-blue-400/50 text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
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
          <div className="space-y-6">
            {project.challenges.map((challenge, i) => (
              <FadeUp key={challenge.title} delay={i * 0.07}>
                <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-zinc-900/20 group hover:border-white/[0.1] transition-all duration-300">
                  <div className="md:w-64 shrink-0">
                    <h4 className="font-semibold text-zinc-100 md:text-lg group-hover:text-white transition-colors">
                      {challenge.title}
                    </h4>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {challenge.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <Divider />

        {/* Other projects */}
        <div>
          <SectionLabel label="More Work" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.08}>
                <Link href={`/work/${p.id}`} className="block group">
                  <div className="p-6 rounded-2xl border border-white/[0.06] bg-zinc-900/30 hover:border-white/[0.12] hover:bg-zinc-900/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-zinc-600">{p.category}</span>
                      <ArrowUpRight
                        size={14}
                        className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-zinc-200 mb-1 group-hover:text-white transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-zinc-500 text-sm">{p.subtitle}</p>
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
