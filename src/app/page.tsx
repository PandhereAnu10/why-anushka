"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { ProvenModules } from "@/components/proven-modules";
import { BotSheet } from "@/components/bot-sheet";
import { Mail, Github, Linkedin, ShieldAlert } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/portfolio-data";
import { motion } from "framer-motion";
import { HUDProvider, useHUD } from "@/context/hud-context";
import { AICore } from "@/components/ai-core";
import { SudoTakeover } from "@/components/sudo-takeover";
import { IntroLoader } from "@/components/intro-loader";
import { cn } from "@/lib/utils";

const revealVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const;

function HomeContent() {
  const { isSudoActive } = useHUD();

  return (
    <div className="relative min-h-screen bg-black text-zinc-400 flex flex-col">
      <IntroLoader />

      <AICore />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-700 ease-in-out",
          isSudoActive ? "brightness-50 blur-sm pointer-events-none scale-[0.98]" : "brightness-100 blur-none"
        )}
      >
        <Navbar />

        <main className="flex-1 flex flex-col relative z-10">
          <Hero />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
          >
            <AboutSection />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
          >
            <ExperienceSection />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
          >
            <EducationSection />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
          >
            <ProvenModules />
          </motion.div>
        </main>

        <footer className="w-full border-t border-zinc-900 bg-zinc-950/20 py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 z-10 text-[11px] font-mono">
          <div className="flex flex-col md:flex-row items-center gap-4 text-zinc-500 font-mono">
            <div className="flex items-center space-x-1.5 text-zinc-600 font-mono">
              <ShieldAlert className="size-3.5" />
              <span>ENCRYPTED_CONNECTION // TLS 1.3</span>
            </div>
            <span className="hidden md:inline-block text-zinc-800 font-mono">|</span>
            <span>ANUSHKA_CORE © 2026</span>
          </div>
          <div className="flex items-center space-x-6 text-zinc-500 font-mono">
            <a
              href="mailto:anushka.pandhere10@gmail.com"
              className="flex items-center space-x-1 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <Mail className="size-3.5" />
              <span>EMAIL</span>
            </a>
            <a
              href="https://github.com/PandhereAnu10"
              className="flex items-center space-x-1 hover:text-zinc-300 transition-colors cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-3.5" />
              <span>GITHUB</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              className="flex items-center space-x-1 hover:text-zinc-300 transition-colors cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-3.5" />
              <span>LINKEDIN</span>
            </a>
            <a
              href={SOCIAL_LINKS.medium}
              className="flex items-center space-x-1 hover:text-zinc-300 transition-colors cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-[10px] font-bold leading-none">M</span>
              <span>MEDIUM</span>
            </a>
          </div>
        </footer>
      </div>

      <SudoTakeover />

      <BotSheet />
    </div>
  );
}

export default function Home() {
  return (
    <HUDProvider>
      <HomeContent />
    </HUDProvider>
  );
}
