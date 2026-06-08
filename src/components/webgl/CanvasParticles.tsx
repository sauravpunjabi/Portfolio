"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle3D {
  x: number;   // 3D coordinates relative to center
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  fill: string;
}

const COLORS = [
  { r: 255, g: 255, b: 255 }, // White — 50% weight
  { r: 255, g: 255, b: 255 },
  { r: 108, g: 117, b: 125 }, // Muted gray #6c757d
  { r: 73,  g: 80,  b: 87  }, // Border gray #495057
];

function makeParticle3D(w: number, h: number): Particle3D {
  const c = COLORS[Math.floor(Math.random() * COLORS.length)];
  const isWhite = c.r === 255;
  const opacity = isWhite
    ? Math.round((Math.random() * 0.12 + 0.04) * 20) / 20
    : Math.round((Math.random() * 0.08 + 0.02) * 20) / 20;

  // Distribute particles randomly in a 3D box
  const rangeX = w * 1.5;
  const rangeY = h * 1.5;
  const rangeZ = 800; // depth range

  const x = (Math.random() - 0.5) * rangeX;
  const y = (Math.random() - 0.5) * rangeY;
  const z = Math.random() * rangeZ; // 0 (near) to 800 (far)

  return {
    x, y, z,
    baseX: x,
    baseY: y,
    baseZ: z,
    size: isWhite ? Math.random() * 1.2 + 0.4 : Math.random() * 0.7 + 0.2,
    fill: `rgba(${c.r},${c.g},${c.b},${opacity})`,
  };
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle3D[]>([]);
  const mouse = useRef({ x: 0, y: 0 }); // Relative to center
  const targetCam = useRef({ x: 0, y: 0 });
  const currentCam = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const prevTs = useRef<number>(0);

  const init = useCallback((w: number, h: number) => {
    const ps = Array.from({ length: 700 }, () => makeParticle3D(w, h));
    // Sort by fill to optimize drawing batches
    ps.sort((a, b) => (a.fill < b.fill ? -1 : 1));
    particles.current = ps;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Mouse coordinates relative to screen center
      const mx = e.clientX - window.innerWidth / 2;
      const my = e.clientY - window.innerHeight / 2;
      mouse.current = { x: mx, y: my };
      // Pan camera slightly based on mouse
      targetCam.current = { x: mx * 0.12, y: my * 0.12 };
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const focalLength = 350; // Perspective focal depth
    const maxZ = 800;

    const draw = (ts: number) => {
      const dt = Math.min(ts - prevTs.current, 50) / (1000 / 60);
      prevTs.current = ts;

      const w = canvas.width;
      const h = canvas.height;

      // Lerp camera coordinates
      currentCam.current.x += (targetCam.current.x - currentCam.current.x) * 0.04 * dt;
      currentCam.current.y += (targetCam.current.y - currentCam.current.y) * 0.04 * dt;

      // Fade clear frame using the warm dark background #212529
      ctx.fillStyle = "rgba(33, 37, 41, 0.18)";
      ctx.fillRect(0, 0, w, h);

      // ── Update and Project Particles ──
      const ps = particles.current;
      for (const p of ps) {
        // Slowly drift particles forward (z decreases)
        p.z -= 0.6 * dt;

        // Reset if they pass the camera/view threshold
        if (p.z <= -focalLength) {
          p.z = maxZ;
          p.x = (Math.random() - 0.5) * (w * 1.5);
          p.y = (Math.random() - 0.5) * (h * 1.5);
        }

        // Apply mouse gravity/displacement in 3D
        const dx = p.x - mouse.current.x * 0.8;
        const dy = p.y - mouse.current.y * 0.8;
        const distSq = dx * dx + dy * dy;

        // Push away slightly in 3D space on mouse proximity
        if (distSq < 15000 && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const push = (1 - dist / 122) * 2;
          p.x += (dx / dist) * push * dt;
          p.y += (dy / dist) * push * dt;
        }

        // Restoring drift towards original center coordinates
        p.x += (p.baseX - p.x) * 0.01 * dt;
        p.y += (p.baseY - p.y) * 0.01 * dt;
      }

      // Group drawings by color batches
      let activeFill = "";
      for (const p of ps) {
        // 3D perspective projection formula
        const scale = focalLength / (focalLength + p.z);
        
        // Translate world coords to screen center and apply camera offset panning
        const sx = w / 2 + (p.x - currentCam.current.x) * scale;
        const sy = h / 2 + (p.y - currentCam.current.y) * scale;
        const projectedSize = p.size * scale;

        // Skip drawing if particle falls out of screen boundaries
        if (sx < 0 || sx > w || sy < 0 || sy > h || projectedSize <= 0) {
          continue;
        }

        if (p.fill !== activeFill) {
          if (activeFill !== "") ctx.fill(); // Draw previous batch
          ctx.beginPath();
          ctx.fillStyle = p.fill;
          activeFill = p.fill;
        }

        ctx.moveTo(sx + projectedSize, sy);
        ctx.arc(sx, sy, projectedSize, 0, Math.PI * 2);
      }
      
      if (activeFill !== "") ctx.fill(); // Flush final batch

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
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
