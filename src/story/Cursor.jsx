"use client";

import { useEffect, useRef, useState } from "react";

// Target-lock cursor: four corner brackets idle in a small rotating box
// around the pointer; over any interactive element they fly out and
// lock onto its bounding box like a HUD acquiring a target.
export default function Cursor() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const mouse = { x: -100, y: -100 };
    // current box: centre x/y, width, height, rotation
    const box = { x: -100, y: -100, w: 28, h: 28, r: 0 };
    let target = null; // locked element
    let idleSpin = 0;
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onOver = (e) => {
      const hot = e.target.closest("a, button, [data-hover]");
      target = hot || null;
      if (labelRef.current) {
        const text = hot?.dataset?.cursor || "";
        labelRef.current.textContent = text;
        labelRef.current.style.opacity = text ? 1 : 0;
      }
    };

    const loop = () => {
      let tx, ty, tw, th, tr;
      if (target && document.contains(target)) {
        const r = target.getBoundingClientRect();
        // off-screen targets release the lock
        if (r.bottom < 0 || r.top > innerHeight) {
          target = null;
        } else {
          tx = r.left + r.width / 2;
          ty = r.top + r.height / 2;
          tw = r.width + 18;
          th = r.height + 14;
          tr = 0;
        }
      }
      if (!target) {
        idleSpin += 0.018;
        tx = mouse.x;
        ty = mouse.y;
        tw = 28;
        th = 28;
        tr = idleSpin;
      }

      const k = target ? 0.22 : 0.16;
      box.x += (tx - box.x) * k;
      box.y += (ty - box.y) * k;
      box.w += (tw - box.w) * k;
      box.h += (th - box.h) * k;
      box.r += (tr - box.r) * 0.1;

      const root = rootRef.current;
      if (root) {
        root.style.transform = `translate(${box.x}px, ${box.y}px) rotate(${box.r}rad)`;
        root.style.setProperty("--cw", `${box.w}px`);
        root.style.setProperty("--ch", `${box.h}px`);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 2}px, ${mouse.y - 2}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${mouse.x + 18}px, ${mouse.y + 18}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={rootRef} className="tcursor">
        <span className="tcursor__corner tcursor__corner--tl" />
        <span className="tcursor__corner tcursor__corner--tr" />
        <span className="tcursor__corner tcursor__corner--bl" />
        <span className="tcursor__corner tcursor__corner--br" />
      </div>
      <div ref={dotRef} className="tcursor__dot" />
      <div ref={labelRef} className="tcursor__label" />
    </>
  );
}
