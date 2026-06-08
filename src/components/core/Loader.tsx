"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { AudioSystem } from "@/lib/audioSystem";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"loading" | "enter">("loading");
  const [visible, setVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Fade in loading text
    if (loadingRef.current) {
      gsap.fromTo(
        loadingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }

    // After 1.8s, transition to enter
    const t = window.setTimeout(() => {
      if (!loadingRef.current) return;
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setPhase("enter"),
      });
    }, 1800);

    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "enter" && enterRef.current) {
      gsap.fromTo(
        enterRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [phase]);

  const handleEnter = () => {
    AudioSystem.init();
    AudioSystem.playHover();

    // Slide entire overlay up — reveals site underneath
    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "expo.inOut",
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ backgroundColor: "#161719" }}
    >
      {/* ── Loading state: ——— L O A D I N G ——— */}
      {phase === "loading" && (
        <div
          ref={loadingRef}
          className="flex items-center gap-5"
          style={{ opacity: 0 }}
        >
          <div className="h-px w-14" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.55em",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            Loading
          </span>
          <div className="h-px w-14" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
        </div>
      )}

      {/* ── Enter state: [ enter ] */}
      {phase === "enter" && (
        <button
          ref={enterRef}
          onClick={handleEnter}
          className="font-mono uppercase transition-colors duration-200"
          style={{
            opacity: 0,
            fontSize: "10px",
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.45)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.9)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.45)")
          }
        >
          [ enter ]
        </button>
      )}
    </div>
  );
}
