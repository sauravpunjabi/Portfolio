"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import MagneticButton from "@/components/core/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { contact } from "@/lib/data";
import CanvasParticles from "@/components/webgl/CanvasParticles";

const HEADLINE_LINES = ["Frontend-Focused", "Fullstack", "Developer."];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      id="home"
    >
      {/* WebGL Scene */}
      <motion.div
        style={{ opacity: sceneOpacity }}
        className="absolute inset-0 z-0"
      >
        <CanvasParticles />
      </motion.div>

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,#09090B_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090B] to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, willChange: "transform" }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full"
      >
        <motion.div style={{ opacity, willChange: "opacity" }} className="pt-28 pb-16">
          {/* Label */}
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={mounted ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-zinc-600" />
              <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">
                Available for roles &amp; collaborations
              </span>
            </motion.div>
          </div>

          {/* Headline */}
          <div className="mb-10">
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={mounted ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 1,
                    ease: EASE_OUT_EXPO,
                    delay: 0.35 + i * 0.08,
                  }}
                  className={`leading-[0.95] tracking-tight font-bold text-zinc-50 ${
                    i === 0
                      ? "text-[clamp(3.5rem,9vw,9rem)]"
                      : i === 1
                      ? "text-[clamp(3.5rem,9vw,9rem)]"
                      : "text-[clamp(3.5rem,9vw,9rem)] gradient-text"
                  }`}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Description + CTAs */}
          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
            <div className="overflow-hidden max-w-md">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={mounted ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.7 }}
                className="text-zinc-400 text-base md:text-lg leading-relaxed"
              >
                I build digital products that balance engineering precision
                with human-centered design. Currently interning at Siddesh
                Technologies, Pune.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <MagneticButton
                onClick={scrollToWork}
                className="group flex items-center gap-2 px-6 py-3 bg-zinc-50 text-zinc-900 text-sm font-semibold rounded-full hover:bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                View my work
                <ArrowDown
                  size={14}
                  className="group-hover:translate-y-0.5 transition-transform duration-300"
                />
              </MagneticButton>

              <MagneticButton
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-white/10 text-zinc-300 text-sm font-medium rounded-full hover:border-white/20 hover:text-white transition-all duration-300"
              >
                <Github size={14} />
                GitHub
              </MagneticButton>

              <MagneticButton
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-white/10 text-zinc-300 text-sm font-medium rounded-full hover:border-white/20 hover:text-white transition-all duration-300"
              >
                <Linkedin size={14} />
                LinkedIn
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 px-6 md:px-12 lg:px-24 pb-8 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
          <span className="font-mono text-xs text-zinc-600 tracking-wider">
            SAURAV PUNJABI — 2025
          </span>
          <span className="font-mono text-xs text-zinc-600 tracking-wider">
            PUNE, INDIA
          </span>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-12 right-8 z-10 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase rotate-90 origin-center mb-6">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
