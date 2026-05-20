"use client";

import React from "react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-zinc-800 bg-black/80 backdrop-blur-md px-6 md:px-12 flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        <span className="font-mono text-zinc-100 font-semibold tracking-wider text-sm select-none">
          ANUSHKA_CORE_v1.0
        </span>
        <span className="hidden md:inline-block px-1.5 py-0.5 rounded border border-zinc-800 text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Build v1.0.42
        </span>
      </div>

      <div className="flex items-center space-x-8">
        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#proven-modules"
            className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors uppercase"
          >
            {"// PROVEN_MODULES"}
          </a>
          <a
            href="#integration-roadmap"
            className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors uppercase"
          >
            {"// ROADMAP"}
          </a>
        </nav>

        <div className="flex items-center space-x-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="system-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </div>
          <span className="text-xs font-mono font-medium tracking-wide text-zinc-400 select-none">
            Ready for Integration
          </span>
        </div>
      </div>
    </motion.header>
  );
}
