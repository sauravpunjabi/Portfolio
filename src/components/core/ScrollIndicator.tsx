"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "01" },
  { id: "work", label: "02" },
  { id: "about", label: "03" },
  { id: "timeline", label: "04" },
  { id: "contact", label: "05" },
];

export default function ScrollIndicator() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
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

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5 items-center pointer-events-none select-none">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <motion.button
            key={id}
            className="pointer-events-auto flex items-center gap-2 group"
            onClick={() => {
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label={`Jump to section ${label}`}
          >
            <motion.div
              className="w-px bg-[#ffffff]"
              animate={{
                height: isActive ? 24 : 8,
                opacity: isActive ? 1 : 0.2,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="font-mono text-[9px] tracking-widest"
              animate={{
                opacity: isActive ? 0.7 : 0,
                x: isActive ? 0 : 6,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {label}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
