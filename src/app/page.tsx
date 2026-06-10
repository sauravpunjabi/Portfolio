"use client";

import dynamic from "next/dynamic";

// The story runs entirely on the client (WebGL, Lenis, GSAP pinning) —
// skip SSR and show the terminal idle line until the bundle arrives.
const StoryApp = dynamic(() => import("@/story/StoryApp"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0e0e0c",
        color: "#8a877f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12,
        letterSpacing: "0.1em",
      }}
    >
      _loading_
    </div>
  ),
});

export default function Home() {
  return <StoryApp />;
}
