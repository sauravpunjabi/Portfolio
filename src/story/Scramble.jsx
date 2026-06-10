"use client";

import { useRef, useCallback } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#@$%&";

// Terminal-style scramble-decode on hover. Mutates textContent directly
// (no re-render churn) and always restores the original string.
export default function Scramble({ children, as: Tag = "span", className, ...rest }) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const text = String(children);

  const run = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    let frame = 0;
    const total = 16;
    const tick = () => {
      frame++;
      const reveal = Math.floor((frame / total) * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") out += " ";
        else if (i < reveal) out += text[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (frame < total) rafRef.current = requestAnimationFrame(tick);
      else el.textContent = text;
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  return (
    <Tag ref={ref} className={className} onMouseEnter={run} {...rest}>
      {text}
    </Tag>
  );
}
