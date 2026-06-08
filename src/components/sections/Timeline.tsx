"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/lib/data";

const slideUpReveal = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="min-h-screen py-24 relative bg-themeBg text-themeText flex flex-col justify-center border-t border-[var(--border)]"
    >
      {/* Large faint section watermark (IBM Plex Mono, #ffffff/[0.015]) */}
      <div className="absolute top-12 left-8 font-mono text-[10vw] font-bold text-[#ffffff]/[0.015] leading-none pointer-events-none select-none">
        04
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        {/* Section Label */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="block w-6 h-px bg-[#495057]" />
            <span className="font-mono text-[10px] text-[#6c757d] tracking-[0.25em] uppercase">
              04 / EXPERIENCE & EDUCATION
            </span>
          </div>
        </div>

        <motion.div
          variants={slideUpReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-16 w-full"
        >
          {/* Experience Section */}
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-xs text-[#6c757d] tracking-[0.2em] uppercase">
              // RECENT EXPERIENCE
            </h3>
            <div className="border-t border-[#495057] overflow-x-auto w-full">
              <table className="w-full border-collapse text-left font-mono">
                <thead>
                  <tr className="border-b border-[#495057]">
                    <th className="py-4 pr-4 text-[10px] text-[#6c757d] uppercase tracking-wider font-normal w-1/4">
                      Period
                    </th>
                    <th className="py-4 px-4 text-[10px] text-[#6c757d] uppercase tracking-wider font-normal w-1/3">
                      Organization
                    </th>
                    <th className="py-4 pl-4 text-[10px] text-[#6c757d] uppercase tracking-wider font-normal">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {experience.map((exp) => (
                    <tr
                      key={exp.id}
                      className="border-b border-[#495057] hover:text-[#ffffff] group transition-colors duration-150"
                    >
                      <td className="py-6 pr-4 text-xs text-[#6c757d] group-hover:text-[#ffffff] transition-colors">
                        {exp.period}
                      </td>
                      <td className="py-6 px-4 text-sm font-bold text-[#ffffff] uppercase tracking-wide">
                        {exp.company}
                      </td>
                      <td className="py-6 pl-4 text-xs text-[#6c757d] group-hover:text-[#ffffff] transition-colors leading-relaxed">
                        {exp.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Education Section */}
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-xs text-[#6c757d] tracking-[0.2em] uppercase">
              // FORMAL EDUCATION
            </h3>
            <div className="border-t border-[#495057] overflow-x-auto w-full">
              <table className="w-full border-collapse text-left font-mono">
                <thead>
                  <tr className="border-b border-[#495057]">
                    <th className="py-4 pr-4 text-[10px] text-[#6c757d] uppercase tracking-wider font-normal w-1/4">
                      Period
                    </th>
                    <th className="py-4 px-4 text-[10px] text-[#6c757d] uppercase tracking-wider font-normal w-1/3">
                      Institution
                    </th>
                    <th className="py-4 pl-4 text-[10px] text-[#6c757d] uppercase tracking-wider font-normal">
                      Degree
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#495057] hover:text-[#ffffff] group transition-colors duration-150"
                    >
                      <td className="py-6 pr-4 text-xs text-[#6c757d] group-hover:text-[#ffffff] transition-colors">
                        {edu.period}
                      </td>
                      <td className="py-6 px-4 text-sm font-bold text-[#ffffff] uppercase tracking-wide">
                        {edu.school}
                      </td>
                      <td className="py-6 pl-4 text-xs text-[#6c757d] group-hover:text-[#ffffff] transition-colors leading-relaxed">
                        {edu.degree}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
