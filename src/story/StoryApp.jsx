"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Scene from "./Scene";
import Preloader from "./Preloader";
import Nav from "./Nav";
import FrameCounter from "./FrameCounter";
import Story from "./Story";
import { sceneState } from "./store";
import { navBus } from "./navBus";

gsap.registerPlugin(ScrollTrigger);

// Read once at mount time — safe because StoryApp is always client-only (ssr: false)
function hadEntered() {
  try { return sessionStorage.getItem("p-entered") === "1"; }
  catch { return false; }
}

export default function StoryApp() {
  // Skip the preloader if the user already entered this session (e.g. navigating back)
  const [skipLoader] = useState(hadEntered);
  const [entered, setEntered] = useState(skipLoader);
  const lenisRef = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({ lerp: 0.085 });
    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true, force: true });

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      sceneState.velocity = Math.max(-1, Math.min(1, e.velocity / 60));
    });

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // If skipping the preloader, unlock scroll and boot the world immediately
    if (skipLoader) {
      document.body.classList.remove("is-locked");
      sceneState.boot = 1;
      setTimeout(() => ScrollTrigger.refresh(), 120);
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEnter = () => {
    try { sessionStorage.setItem("p-entered", "1"); } catch {}
    setEntered(true);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    gsap.to(sceneState, { boot: 1, duration: 2.2, ease: "power2.inOut", delay: 0.2 });
    setTimeout(() => ScrollTrigger.refresh(), 120);
  };

  const handleNavigate = (key) => {
    if (!lenisRef.current) return;
    if (key === 0) {
      lenisRef.current.scrollTo(0, { duration: 1.6 });
      return;
    }
    const y = navBus.resolve?.(key);
    if (y != null) lenisRef.current.scrollTo(y, { duration: 1.8 });
  };

  return (
    <>
      <Scene />
      {!skipLoader && <Preloader onEnter={handleEnter} />}
      <Nav visible={entered} onNavigate={handleNavigate} />
      <FrameCounter visible={entered} />
      <main className="page">
        <Story entered={entered} />
      </main>
    </>
  );
}
