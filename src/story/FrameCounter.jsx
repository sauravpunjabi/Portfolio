"use client";

import { useEffect, useRef } from "react";
import { sceneState } from "./store";

// Film-slate frame counter: FRAME 03 / 09 + live progress beam.
export default function FrameCounter({ visible }) {
  const barRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    let raf;
    const loop = () => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleY(${sceneState.progress})`;
      }
      if (labelRef.current) {
        const n = String(sceneState.frame + 1).padStart(2, "0");
        const total = String(sceneState.frameCount).padStart(2, "0");
        labelRef.current.textContent = `FRAME ${n} / ${total}`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <aside className={`rail ${visible ? "is-visible" : ""}`} aria-hidden="true">
      <div className="rail__track">
        <div className="rail__bar" ref={barRef} />
      </div>
      <span className="rail__label" ref={labelRef}>
        FRAME 01 / 09
      </span>
    </aside>
  );
}
