"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import MagneticButton from "@/components/core/MagneticButton";
import { FadeUp } from "@/components/core/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { contact } from "@/lib/data";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: contact.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: contact.linkedin,
    icon: Linkedin,
    external: true,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Big CTA section */}
      <div className="section-padding border-t border-white/[0.06]">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col items-center text-center mb-20">
            {/* Label */}
            <FadeUp delay={0} className="mb-8">
              <div className="flex items-center gap-3">
                <span className="block w-8 h-px bg-zinc-700" />
                <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">
                  Contact
                </span>
                <span className="block w-8 h-px bg-zinc-700" />
              </div>
            </FadeUp>

            {/* Big headline */}
            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_OUT_EXPO }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight text-zinc-50"
              >
                Let&apos;s build
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-12">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.08 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight gradient-text"
              >
                something great.
              </motion.h2>
            </div>

            <FadeUp delay={0.3} className="max-w-md mb-12">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Open to full-time roles, freelance projects, and interesting
                collaborations. I respond to every message.
              </p>
            </FadeUp>

            {/* Contact cards */}
            <FadeUp delay={0.4} className="w-full max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <MagneticButton
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-zinc-900/30 hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/15 transition-colors">
                    <Mail size={16} className="text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-1">
                      Email
                    </div>
                    <div className="text-zinc-300 text-sm truncate group-hover:text-white transition-colors">
                      {contact.email}
                    </div>
                  </div>
                </MagneticButton>

                <MagneticButton
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-zinc-900/30 hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/60 flex items-center justify-center shrink-0 group-hover:bg-zinc-800 transition-colors">
                    <Phone size={16} className="text-zinc-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-1">
                      Phone
                    </div>
                    <div className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                      {contact.phone}
                    </div>
                  </div>
                </MagneticButton>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
                  <MagneticButton
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-zinc-400 text-sm hover:text-zinc-100 hover:border-white/15 transition-all duration-300"
                  >
                    <Icon size={14} />
                    {label}
                  </MagneticButton>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-zinc-700 tracking-widest">
              DESIGNED &amp; BUILT BY SAURAV PUNJABI
            </span>
            <span className="font-mono text-xs text-zinc-700">
              © 2026 · ALL RIGHTS RESERVED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
