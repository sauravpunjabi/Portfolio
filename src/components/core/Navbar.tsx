"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/lib/data";
import MagneticButton from "@/components/core/MagneticButton";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastScrollY && currentY > 60) {
        setVisible(false);
      } else if (currentY < lastScrollY) {
        setVisible(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-7 flex justify-between items-center pointer-events-none"
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Monogram */}
      <button
        onClick={scrollToTop}
        className="pointer-events-auto font-mono text-base font-bold text-white hover:text-[#6c757d] transition-colors duration-200 tracking-widest uppercase"
        data-hover
      >
        SP
      </button>

      {/* Magnetic CTA */}
      <MagneticButton
        href={`mailto:${contact.email}`}
        className="pointer-events-auto font-mono text-[10px] tracking-[0.25em] text-white uppercase border border-[#495057] px-5 py-2.5 hover:bg-white hover:text-[#212529] hover:border-white transition-colors duration-200"
        strength={0.25}
      >
        Let&apos;s Talk
      </MagneticButton>
    </motion.nav>
  );
}
