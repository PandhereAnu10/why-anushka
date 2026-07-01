"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "about", label: "01_ABOUT" },
  { id: "experience", label: "02_EXPERIENCE" },
  { id: "education", label: "03_EDUCATION" },
  { id: "projects", label: "04_PROJECTS" },
];

export function DepthMeter() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("");
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none font-sans">
      <span className="text-[9px] text-zinc-600 font-mono tracking-widest uppercase rotate-90 origin-left translate-y-[-40px] translate-x-[2px] mb-8">
        HUD_NAV_v1.0
      </span>

      <div className="relative w-[2px] h-64 bg-zinc-900 border-l border-zinc-800">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-0 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
        />

        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 256 - 6]),
          }}
          className="absolute -left-[3px] size-2 rounded-full border border-green-400 bg-black shadow-[0_0_8px_#22c55e]"
        />
      </div>

      <div className="flex flex-col space-y-8 mt-12 items-start pl-3 text-left">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex flex-col items-start transition-all duration-300 relative text-left cursor-pointer"
            >
              <span
                className={`text-[9px] font-mono tracking-wider transition-colors duration-300 ${
                  isActive ? "text-green-500 font-bold" : "text-zinc-600 group-hover:text-zinc-400"
                }`}
              >
                {sec.label.split("_")[0]}
              </span>

              <span
                className={`text-[10px] tracking-widest transition-colors duration-300 font-medium ${
                  isActive ? "text-zinc-100 font-bold" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              >
                {sec.label.split("_")[1]}
              </span>

              {isActive && (
                <motion.div
                  layoutId="hud-nav-active-indicator"
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-l border-green-500"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
