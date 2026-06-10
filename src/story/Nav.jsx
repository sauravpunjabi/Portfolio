"use client";

import { motion } from "framer-motion";
import Scramble from "./Scramble";

const LINKS = [
  { n: "01", label: "Works", target: "works" },
  { n: "02", label: "Journey", target: "about" },
  { n: "03", label: "Contact", target: "contact" },
];

export default function Nav({ visible, onNavigate }) {
  return (
    <motion.nav
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
      aria-label="Primary"
    >
      <a
        className="nav__logo"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(0);
        }}
        data-hover
      >
        S—P<span className="sig">/</span>26
      </a>
      <div className="nav__links">
        {LINKS.map((link) => (
          <a
            key={link.label}
            className="nav__link"
            href={`#${link.target}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(link.target);
            }}
            data-hover
          >
            <sup>{link.n}</sup>
            <Scramble>{link.label}</Scramble>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
