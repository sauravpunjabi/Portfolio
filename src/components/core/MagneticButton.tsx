"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: "button" | "a" | "div";
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
  as: Tag = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const props = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick,
    ...(href ? { href, target, rel } : {}),
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {href ? (
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={className}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.a>
      ) : (
        <motion.button
          ref={ref as React.RefObject<HTMLButtonElement>}
          className={className}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onClick={onClick}
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.button>
      )}
    </motion.div>
  );
}
