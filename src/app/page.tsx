"use client";

import dynamic from "next/dynamic";

const StoryApp = dynamic(() => import("@/story/StoryApp"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0e0e0c",
      }}
    />
  ),
});

export default function Home() {
  return <StoryApp />;
}
