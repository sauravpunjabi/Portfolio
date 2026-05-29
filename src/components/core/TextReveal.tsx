"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { lineReveal, EASE_OUT_EXPO } from "@/lib/animations";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function TextRevealLine({
  children,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-5% 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        variants={lineReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.9,
          ease: EASE_OUT_EXPO,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface SplitTextRevealProps {
  text: string;
  className?: string;
  wrapperClassName?: string;
  delay?: number;
  once?: boolean;
  stagger?: number;
}

export function SplitTextReveal({
  text,
  className = "",
  wrapperClassName = "",
  delay = 0,
  once = true,
  stagger = 0.08,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-5% 0px" });

  const lines = text.split("\n");

  return (
    <div ref={ref} className={wrapperClassName}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            className={className}
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 0.9,
              ease: EASE_OUT_EXPO,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
