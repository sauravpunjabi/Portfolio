"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/lib/data";

const slideUpReveal = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Pune is in IST (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat([], options).format(new Date());
      setLocalTime(timeString + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen py-24 relative bg-themeBg text-themeText flex flex-col justify-between border-t border-[var(--border)]"
    >
      {/* Large faint section watermark (IBM Plex Mono, #ffffff/[0.015]) */}
      <div className="absolute top-12 left-8 font-mono text-[10vw] font-bold text-[#ffffff]/[0.015] leading-none pointer-events-none select-none">
        05
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
        {/* Section Label */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="block w-6 h-px bg-[#495057]" />
            <span className="font-mono text-[10px] text-[#6c757d] tracking-[0.25em] uppercase">
              05 / CONTACT
            </span>
          </div>
        </div>

        <motion.div
          variants={slideUpReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-12 items-start"
        >
          {/* Main heading */}
          <h2 className="font-mono font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight uppercase text-[#ffffff]">
            LET&apos;S BUILD<br />
            SOMETHING.<br />
            TOGETHER
          </h2>

          {/* Email link */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-[#6c757d] tracking-widest uppercase">
              // SEND AN EMAIL
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="font-mono text-lg md:text-3xl lg:text-4xl text-[#ffffff] font-bold underline-hover-effect tracking-tight uppercase"
            >
              {contact.email}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer Block */}
      <div className="max-w-7xl mx-auto px-8 w-full relative z-10 pt-16 border-t border-[#495057]/40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 font-mono text-[10px] text-[#6c757d] uppercase tracking-wider">
          {/* Location & Time */}
          <div className="flex flex-col gap-2">
            <span className="text-[#ffffff]/50">// CURRENT LOCATION</span>
            <span className="text-[#ffffff]">PUNE, INDIA</span>
            <span className="font-mono tabular-nums text-[#6c757d] mt-1">
              {localTime || "12:00:00 IST"}
            </span>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <span className="text-[#ffffff]/50">// PHONE</span>
            <a href={`tel:${contact.phone}`} className="text-[#ffffff] hover:text-[#7C3AED] transition-colors">
              {contact.phone}
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <span className="text-[#ffffff]/50">// SOCIAL CHANNELS</span>
            <div className="flex flex-col gap-1.5">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffffff] hover:text-[#7C3AED] transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffffff] hover:text-[#7C3AED] transition-colors"
              >
                GITHUB
              </a>
            </div>
          </div>

          {/* Copyright / Meta */}
          <div className="flex flex-col gap-2 md:items-end justify-between">
            <span className="text-[#ffffff]/30">// CREDITS</span>
            <span className="text-[#ffffff]/60 md:text-right">
              © 2026 SAURAV PUNJABI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
