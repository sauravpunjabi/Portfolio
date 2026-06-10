"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOT_LINES, PROFILE } from "./content";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

// scramble-decode effect for a single line of terminal text
function ScrambleLine({ text, cls, delay }) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let frame = 0;
    let raf;
    const start = performance.now() + delay * 1000;
    const tick = (now) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const progress = Math.min(1, frame / 24);
      const reveal = Math.floor(text.length * progress);
      let out = text.slice(0, reveal);
      for (let i = reveal; i < Math.min(text.length, reveal + 6); i++) {
        out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOutput(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay]);

  return <div className={cls}>{output || " "}</div>;
}

export default function Preloader({ onEnter }) {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-locked");
    if (reduced.current) {
      setCount(100);
      setReady(true);
      return;
    }
    const t0 = performance.now();
    const DURATION = 2400;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / DURATION);
      // ease the counter so it sprints then settles like a real loader
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setReady(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    document.body.classList.remove("is-locked");
    onEnter();
  };

  // keyboard: Enter key also enters
  useEffect(() => {
    if (!ready) return;
    const onKey = (e) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="preloader__top">
            <span>{PROFILE.name.join(" ")}</span>
            <span>Folio — 2026</span>
          </div>

          <div className="preloader__terminal" aria-live="polite">
            {BOOT_LINES.map((line, i) => (
              <ScrambleLine
                key={line.text}
                text={line.text}
                cls={line.cls}
                delay={reduced.current ? 0 : i * 0.35}
              />
            ))}
          </div>

          <div className="preloader__bottom">
            <div className="preloader__count">{count}</div>
            <AnimatePresence>
              {ready && (
                <motion.button
                  className="preloader__enter"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={handleEnter}
                  data-hover
                >
                  [ Enter ]
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="preloader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
