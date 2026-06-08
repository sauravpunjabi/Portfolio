"use client";

import { useEffect, useState } from "react";
import { AudioSystem } from "@/lib/audioSystem";

export default function AudioToggle() {
  const [initialized, setInitialized] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Check periodically if the audio system has been initialized (i.e. user clicked ENTER)
    const interval = setInterval(() => {
      if (AudioSystem.getInitialized()) {
        setInitialized(true);
        setMuted(AudioSystem.getMutedState());
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Global mouseover hover beep trigger
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isInteractive = target.closest(
        "a, button, [role='button'], input, select, textarea, .hover-trigger"
      );
      if (isInteractive) {
        AudioSystem.playHover();
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const handleToggle = () => {
    const newState = AudioSystem.toggleMute();
    setMuted(newState);
  };

  if (!initialized) return null;

  return (
    <button
      onClick={handleToggle}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      className="fixed bottom-8 right-8 z-[999] flex items-center justify-center w-12 h-12 bg-[#000000] border border-[#495057] rounded-full hover:border-[#ffffff] transition-colors duration-200 pointer-events-auto"
    >
      <svg
        className="w-5 h-5 text-[#ffffff]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Wave Bar 1 */}
        <line
          x1="6"
          y1="18"
          x2="6"
          y2={muted ? "17" : "6"}
          className={!muted ? "animate-audio-bar-1" : ""}
          style={{ transformOrigin: "bottom" }}
        />
        {/* Wave Bar 2 */}
        <line
          x1="12"
          y1="18"
          x2="12"
          y2={muted ? "17" : "10"}
          className={!muted ? "animate-audio-bar-2" : ""}
          style={{ transformOrigin: "bottom" }}
        />
        {/* Wave Bar 3 */}
        <line
          x1="18"
          y1="18"
          x2="18"
          y2={muted ? "17" : "4"}
          className={!muted ? "animate-audio-bar-3" : ""}
          style={{ transformOrigin: "bottom" }}
        />
      </svg>
    </button>
  );
}
