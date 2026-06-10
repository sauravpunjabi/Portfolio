"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = -200, mouseY = -200;
    let ringX = -200, ringY = -200;
    let visible = false;
    let hovered = false;
    let ringScale = 1;
    let cursorLabel = "";
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        ringX = mouseX;
        ringY = mouseY;
        visible = true;
      }

      const el = e.target as Element;
      const labelEl = el.closest("[data-cursor-label]") as HTMLElement | null;
      if (labelEl) {
        cursorLabel = labelEl.dataset.cursorLabel ?? "";
        hovered = true;
      } else if (el.closest("a, button, [role='button'], [data-hover]")) {
        cursorLabel = "";
        hovered = true;
      } else {
        cursorLabel = "";
        hovered = false;
      }
    };

    const onLeave  = () => { visible = false; };
    const onEnter  = () => { visible = true; };

    const tick = () => {
      // Lerp ring position with lag
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      // Scale: bigger when label, just expanded when plain hover, normal otherwise
      const targetScale = cursorLabel ? 2.8 : hovered ? 2.2 : 1;
      ringScale += (targetScale - ringScale) * 0.12;

      const dotOpacity  = visible && !hovered ? 1 : 0;
      const ringOpacity = visible ? 1 : 0;

      dot.style.transform  = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      dot.style.opacity    = String(dotOpacity);

      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${ringScale})`;
      ring.style.opacity   = String(ringOpacity);

      // Label: only visible when there's text and cursor is hovering with label
      const showLabel = !!(cursorLabel && visible);
      label.textContent = cursorLabel;
      label.style.opacity = showLabel ? "1" : "0";

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Exact-position dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[999999] pointer-events-none hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          opacity: 0,
          willChange: "transform, opacity",
          mixBlendMode: "difference",
        }}
        aria-hidden
      />

      {/* Lagged ring — expands on hover, shows label when data-cursor-label is present */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[999998] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.8)",
          opacity: 0,
          willChange: "transform, opacity",
          mixBlendMode: "difference",
        }}
        aria-hidden
      >
        <span
          ref={labelRef}
          style={{
            fontSize: "6px",
            fontFamily: "monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#ffffff",
            opacity: 0,
            transition: "opacity 0.15s ease",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        />
      </div>
    </>
  );
}
