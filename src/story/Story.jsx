"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE, PROJECTS, STATEMENT, JOURNEY, CAPABILITIES } from "./content";
import { sceneState } from "./store";
import { navBus } from "./navBus";
import Magnetic from "./Magnetic";
import Scramble from "./Scramble";

gsap.registerPlugin(ScrollTrigger);

// frame map: 0 name · 1 thesis · 2 slate · 3-5 projects · 6 journey · 7 obsessions · 8 contact
const CHAPTER_LABELS = {
  works: 2,
  about: 3 + PROJECTS.length,
  contact: 5 + PROJECTS.length,
};

// .ch is inline-block, so a plain space collapses to zero width — spaces
// must be non-breaking to survive the split
const Chars = ({ text }) => (
  <>
    {text.split("").map((c, i) => (
      <span className="ch" key={i}>
        {c === " " ? " " : c}
      </span>
    ))}
  </>
);

export default function Story({ entered }) {
  const rootRef = useRef(null);
  const [time, setTime] = useState("");

  // local time for the closing frame
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // opening: frame 0 plays when the boot gate lifts
  useEffect(() => {
    if (!entered) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.4 })
        .to(".frame--0 .ch", {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.035,
        })
        .to(
          ".frame--0 .frame__meta",
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
    }, rootRef);
    return () => ctx.revert();
  }, [entered]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.clearScrollMemory();
    }

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray(".frame");
      const N = frames.length;
      sceneState.frameCount = N;

      // ---- initial states ----
      frames.forEach((f, i) => {
        if (i > 0) gsap.set(f, { autoAlpha: 0 });
      });
      gsap.set(".frame:not(.frame--0) .ch", { yPercent: 120 });
      gsap.set(".frame--0 .ch", { yPercent: 120 }); // opening tween brings them in
      gsap.set(".frame__meta", { opacity: 0, y: 18 });
      gsap.set(".f-thesis .word", { opacity: 0.08 });
      gsap.set(".cap-line", { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${N * 110}%`,
          pin: true,
          scrub: 0.9,
          onUpdate: (self) => {
            sceneState.progress = self.progress;
            sceneState.frame = Math.min(
              N - 1,
              Math.floor(self.progress * N + 0.35)
            );
          },
        },
      });

      const enterChars = (f, at) => {
        const targets = f.querySelectorAll(".ch");
        if (targets.length > 0) {
          tl.to(targets, { yPercent: 0, duration: 0.38, ease: "power3.out", stagger: 0.012 }, at);
        }
      };
      const exitChars = (f, at) => {
        const targets = f.querySelectorAll(".ch");
        if (targets.length > 0) {
          tl.to(targets, { yPercent: -120, duration: 0.3, ease: "power2.in", stagger: 0.008 }, at);
        }
      };
      const enterMeta = (f, at) => {
        const metas = f.querySelectorAll(".frame__meta");
        if (metas.length) {
          tl.to(metas, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, at);
        }
      };

      frames.forEach((f, i) => {
        tl.addLabel(`f${i}`, i);

        // visibility window — frame 0's chars belong to the opening
        // timeline only; the scrub must never touch them or the two
        // fight over start values when scrolling back to the top
        if (i > 0) {
          tl.to(f, { autoAlpha: 1, duration: 0.18 }, i - 0.18);
          enterChars(f, i - 0.15);
          enterMeta(f, i + 0.05);
        }
        if (i < N - 1) {
          if (i > 0) {
            exitChars(f, i + 0.52);
            const metas = f.querySelectorAll(".frame__meta");
            if (metas.length) {
              tl.to(metas, { opacity: 0, y: -14, duration: 0.2 }, i + 0.52);
            }
          }
          tl.to(f, { autoAlpha: 0, duration: 0.2 }, i + 0.74);
        }

        // ---- per-frame signature moves ----
        if (f.classList.contains("frame--0")) {
          // the name tears apart as the story begins
          tl.to(".f-name .line--1", { xPercent: -16, ease: "none", duration: 0.55 }, 0.2);
          tl.to(".f-name .line--2", { xPercent: 16, ease: "none", duration: 0.55 }, 0.2);
        }
        if (f.classList.contains("f-thesis-frame")) {
          tl.to(
            ".f-thesis .word",
            { opacity: 1, stagger: 0.022, duration: 0.3, ease: "none" },
            i - 0.05
          );
        }
        const ghost = f.querySelector(".frame__ghost");
        if (ghost) {
          tl.fromTo(
            ghost,
            { yPercent: 36 },
            { yPercent: -36, ease: "none", duration: 1.5 },
            i - 0.25
          );
        }
        const capLines = f.querySelectorAll(".cap-line");
        if (capLines.length) {
          tl.to(
            capLines,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.3,
              stagger: 0.07,
              ease: "power2.out",
            },
            i
          );
        }
        if (f.classList.contains("f-contact-frame")) {
          tl.fromTo(
            ".f-cta",
            { scale: 0.94, transformOrigin: "0% 100%" },
            { scale: 1, duration: 0.6, ease: "power2.out" },
            i - 0.1
          );
        }
      });

      // hold on the final frame
      tl.to({}, { duration: 0.5 });

      // chapter jumps for the nav
      navBus.resolve = (key) => {
        if (typeof key === "number") {
          return tl.scrollTrigger.labelToScroll(`f${key}`);
        }
        const idx = CHAPTER_LABELS[key];
        return idx == null ? 0 : tl.scrollTrigger.labelToScroll(`f${idx}`);
      };
    }, rootRef);

    return () => {
      navBus.resolve = null;
      ctx.revert();
    };
  }, []);

  const agitate = (on) => {
    sceneState.agitation = on ? 1 : 0;
  };

  return (
    <div className="story" ref={rootRef}>
      {/* 00 — the name */}
      <section className="frame frame--0" aria-label="Intro">
        <div className="frame__inner">
          <h1 className="f-name">
            <span className="line line--1 line-mask">
              <Chars text={PROFILE.name[0]} />
            </span>
            <span className="line line--2 line-mask outline">
              <Chars text={PROFILE.name[1]} />
            </span>
          </h1>
          <div className="frame__meta f-name-meta">
            <span>
              {PROFILE.role} <i className="sig">●</i> {PROFILE.location}
            </span>
            <span className="hero__scroll">
              <span className="tick" />
              Scroll — the story starts
            </span>
            <span>{PROFILE.year}</span>
          </div>
        </div>
      </section>

      {/* 01 — thesis */}
      <section className="frame f-thesis-frame" aria-label="Thesis">
        <div className="frame__inner">
          <span className="frame__slate">01 / A belief</span>
          <p className="f-thesis">
            {STATEMENT.split(" ").map((w, i) => (
              <span className="word" key={i}>
                {w}&nbsp;
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* 02 — slate: selected work */}
      <section className="frame f-slate-frame" aria-label="Selected work">
        <span className="frame__ghost">{String(PROJECTS.length).padStart(2, "0")}</span>
        <div className="frame__inner">
          <span className="frame__slate">02 / The evidence</span>
          <h2 className="f-slate">
            <span className="line-mask">
              <Chars text="SELECTED" />
            </span>
            <span className="line-mask f-slate__indent">
              <Chars text="WORK" />
            </span>
          </h2>
          <p className="frame__meta">
            {PROJECTS.length === 3 ? "Three" : PROJECTS.length} projects. Real case studies.
          </p>
        </div>
      </section>

      {/* 03+ — the projects */}
      {PROJECTS.map((p, idx) => (
        <section
          className={`frame f-proj ${idx % 2 ? "f-proj--alt" : ""}`}
          aria-label={p.title}
          key={p.title}
        >
          <span className="frame__ghost">{String(idx + 1).padStart(2, "0")}</span>
          <div className="frame__inner">
            <span className="frame__slate">
              {String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <h3 className="f-proj__title">
              <span className="line-mask">
                <Chars text={p.title.toUpperCase()} />
              </span>
            </h3>
            <div className="frame__meta f-proj__meta">
              <span>{p.category}</span>
              <span className="f-proj__rule" />
              <span>{p.tech}</span>
              <span className="f-proj__rule" />
              <span className="sig">{p.year}</span>
            </div>
            <a
              className="frame__meta f-proj__link"
              href={p.url}
              onMouseEnter={() => agitate(true)}
              onMouseLeave={() => agitate(false)}
              data-hover
              data-cursor="Open"
            >
              <Scramble>View case study</Scramble> <span className="sig">—&gt;</span>
            </a>
          </div>
        </section>
      ))}

      {/* journey */}
      <section className="frame f-about-frame" aria-label="Journey">
        <div className="frame__inner">
          <span className="frame__slate">03 / The journey</span>
          <h2 className="f-about">
            <span className="line-mask">
              <Chars text="WHERE I'VE" />
            </span>
            <span className="line-mask f-slate__indent">
              <Chars text="BEEN" />
            </span>
          </h2>
          <ul className="f-caps">
            {JOURNEY.map((j) => (
              <li className="cap-line" key={j.n}>
                <span className="cap-line__n">{j.n}</span>
                <span className="cap-line__title">{j.title}</span>
                <span className="cap-line__desc">{j.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* obsessions */}
      <section className="frame f-obsess-frame" aria-label="Skills">
        <div className="frame__inner">
          <span className="frame__slate">04 / The craft</span>
          <h2 className="f-about">
            <span className="line-mask">
              <Chars text="WHAT I" />
            </span>
            <span className="line-mask f-slate__indent">
              <Chars text="OBSESS OVER" />
            </span>
          </h2>
          <ul className="f-caps">
            {CAPABILITIES.map((cap) => (
              <li className="cap-line" key={cap.n}>
                <span className="cap-line__n">{cap.n}</span>
                <span className="cap-line__title">{cap.title}</span>
                <span className="cap-line__desc">{cap.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* contact */}
      <section className="frame f-contact-frame" aria-label="Contact">
        <div className="frame__inner">
          <span className="frame__slate">05 / The next story</span>
          <Magnetic strength={0.1}>
            <a className="f-cta" href={`mailto:${PROFILE.email}`} data-hover data-cursor="Say hi">
              <span className="line-mask">
                <Chars text="LET'S" />
              </span>
              <span className="line-mask">
                <Chars text="TALK." />
              </span>
            </a>
          </Magnetic>
          <div className="frame__meta f-contact__foot">
            <span>
              {PROFILE.year} {PROFILE.name.join(" ")} · {PROFILE.phone}
            </span>
            <span className="f-contact__socials">
              {PROFILE.socials.map((s) => (
                <a href={s.url} key={s.label} target="_blank" rel="noreferrer" data-hover>
                  <Scramble>{s.label}</Scramble>
                </a>
              ))}
            </span>
            <span>
              Local — <i className="sig">{time}</i> IST
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
