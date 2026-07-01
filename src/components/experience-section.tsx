"use client";

import React from "react";
import { ScrollHighlightText } from "@/components/scroll-highlight-text";
import { CheckCircle2 } from "lucide-react";
import { EXPERIENCE } from "@/lib/portfolio-data";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-12 bg-black border-t border-zinc-800 relative"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            02_EXPERIENCE // WORK_LOG
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-8 font-sans">
          Experience
        </h2>

        <ScrollHighlightText
          before="2+ years across agentic AI, freelance engineering, and technical writing — "
          highlight="I make messy ideas run reliably."
          after=" From Scout7 agentic ad platform to FAUN technical writing, here is the full work timeline."
          className="mb-12"
        />

        <div className="space-y-12 border-l border-zinc-800 pl-6 md:pl-8">
          {EXPERIENCE.map((item) => (
            <article key={item.id} className="relative">
              <span className="absolute -left-[25px] md:-left-[33px] top-1.5 size-2 rounded-full border border-green-500 bg-black" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <span className="font-mono text-[10px] text-green-500 tracking-wider">
                  {item.period}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">{"//"}</span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  {item.org}
                </span>
                {item.location && (
                  <>
                    <span className="font-mono text-[10px] text-zinc-700">·</span>
                    <span className="font-mono text-[10px] text-zinc-600">{item.location}</span>
                  </>
                )}
              </div>

              <h3 className="text-lg font-bold text-zinc-100 font-sans tracking-tight mb-3">
                {item.role}
              </h3>

              <ScrollHighlightText
                before={item.impactBefore}
                highlight={item.impactHighlight}
                after={item.impactAfter}
                className="mb-4 text-sm md:text-base"
              />

              <ul className="space-y-2">
                {item.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start space-x-2 text-[12px] text-zinc-400 font-sans"
                  >
                    <CheckCircle2 className="size-3.5 shrink-0 text-green-600 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
