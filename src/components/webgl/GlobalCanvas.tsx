"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("@/story/Scene"),
  { ssr: false }
);

export default function GlobalCanvas() {
  return <Scene />;
}
