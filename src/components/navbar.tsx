"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/portfolio-data";

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

const SOCIAL_NAV = [
  { href: SOCIAL_LINKS.linkedin, label: "LINKEDIN", icon: Linkedin },
  { href: SOCIAL_LINKS.github, label: "GITHUB", icon: Github },
  { href: SOCIAL_LINKS.medium, label: "MEDIUM", icon: MediumIcon },
] as const;

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-zinc-800 bg-black/80 backdrop-blur-md px-6 md:px-12 flex items-center justify-between"
    >
      <div className="flex items-center space-x-3 min-w-0">
        <span className="font-mono text-zinc-100 font-semibold tracking-wider text-sm select-none truncate">
          {PROFILE.brand}
        </span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <nav className="hidden lg:flex items-center space-x-5">
          <a
            href="#about"
            className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors uppercase"
          >
            {"// ABOUT"}
          </a>
          <a
            href="#experience"
            className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors uppercase"
          >
            {"// EXPERIENCE"}
          </a>
          <a
            href="#education"
            className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors uppercase"
          >
            {"// EDUCATION"}
          </a>
          <a
            href="#projects"
            className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors uppercase"
          >
            {"// PROJECTS"}
          </a>
        </nav>

        <div className="hidden sm:flex items-center gap-1 border border-zinc-800 rounded-md px-1 py-0.5">
          {SOCIAL_NAV.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="flex items-center gap-1 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <Icon className="size-3" />
              <span className="hidden md:inline">{label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex h-2 w-2">
            <span className="system-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </div>
          <span className="text-[10px] font-mono font-medium tracking-wide text-zinc-400 select-none hidden sm:inline">
            Open to Work
          </span>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden text-zinc-500 hover:text-zinc-200"
            aria-label="LinkedIn"
          >
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
