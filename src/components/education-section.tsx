"use client";

import React from "react";
import { ScrollHighlightText } from "@/components/scroll-highlight-text";
import { CertificationsTicker } from "@/components/certifications-ticker";
import { Book, GraduationCap, Award } from "lucide-react";
import { EDUCATION, RESEARCH, ACHIEVEMENTS } from "@/lib/portfolio-data";

export function EducationSection() {
  return (
    <section
      id="education"
      className="py-24 px-6 md:px-12 bg-black border-t border-zinc-800 relative"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            03_EDUCATION // CREDENTIALS
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-8 font-sans">
          Education
        </h2>

        <ScrollHighlightText
          before="B.E. from Atharva College of Engineering with a "
          highlight="9.2 CGPA"
          after=", plus a Diploma from Government Polytechnic Mumbai — grounded in research, hackathons, and published work."
          className="mb-12"
        />

        <div className="space-y-6">
          {EDUCATION.map((item) => (
            <div
              key={item.id}
              className="border border-zinc-800 bg-zinc-950/20 backdrop-blur-md rounded-lg p-5 md:p-6 hover:border-green-500/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded border border-zinc-800 bg-zinc-900/30 shrink-0">
                  <GraduationCap className="size-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                    <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
                      {item.period}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-700">·</span>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                      {item.org}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 font-sans tracking-tight mb-2">
                    {item.title}
                    {item.highlight && (
                      <span className="ml-2 font-mono text-[10px] text-green-500 font-normal">
                        [{item.highlight}]
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-4">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
            RESEARCH & PUBLICATIONS
          </span>
          {RESEARCH.map((paper) => (
            <div
              key={paper.id}
              className="border border-zinc-800 bg-zinc-950/20 rounded-lg p-5 md:p-6 hover:border-blue-500/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded border border-zinc-800 bg-zinc-900/30 shrink-0">
                  <Book className="size-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                    <span className="font-mono text-[10px] text-zinc-600">{paper.period}</span>
                    <span className="font-mono text-[10px] text-zinc-700">·</span>
                    <span className="font-mono text-[10px] text-zinc-500">{paper.venue}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 font-sans mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans mb-3">
                    {paper.detail}
                  </p>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    View Publication (PDF) →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {ACHIEVEMENTS.map((award) => (
            <span
              key={award}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/50 font-mono text-[10px] text-zinc-400"
            >
              <Award className="size-3 text-emerald-500" />
              {award}
            </span>
          ))}
        </div>

        <CertificationsTicker />
      </div>
    </section>
  );
}
