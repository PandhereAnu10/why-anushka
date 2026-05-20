"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowDown, Play } from "lucide-react";
import { Magnetic } from "./magnetic";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const handleScrollToDashboard = () => {
    const dashboardElement = document.getElementById("compatibility-dashboard");
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
      {/* Sleek engineering grid background decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center z-10 flex flex-col items-center"
      >
        {/* Connection Protocol Tag */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 system-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            PROTOCOL SECURED // CONNECTION ACTIVE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tighter text-zinc-50 mb-6 leading-[1.1]"
        >
          Anushka Pandhere
          <span className="text-zinc-500 block sm:inline"> &lt;&gt; </span>
          <span className="text-zinc-100">Hypercubic</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-zinc-400 font-sans max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Automating the gap between Agentic AI and Production-grade Software.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Magnetic>
            <Button
              onClick={handleScrollToDashboard}
              size="lg"
              variant="outline"
              className="group font-mono text-xs border border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 hover:border-zinc-500 rounded-md px-6 py-5 transition-all duration-300 relative overflow-hidden active:translate-y-px cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="size-3.5 fill-current text-green-500" />
                INITIALIZE DEPLOYMENT
              </span>
            </Button>
          </Magnetic>

          <a
            href="https://github.com/PandhereAnu10"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider py-2 px-3 rounded hover:bg-zinc-900/40 cursor-pointer"
          >
            <Terminal className="size-3.5" />
            Core Repository
          </a>
        </motion.div>

        {/* Decorative micro-logs */}
        <motion.div
          variants={itemVariants}
          className="mt-16 w-full max-w-lg border border-zinc-800/80 bg-zinc-950/40 rounded-lg p-3.5 text-left font-mono text-[10px] text-zinc-500 space-y-1 select-none backdrop-blur-sm"
        >
          <div className="flex justify-between items-center text-zinc-600 border-b border-zinc-900 pb-1.5 mb-1.5">
            <span>SESSION_STATUS // LIVE</span>
            <span>IP: 127.0.0.1</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-zinc-600">&gt;</span>
            <span>
              system_init --agent=&quot;Anushka Pandhere&quot;
              --role=&quot;Forward SE&quot;
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-zinc-600">&gt;</span>
            <span className="text-green-500/80">
              compatibility_check --target=&quot;Hypercubic&quot;
              --status=&quot;98% MATCH&quot;
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-zinc-600">&gt;</span>
            <span>
              ready_for_payload_delivery...{" "}
              <span className="text-zinc-400 animate-pulse">|</span>
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Down indicator */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-600 cursor-pointer hidden md:flex flex-col items-center gap-1"
        onClick={handleScrollToDashboard}
      >
        <span className="text-[9px] font-mono tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown className="size-3.5" />
      </motion.div>
    </section>
  );
}
