"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const SECTIONS = [
  { id: "home",     label: "01" },
  { id: "work",     label: "02" },
  { id: "about",    label: "03" },
  { id: "timeline", label: "04" },
  { id: "contact",  label: "05" },
];

export default function ScrollIndicator() {
  const [active, setActive] = useState("home");
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Animate lines + labels when active section changes
  useEffect(() => {
    SECTIONS.forEach(({ id }, i) => {
      const line = lineRefs.current[i];
      const label = labelRefs.current[i];
      if (!line || !label) return;
      const isActive = id === active;
      gsap.to(line, {
        height: isActive ? 24 : 8,
        opacity: isActive ? 1 : 0.2,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(label, {
        opacity: isActive ? 0.7 : 0,
        x: isActive ? 0 : 6,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [active]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5 items-center pointer-events-none select-none">
      {SECTIONS.map(({ id, label }, i) => (
        <button
          key={id}
          className="pointer-events-auto flex items-center gap-2 group"
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label={`Jump to section ${label}`}
        >
          <div
            ref={(el) => { lineRefs.current[i] = el; }}
            className="w-px bg-white"
            style={{ height: 8, opacity: 0.2 }}
          />
          <span
            ref={(el) => { labelRefs.current[i] = el; }}
            className="font-mono text-[9px] tracking-widest"
            style={{ opacity: 0, transform: "translateX(6px)" }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
