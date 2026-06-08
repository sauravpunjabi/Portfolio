"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/core/Loader";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import { AudioSystem } from "@/lib/audioSystem";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    if (!loaderComplete) return;

    // Track scroll sections to crossfade synthesized drones dynamically
    const sections = ["home", "work", "about", "timeline", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px", // Trigger transitions when section covers center viewport
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          let synthIndex = 0; // 0 = Vision (Hero / Work)
          
          if (id === "about") {
            synthIndex = 1; // 1 = Craft (About)
          } else if (id === "timeline" || id === "contact") {
            synthIndex = 2; // 2 = Experience (Timeline / Contact)
          }

          AudioSystem.transitionTo(synthIndex);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [loaderComplete]);

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      <Hero isLoaded={loaderComplete} />
      <Work />
      <About />
      <Timeline />
      <Contact />
    </>
  );
}
