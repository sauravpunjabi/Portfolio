"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  fill: string; // pre-built — never recreated in the hot loop
}

const COLORS = [
  { r: 96,  g: 165, b: 250 }, // blue-400  — 55%
  { r: 96,  g: 165, b: 250 }, // blue-400  — extra weight
  { r: 96,  g: 165, b: 250 }, // blue-400
  { r: 100, g: 116, b: 139 }, // slate-500
  { r: 220, g: 220, b: 230 }, // near-white
];

function makeParticle(w: number, h: number): Particle {
  const c       = COLORS[Math.floor(Math.random() * COLORS.length)];
  const isBlue  = c.r === 96;
  const opacity = isBlue
    ? Math.round((Math.random() * 0.32 + 0.08) * 20) / 20 // discrete → fewer unique strings
    : Math.round((Math.random() * 0.08 + 0.02) * 20) / 20;
  const x = Math.random() * w;
  const y = Math.random() * h;
  return {
    x, y,
    baseX: x,
    baseY: y,
    vx: (Math.random() - 0.5) * 0.1,
    vy: (Math.random() - 0.5) * 0.1,
    size: isBlue ? Math.random() * 1.6 + 0.5 : Math.random() * 0.8 + 0.2,
    fill: `rgba(${c.r},${c.g},${c.b},${opacity})`,
  };
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const raf       = useRef<number>(0);
  const prevTs    = useRef<number>(0);

  const init = useCallback((w: number, h: number) => {
    const ps = Array.from({ length: 900 }, () => makeParticle(w, h));
    // sort once so the draw loop stays within the same fillStyle as long as possible
    ps.sort((a, b) => (a.fill < b.fill ? -1 : 1));
    particles.current = ps;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };
    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });

    const R  = 120;
    const R2 = R * R;

    const draw = (ts: number) => {
      const dt    = Math.min(ts - prevTs.current, 50) / (1000 / 60);
      prevTs.current = ts;

      const { width: w, height: h } = canvas;
      const { x: mx, y: my } = mouse.current;

      // Cinematic trail — translucent bg instead of clear
      ctx.fillStyle = "rgba(9,9,11,0.15)";
      ctx.fillRect(0, 0, w, h);

      // ── Update positions (no canvas calls here) ──────────────────────
      for (const p of particles.current) {
        p.baseX += p.vx * dt;
        p.baseY += p.vy * dt;
        if (p.baseX < -4) p.baseX = w + 4;
        if (p.baseX > w + 4) p.baseX = -4;
        if (p.baseY < -4) p.baseY = h + 4;
        if (p.baseY > h + 4) p.baseY = -4;

        let tx = p.baseX;
        let ty = p.baseY;

        const dx    = p.baseX - mx;
        const dy    = p.baseY - my;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < R2 && dist2 > 0) {
          const dist = Math.sqrt(dist2);
          const f    = ((1 - Math.cos((dist / R) * Math.PI)) * 0.5 - 1) * -11;
          tx += (dx / dist) * f;
          ty += (dy / dist) * f;
        }

        // lazy lerp — gives the floaty, smooth feel
        p.x += (tx - p.x) * 0.035;
        p.y += (ty - p.y) * 0.035;
      }

      // ── Batched draw — one ctx.fill() per unique fillStyle ───────────
      // Particles are sorted by fill at init, so batches stay long.
      let activeFill = "";
      for (const p of particles.current) {
        if (p.fill !== activeFill) {
          if (activeFill !== "") ctx.fill(); // flush previous batch
          ctx.beginPath();
          ctx.fillStyle = p.fill;
          activeFill    = p.fill;
        }
        // moveTo resets the sub-path start so arcs don't connect
        ctx.moveTo(p.x + p.size, p.y);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      }
      if (activeFill !== "") ctx.fill(); // flush last batch

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf.current);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
