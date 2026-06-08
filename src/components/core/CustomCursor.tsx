"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 });

  const tx = useTransform(x, (v) => v - 16);
  const ty = useTransform(y, (v) => v - 16);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setIsVisible(true);

      const el = e.target as Element;
      setIsHover(
        !!el.closest("a, button, [role='button'], [data-hover]") ||
          window.getComputedStyle(el).cursor === "pointer"
      );
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
      style={{ x: tx, y: ty }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      aria-hidden
    >
      <motion.div
        className="w-8 h-8 rounded-full bg-white"
        animate={{ scale: isHover ? 1.8 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
