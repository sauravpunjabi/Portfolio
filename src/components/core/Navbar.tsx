"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarVariants, EASE_OUT_EXPO } from "@/lib/animations";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setIsVisible(false);
        setMenuOpen(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        initial="visible"
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? "mx-4 mt-4 rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl shadow-2xl"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <MagneticButton href="#" className="group">
              <span className="font-mono text-sm tracking-widest text-zinc-400 group-hover:text-zinc-100 transition-colors duration-300">
                SP
              </span>
            </MagneticButton>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  onClick={() => handleNavClick(href)}
                  className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors duration-300 font-medium tracking-wide"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  {label}
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <MagneticButton
                href="mailto:sauravpunjabi123@gmail.com"
                className="text-sm font-medium px-4 py-2 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                Get in touch
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                className="block h-px w-full bg-zinc-400"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-px w-full bg-zinc-400"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                className="block h-px w-full bg-zinc-400"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.button
                key={label}
                onClick={() => handleNavClick(href)}
                className="text-3xl font-medium text-zinc-300 hover:text-white transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                {label}
              </motion.button>
            ))}
            <motion.a
              href="mailto:sauravpunjabi123@gmail.com"
              className="mt-4 text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              sauravpunjabi123@gmail.com
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
