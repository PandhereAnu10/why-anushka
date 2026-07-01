"use client";

import React from "react";
import { ScrollHighlightText } from "@/components/scroll-highlight-text";
import { WritingSection } from "@/components/writing-section";
import { PROFILE } from "@/lib/portfolio-data";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 bg-black border-t border-zinc-800 relative"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            01_ABOUT // PROFILE
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-8 font-sans">
          About
        </h2>

        <ScrollHighlightText
          before={`${PROFILE.about} `}
          highlight={PROFILE.tagline}
          after=" I turn ML concepts into working demos, explore prompt engineering and generative AI, and sharpen my product mindset through projects that actually solve problems."
        />

        <p className="mt-6 text-sm text-zinc-500 font-mono leading-relaxed">
          Stack: Python · FastAPI · BERT / NER · Groq / LLaMA · MCP · Hugging Face ·
          Isolation Forest · Angular · Docker · ESP32 / IoT
        </p>

        <WritingSection />
      </div>
    </section>
  );
}
