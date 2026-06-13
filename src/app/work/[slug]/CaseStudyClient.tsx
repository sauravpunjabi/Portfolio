"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FadeUp } from "@/components/core/TextReveal";
import { projects, type Project } from "@/lib/data";
import { sceneState } from "@/story/store";
import Lenis from "lenis";

interface CaseStudyClientProps {
  project: Project;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <FadeUp>
      <div className="flex items-center gap-3 mb-6">
        <span className="block w-6 h-px" style={{ backgroundColor: "var(--line)" }} />
        <span
          className="font-mono uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--signal)" }}
        >
          {label}
        </span>
      </div>
    </FadeUp>
  );
}

function Divider() {
  return (
    <div
      className="my-16 md:my-24"
      style={{ height: "1px", backgroundColor: "var(--line)" }}
    />
  );
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const otherProjects = projects.filter((p) => p.id !== project.id);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("p-scroll-to", project.id);
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    sceneState.boot = 1;

    const lenis = new Lenis({ lerp: 0.085 });

    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      sceneState.velocity = Math.max(-1, Math.min(1, e.velocity / 60));
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        ".cs-meta",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".cs-title",
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(
          ".cs-subtitle",
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(
          ".cs-links",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.4"
        );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ backgroundColor: "transparent", color: "var(--bone)", minHeight: "100vh" }}>

      {/* Fixed nav — matches story nav style */}
      <nav
        aria-label="Case study navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px var(--gutter)",
          mixBlendMode: "difference",
        }}
      >
        <Link
          href="/"
          className="font-mono font-bold"
          style={{ fontSize: "12px", letterSpacing: "0.1em", color: "var(--bone)" }}
          data-hover
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("p-scroll-to", project.id);
            }
          }}
        >
          S—P<span style={{ color: "var(--signal)" }}>/</span>26
        </Link>
        <button
          onClick={handleBack}
          className="font-mono uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "var(--bone-dim)",
            transition: "color 0.25s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--bone)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--bone-dim)")}
          data-hover
        >
          ← Back
        </button>
      </nav>

      {/* Hero */}
      <div
        ref={headerRef}
        className="relative overflow-hidden pb-16 pt-36"
        style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        {/* Outlined ghost watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontStretch: "115%",
              fontSize: "20vw",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "transparent",
              WebkitTextStroke: "1px var(--line)",
            }}
          >
            {project.title}
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          {/* Category + year */}
          <div className="cs-meta flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "var(--signal)",
                border: "1px solid var(--line)",
                padding: "6px 14px",
              }}
            >
              {project.category}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: "11px", color: "var(--bone-dim)" }}
            >
              {project.year}
            </span>
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <h1
              className="cs-title uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontStretch: "115%",
                fontSize: "clamp(2.5rem, 9vw, 7rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: "var(--bone)",
                transform: "translateY(100%)",
                opacity: 0,
              }}
            >
              {project.title}
            </h1>
          </div>
          <div className="overflow-hidden mb-10">
            <p
              className="cs-subtitle font-mono lowercase"
              style={{
                fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)",
                color: "var(--bone-dim)",
                transform: "translateY(100%)",
                opacity: 0,
              }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* CTA links */}
          <div className="cs-links flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                padding: "10px 20px",
                border: "1px solid var(--line)",
                color: "var(--bone)",
                transition: "border-color 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--bone)";
                el.style.color = "var(--signal)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--line)";
                el.style.color = "var(--bone)";
              }}
              data-hover
              data-cursor="GitHub"
            >
              [github] ↗
            </a>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  padding: "10px 20px",
                  border: "1px solid var(--bone)",
                  backgroundColor: "var(--bone)",
                  color: "var(--ink)",
                  transition: "background-color 0.25s, color 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "transparent";
                  el.style.color = "var(--bone)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "var(--bone)";
                  el.style.color = "var(--ink)";
                }}
                data-hover
                data-cursor="Live"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body content */}
      <div className="max-w-7xl mx-auto px-8 pb-32 relative z-10">

        {/* Tags */}
        <FadeUp className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono"
              style={{
                fontSize: "10px",
                color: "var(--bone)",
                border: "1px solid var(--line)",
                padding: "6px 14px",
              }}
            >
              {tag}
            </span>
          ))}
        </FadeUp>

        <Divider />

        {/* Overview + Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <SectionLabel label="Overview" />
            <FadeUp delay={0.1}>
              <p
                className="font-mono leading-relaxed"
                style={{ fontSize: "13px", color: "#c4c0b7", maxWidth: "36rem" }}
              >
                {project.longDescription}
              </p>
            </FadeUp>
          </div>

          <div>
            <SectionLabel label="Key Outcomes" />
            <div className="space-y-3">
              {project.outcomes.map((outcome, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.05}>
                  <div
                    className="flex items-start gap-4 p-5"
                    style={{
                      border: "1px solid var(--line)",
                      backgroundColor: "var(--ink-2)",
                    }}
                  >
                    <span
                      className="font-mono shrink-0"
                      style={{ fontSize: "11px", color: "var(--signal)", marginTop: "1px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="font-mono leading-relaxed"
                      style={{ fontSize: "12px", color: "var(--bone)" }}
                    >
                      {outcome}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { dot: "#dc3545", label: "The Problem", text: project.problem },
            { dot: "#198754", label: "The Solution", text: project.solution },
          ].map(({ dot, label, text }, i) => (
            <FadeUp key={label} delay={i * 0.1}>
              <div
                className="p-8 h-full flex flex-col"
                style={{
                  border: "1px solid var(--line)",
                  backgroundColor: "var(--ink-2)",
                }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span
                    style={{ width: 6, height: 6, backgroundColor: dot, display: "inline-block", flexShrink: 0 }}
                  />
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.25em", color: "var(--bone-dim)" }}
                  >
                    {label}
                  </span>
                </div>
                <p
                  className="font-mono leading-relaxed"
                  style={{ fontSize: "12px", color: "#c4c0b7" }}
                >
                  {text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <Divider />

        {/* Architecture */}
        <div className="mb-16">
          <SectionLabel label="Technical Architecture" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.architecture.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.05}>
                <div
                  className="p-6"
                  style={{
                    border: "1px solid var(--line)",
                    backgroundColor: "var(--ink-2)",
                    transition: "border-color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--bone-dim)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)")
                  }
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="font-mono"
                      style={{ fontSize: "11px", color: "var(--signal)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4
                      className="font-mono font-bold uppercase"
                      style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--bone)" }}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p
                    className="font-mono leading-relaxed"
                    style={{ fontSize: "11px", color: "#c4c0b7" }}
                  >
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <Divider />

        {/* Challenges */}
        <div className="mb-16">
          <SectionLabel label="Engineering Challenges" />
          <div className="space-y-3">
            {project.challenges.map((ch, i) => (
              <FadeUp key={ch.title} delay={i * 0.05}>
                <div
                  className="flex flex-col md:flex-row gap-6 p-8"
                  style={{
                    border: "1px solid var(--line)",
                    backgroundColor: "var(--ink-2)",
                    transition: "border-color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--bone-dim)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)")
                  }
                >
                  <div className="md:w-56 shrink-0">
                    <h4
                      className="font-mono font-bold uppercase"
                      style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--bone)" }}
                    >
                      {ch.title}
                    </h4>
                  </div>
                  <p
                    className="font-mono leading-relaxed"
                    style={{ fontSize: "12px", color: "#c4c0b7" }}
                  >
                    {ch.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <Divider />

        {/* More Work */}
        <div>
          <SectionLabel label="More Work" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.05}>
                <Link href={`/work/${p.id}`} className="block" data-hover>
                  <div
                    className="p-6"
                    style={{
                      border: "1px solid var(--line)",
                      backgroundColor: "var(--ink-2)",
                      transition: "border-color 0.25s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--bone-dim)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)")
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="font-mono uppercase"
                        style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--signal)" }}
                      >
                        {p.category}
                      </span>
                      <span style={{ color: "var(--bone-dim)" }}>↗</span>
                    </div>
                    <h4
                      className="uppercase"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontStretch: "110%",
                        fontSize: "clamp(18px, 2.4vw, 28px)",
                        letterSpacing: "-0.01em",
                        color: "var(--bone)",
                      }}
                    >
                      {p.title}
                    </h4>
                    <p
                      className="font-mono lowercase mt-1"
                      style={{ fontSize: "11px", color: "var(--bone-dim)" }}
                    >
                      {p.subtitle}
                    </p>
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
