"use client";

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scrollState";

// Volumetric smoke/fog — ground-fog distribution, AdditiveBlending.
// BUG WAS: aSize * 220 / depth with aSize=0.05-0.19 → 1-4px dots (invisible).
// FIX: multiplier 1080, aSize 0.3-1.8 → 20-120px puffs at camera depth.

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aOpacity;
  attribute float aPX;
  attribute float aPY;
  attribute float aPZ;
  attribute float aSpeed;

  uniform float uTime;
  uniform float uVelocity;
  uniform vec2  uMouseWorld;

  varying float vOpacity;

  float fbm(vec3 p) {
    float v  = sin(p.x * 0.7  + p.y * 0.5  + p.z * 0.3)  * 0.500;
    v       += sin(p.x * 1.4  - p.z * 0.5  + p.y * 0.2)  * 0.250;
    v       += sin(p.y * 1.8  + p.z * 0.7  - p.x * 0.4)  * 0.125;
    v       += sin(p.x * 3.1  + p.y * 0.9  + p.z * 1.8)  * 0.063;
    return v;
  }

  void main() {
    vOpacity = aOpacity;
    vec3 pos = position;

    float t  = uTime * aSpeed * 0.04;
    float vm = 1.0 + abs(uVelocity) * 0.8;

    pos.x += fbm(pos * 0.11 + vec3(aPX, 0.0, t))         * 3.2 * vm;
    pos.y += fbm(pos * 0.11 + vec3(0.0, aPY, t + 1.57))  * 2.2 * vm;
    pos.z += fbm(pos * 0.08 + vec3(aPZ, t,   0.0))        * 1.2;

    // Mouse parting — fog drifts away from cursor
    float mDist = length(pos.xy - uMouseWorld);
    float repel = smoothstep(8.0, 0.0, mDist) * 5.5;
    vec2  away  = normalize(pos.xy - uMouseWorld + vec2(0.001));
    pos.xy     += away * repel;

    vec4  mvPos  = modelViewMatrix * vec4(pos, 1.0);
    float depth  = max(-mvPos.z, 0.5);
    // aSize is in "world radius units * 60". 1080 multiplier gives ~60px at depth 18.
    gl_PointSize = clamp((aSize * 1080.0) / depth, 3.0, 220.0);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vOpacity;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;

    // Soft radial falloff — smooth fog puff, no hard core
    float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
    gl_FragColor = vec4(0.90, 0.90, 0.87, alpha);
  }
`;

export default function WebGLParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let disposed = false;

    const init = async () => {
      const THREE = await import("three");
      if (disposed || !canvas) return;

      const isMobile = window.innerWidth < 768;
      const COUNT    = isMobile ? 2500 : 8000;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const scene  = new THREE.Scene();
      const fov    = 65;
      const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.z = 18;

      // Viewport half-extents at z=0
      const halfH = camera.position.z * Math.tan((fov / 2) * (Math.PI / 180));
      const halfW = halfH * camera.aspect;

      const mouseWorld = new THREE.Vector2(0, 0);
      let targetMX = 0, targetMY = 0;

      const positions = new Float32Array(COUNT * 3);
      const sizes     = new Float32Array(COUNT);
      const opacities = new Float32Array(COUNT);
      const pX        = new Float32Array(COUNT);
      const pY        = new Float32Array(COUNT);
      const pZ        = new Float32Array(COUNT);
      const speeds    = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        // X: spread across full viewport width + slight overflow
        const xRand = (Math.random() - 0.5) * halfW * 2.4;

        // Y: bottom-biased distribution, fully within viewport.
        // 58% in lower half, 25% mid, 17% upper — classic ground fog.
        let yRand: number;
        const rv = Math.random();
        if (rv < 0.58) {
          yRand = -(Math.random() * halfH * 1.1);          // bottom half + slight bleed
        } else if (rv < 0.83) {
          yRand = Math.random() * halfH * 0.55;            // middle zone
        } else {
          yRand = (Math.random() * 2 - 1) * halfH * 1.05; // full spread
        }

        // Z depth field — creates layered depth in the fog
        const zRand = (Math.random() - 0.5) * 18;

        positions[i * 3]     = xRand;
        positions[i * 3 + 1] = yRand;
        positions[i * 3 + 2] = zRand;

        // Lower particles are larger and more opaque — they ARE the ground fog
        const depthFrac = Math.max(0, -yRand / halfH); // 0 at top, 1 at bottom
        const sizeMul   = 0.7 + depthFrac * 1.1;
        const opMul     = 0.7 + depthFrac * 0.9;

        // aSize * 1080 / depth gives pixel size. aSize range 0.25-1.5.
        sizes[i]     = (Math.random() * 0.7 + 0.25) * sizeMul;
        opacities[i] = (Math.random() * 0.10 + 0.07) * opMul;

        pX[i]    = Math.random() * 100;
        pY[i]    = Math.random() * 100;
        pZ[i]    = Math.random() * 100;
        speeds[i] = Math.random() * 0.5 + 0.15;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes,     1));
      geo.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
      geo.setAttribute("aPX",      new THREE.BufferAttribute(pX,        1));
      geo.setAttribute("aPY",      new THREE.BufferAttribute(pY,        1));
      geo.setAttribute("aPZ",      new THREE.BufferAttribute(pZ,        1));
      geo.setAttribute("aSpeed",   new THREE.BufferAttribute(speeds,    1));

      const mat = new THREE.ShaderMaterial({
        vertexShader:   VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uTime:       { value: 0 },
          uVelocity:   { value: 0 },
          uMouseWorld: { value: mouseWorld },
        },
        transparent: true,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const onMouseMove = (e: MouseEvent) => {
        targetMX = ((e.clientX / window.innerWidth) * 2 - 1) * halfW;
        targetMY = (-((e.clientY / window.innerHeight) * 2 - 1)) * halfH;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();

      const tick = () => {
        if (disposed) return;
        animId = requestAnimationFrame(tick);

        mat.uniforms.uTime.value     = clock.getElapsedTime();
        mat.uniforms.uVelocity.value += (scrollState.velocity - mat.uniforms.uVelocity.value) * 0.06;
        mouseWorld.x += (targetMX - mouseWorld.x) * 0.05;
        mouseWorld.y += (targetMY - mouseWorld.y) * 0.05;

        renderer.render(scene, camera);
      };

      tick();

      (canvas as any).__three_cleanup = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize",    onResize);
        cancelAnimationFrame(animId);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    };

    init();

    return () => {
      disposed = true;
      (canvas as any).__three_cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden
    />
  );
}
