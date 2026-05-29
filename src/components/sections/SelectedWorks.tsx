"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { FadeUp } from "@/components/core/TextReveal";
import { SplitTextReveal } from "@/components/core/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [3, -3]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-3, 3]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);

    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
    >
      <div
        className="block group cursor-pointer"
        onClick={() => router.push(`/work/${project.id}`)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && router.push(`/work/${project.id}`)}
        aria-label={`View case study for ${project.title}`}
      >
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl border border-white/[0.06] bg-zinc-900/50 overflow-hidden transition-all duration-500"
          animate={{
            borderColor: isHovered
              ? "rgba(96,165,250,0.25)"
              : "rgba(255,255,255,0.06)",
            boxShadow: isHovered
              ? "0 0 0 1px rgba(96,165,250,0.15), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(96,165,250,0.06)"
              : "0 4px 20px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Cursor glow */}
          {isHovered && (
            <div
              className="absolute pointer-events-none z-0 w-64 h-64 rounded-full blur-3xl opacity-10 transition-all duration-100"
              style={{
                left: cursorPos.x - 128,
                top: cursorPos.y - 128,
                background: "rgba(96,165,250,1)",
              }}
            />
          )}

          {/* Visual header */}
          <div
            className="relative h-56 md:h-64 overflow-hidden"
            style={{ background: `linear-gradient(135deg, #18181B 0%, ${project.accentColor?.replace('0.12', '0.08').replace('0.08', '0.06')} 50%, #18181B 100%)` }}
          >
            {/* Grid pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id={`grid-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
            </svg>

            {/* Project title in background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.span
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="font-mono text-[80px] md:text-[100px] font-bold text-white/[0.04] select-none leading-none whitespace-nowrap"
              >
                {project.title}
              </motion.span>
            </div>

            {/* Category badge */}
            <div className="absolute top-5 left-5">
              <span className="font-mono text-xs text-zinc-500 bg-zinc-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/[0.06]">
                {project.category}
              </span>
            </div>

            {/* Year */}
            <div className="absolute top-5 right-5">
              <span className="font-mono text-xs text-zinc-600">{project.year}</span>
            </div>

            {/* Hover CTA pill — follows cursor Y */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.85,
              }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex items-center gap-2 bg-white text-zinc-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-2xl">
                View Case Study
                <ArrowUpRight size={14} />
              </div>
            </motion.div>
          </div>

          {/* Card body */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-50 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm mt-0.5">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg border border-white/[0.06] text-zinc-500 hover:text-zinc-200 hover:border-white/15 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={14} />
                </motion.a>
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg border border-white/[0.06] text-zinc-500 hover:text-zinc-200 hover:border-white/15 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={14} />
                  </motion.a>
                )}
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-zinc-500 bg-zinc-800/60 px-3 py-1 rounded-md border border-white/[0.04]"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="font-mono text-xs text-zinc-600 px-3 py-1">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SelectedWorks() {
  return (
    <section id="work" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <FadeUp delay={0} className="mb-4">
              <div className="flex items-center gap-3">
                <span className="block w-8 h-px bg-zinc-700" />
                <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">
                  Selected Works
                </span>
              </div>
            </FadeUp>

            <SplitTextReveal
              text={"Projects that\nmatter."}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight text-zinc-50"
              stagger={0.1}
            />
          </div>

          <FadeUp delay={0.2}>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Each project is a case study in engineering and design — built
              with intent, shipped with care.
            </p>
          </FadeUp>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
