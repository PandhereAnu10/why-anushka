"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  days: string;
  hexDate: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
}

const ROADMAP_ITEMS: TimelineItem[] = [
  {
    days: "Day 0-30",
    hexDate: "0x00 - 0x1E",
    phase: "[Observation & Tooling]",
    title: "Latencies & Dependency Mapping",
    description:
      "Audit active systems and map standard parameters to establish high-fidelity integration baselines.",
    deliverables: [
      "Benchmark token latency in active agentic reasoning feedback loops.",
      "Audit current Model Context Protocol (MCP) server schemas and context packing profiles.",
      "Map mainframe parser trees and COBOL abstract syntax tree (AST) nodes.",
    ],
    icon: <Cpu className="size-4 text-green-500" />,
  },
  {
    days: "Day 30-60",
    hexDate: "0x1F - 0x3C",
    phase: "[Expansion]",
    title: "Robust MCP Tool Architectures",
    description:
      "Build custom high-performance tools to expand agent capabilities and developer speeds.",
    deliverables: [
      "Write custom type-safe JSON-RPC stdio/HTTP MCP microservices.",
      "Establish strict Pydantic model wrappers to enforce deterministic LLM schemas.",
      "Accelerate product engineering team velocity by deploying early autonomous workflows.",
    ],
    icon: <Code className="size-4 text-green-500" />,
  },
  {
    days: "Day 60-90",
    hexDate: "0x3D - 0x5A",
    phase: "[Innovation]",
    title: "The Forward Product Workspace",
    description:
      "Prototype next-generation client features bridging legacy backend data with responsive web apps.",
    deliverables: [
      "Architect a new 'Forward' workspace component mapping complex knowledge graphs.",
      "Bridge program analysis data feeds directly with modern visual React/Next workspaces.",
      "Enable real-time client validation dashboards to replace static report deliveries.",
    ],
    icon: <Lightbulb className="size-4 text-green-500" />,
  },
];

export function TimelineRoadmap() {
  return (
    <section
      id="integration-roadmap"
      className="py-24 px-6 md:px-12 bg-black border-t border-zinc-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 mb-3 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
              {"DEPLOYMENT_PHASES // 90_DAY_ROADMAP"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-4 font-sans">
            Forward Integration Timeline
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
            {
              "A precise, action-oriented integration roadmap mapping out Anushka's first 90 days as a Founding/Forward Software Engineer."
            }
          </p>
        </div>

        {/* Timeline Core */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Drawing Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 origin-top z-0"
          />

          {/* Timeline Cards */}
          <div className="space-y-16">
            {ROADMAP_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-stretch w-full relative z-10 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Spacer */}
                  <div className="w-full md:w-1/2" />

                  {/* Node Connector Point */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-[7px] md:-translate-x-1/2 flex items-center justify-center top-6">
                    <motion.div
                      initial={{ scale: 0, rotate: 45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: index * 0.15,
                      }}
                      className="size-3.5 rounded-full border-2 border-green-500 bg-black z-20 relative flex items-center justify-center"
                    >
                      <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping size-full" />
                    </motion.div>
                  </div>

                  {/* Card Container */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -40 : 40,
                      scale: 0.95,
                    }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.2,
                    }}
                    className={`w-full md:w-1/2 pl-10 md:pl-0 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="border border-zinc-800 bg-zinc-950/40 backdrop-blur-md p-6 md:p-8 rounded-lg hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.05)] transition-all duration-300 relative group">
                      {/* Industrial corner decors */}
                      <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-zinc-700 group-hover:border-green-500 transition-colors" />
                      <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-zinc-700 group-hover:border-green-500 transition-colors" />

                      {/* Header */}
                      <div
                        className={`flex flex-wrap gap-2 mb-4 items-center ${
                          isEven ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        <span className="font-mono text-xs text-green-500 tracking-wider font-bold">
                          {item.days}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-600 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 select-none">
                          {item.hexDate}
                        </span>
                        <Badge
                          variant="outline"
                          className="font-mono text-[9px] text-zinc-400 border-zinc-800 uppercase tracking-widest"
                        >
                          {item.phase}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-zinc-100 font-sans tracking-tight mb-2 group-hover:text-green-400 transition-colors">
                        {item.title}
                      </h3>
                      <p
                        className={`text-zinc-400 text-xs leading-relaxed font-sans mb-5 ${
                          isEven ? "md:ml-auto" : "md:mr-auto"
                        } max-w-md`}
                      >
                        {item.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                          Operational Targets
                        </span>
                        <div className="space-y-2.5">
                          {item.deliverables.map((del, idx) => (
                            <div
                              key={idx}
                              className="flex items-start text-xs font-sans text-zinc-400"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 mt-1.5 mr-2.5 shrink-0 group-hover:bg-green-500 transition-colors" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
