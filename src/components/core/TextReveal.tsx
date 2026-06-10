"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className = "", delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

// Line reveal — wraps content in overflow-hidden + slides up
export function TextRevealLine({
  children,
  className = "",
  delay = 0,
}: FadeUpProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: "100%" },
        {
          y: "0%",
          duration: 0.9,
          ease: "power4.out",
          delay,
          scrollTrigger: {
            trigger: wrap,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} style={{ transform: "translateY(100%)" }}>
        {children}
      </div>
    </div>
  );
}

