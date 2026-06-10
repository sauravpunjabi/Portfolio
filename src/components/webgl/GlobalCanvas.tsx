"use client";

import dynamic from "next/dynamic";

const WebGLParticles = dynamic(
  () => import("./WebGLParticles"),
  { ssr: false }
);

export default function GlobalCanvas() {
  return <WebGLParticles />;
}
