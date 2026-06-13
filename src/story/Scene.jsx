"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "./store";

// ── atmosphere, not decoration: dust you move through, a horizon you
// never reach, and a signal that flares every time the story turns ──

const dustVertex = /* glsl */ `
  attribute float aRand;
  attribute float aAccent;
  uniform float uTime;
  uniform float uBoot;
  uniform float uVel;
  uniform float uAgitation;
  uniform vec3 uMouse;
  uniform float uPixelRatio;
  varying float vAccent;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // idle drift, a little wilder when a project is being eyed
    float amp = 0.14 + uAgitation * 0.5;
    pos.x += sin(uTime * 0.22 + aRand * 51.0) * amp;
    pos.y += cos(uTime * 0.18 + aRand * 73.0) * amp;
    // scroll pushes the field like wind
    pos.y += uVel * (0.8 + aRand) * 1.6;

    vec4 world = modelMatrix * vec4(pos, 1.0);

    // bow away from the cursor
    vec2 d2 = world.xy - uMouse.xy;
    float d = length(d2) + 0.0001;
    float force = smoothstep(2.4, 0.0, d) * 0.9;
    world.xy += normalize(d2) * force;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.2 + aRand * 1.8) * (1.0 + aAccent * 0.6) * uPixelRatio * (10.0 / -mv.z);

    vAccent = aAccent;
    vAlpha = (0.16 + aRand * 0.38) * uBoot;
  }
`;

const dustFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  varying float vAccent;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(mix(uColor, uAccentColor, vAccent), vAlpha);
  }
`;

function Dust({ count = 2200 }) {
  const groupRef = useRef();
  const matRef = useRef();
  const { positions, rands, accents } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const rands = new Float32Array(count);
    const accents = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 19;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = 2.5 - Math.random() * 15;
      rands[i] = Math.random();
      accents[i] = Math.random() < 0.045 ? 1 : 0;
    }
    return { positions, rands, accents };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBoot: { value: 0 },
      uVel: { value: 0 },
      uAgitation: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1 },
      uColor: { value: new THREE.Color("#cfcbc2") },
      uAccentColor: { value: new THREE.Color("#ff4a1c") },
    }),
    []
  );

  const mouseTarget = useMemo(() => new THREE.Vector3(99, 99, 0), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value += delta;
    u.uBoot.value += (sceneState.boot - u.uBoot.value) * Math.min(1, delta * 2);
    u.uVel.value += (sceneState.velocity - u.uVel.value) * Math.min(1, delta * 4);
    u.uAgitation.value +=
      (sceneState.agitation - u.uAgitation.value) * Math.min(1, delta * 5);

    // project the pointer onto the field's mid-plane
    dir
      .set(state.pointer.x, state.pointer.y, 0.5)
      .unproject(state.camera)
      .sub(state.camera.position)
      .normalize();
    const t = (-2 - state.camera.position.z) / dir.z;
    mouseTarget.copy(state.camera.position).addScaledVector(dir, t);
    u.uMouse.value.lerp(mouseTarget, Math.min(1, delta * 7));

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (state.pointer.x * 0.05 - groupRef.current.rotation.y) * Math.min(1, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
          <bufferAttribute attach="attributes-aAccent" args={[accents, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={dustVertex}
          fragmentShader={dustFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function HorizonGrid() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    // crawl forever toward the viewer — the story always moves
    ref.current.position.z = ((state.clock.elapsedTime * 0.18) % 2) - 1;
    const mat = ref.current.material;
    mat.opacity += (0.14 * sceneState.boot - mat.opacity) * Math.min(1, delta * 2);
  });
  return (
    <gridHelper
      ref={ref}
      args={[90, 45, "#2b2b27", "#1c1c19"]}
      position={[0, -3.4, 0]}
      material-transparent
      material-opacity={0}
    />
  );
}

function SignalLight() {
  const ref = useRef();
  useFrame((state) => {
    const l = ref.current;
    if (!l) return;
    const t = state.clock.elapsedTime;
    l.position.set(
      Math.sin(t * 0.12) * 5,
      -1 + Math.sin(t * 0.3) * 1.4,
      -3 + Math.cos(t * 0.17) * 2
    );
    // flare at every chapter boundary
    const p = sceneState.progress * sceneState.frameCount;
    const f = p - Math.floor(p);
    const dist = Math.min(f, 1 - f);
    const pulse = Math.max(0, 1 - dist * 6);
    l.intensity = (6 + pulse * 26 + sceneState.agitation * 18) * sceneState.boot;
  });
  return <pointLight ref={ref} color="#ff4a1c" intensity={0} distance={18} />;
}

function Rig() {
  useFrame((state, delta) => {
    const k = Math.min(1, delta * 1.6);
    state.camera.position.x += (state.pointer.x * 0.5 - state.camera.position.x) * k;
    state.camera.position.y += (-state.pointer.y * 0.32 - state.camera.position.y) * k;
    state.camera.position.z = 6 + Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
    state.camera.lookAt(0, 0, -2);
  });
  return null;
}

export default function Scene() {
  return (
    <div className="gl-layer" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <fog attach="fog" args={["#0e0e0c", 6, 22]} />
        <Rig />
        <ambientLight intensity={0.3} />
        <Dust />
        <HorizonGrid />
        <SignalLight />
      </Canvas>
    </div>
  );
}
