"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ShieldCheck, Bot, ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveRedactionDemo } from "@/components/live-redaction";

interface ProjectData {
  id: string;
  title: string;
  alignment: string;
  alignmentLevel: string;
  icon: React.ReactNode;
  description: string;
  techStack: string[];
  techDetails: string[];
  specs: { label: string; value: string }[];
  links: { label: string; href: string }[];
  architecture: { nodes: string[]; flow: string };
}

const PROJECTS: ProjectData[] = [
  {
    id: "pii-redactor",
    title: "Telehealth PII Redactor",
    alignment: "Security focus",
    alignmentLevel: "High",
    icon: <ShieldCheck className="size-5 text-emerald-500" />,
    description:
      "Independently curated custom medical training set and fine-tuned BERT model for zero-leakage clinical entity redaction.",
    techStack: ["BERT NER", "Hugging Face", "seqeval", "Custom Dataset"],
    techDetails: [
      "End-to-end pipeline: collection, labeling, and preprocessing of clinical entity types.",
      "Evaluated using seqeval across precision, recall, and F1 metrics.",
    ],
    specs: [
      { label: "LATENCY", value: "24ms" },
      { label: "MODEL", value: "BERT-v3" },
      { label: "ACCURACY", value: "96.4%" },
    ],
    links: [
      {
        label: "Model Hub",
        href: "https://huggingface.co/PandhereAnu/telehealth-pii-redactor",
      },
      {
        label: "Dataset",
        href: "https://huggingface.co/datasets/PandhereAnu/telehealth-pii-dataset",
      },
      {
        label: "Demo Space",
        href: "https://huggingface.co/spaces/PandhereAnu/telehealth-pii-demo",
      },
    ],
    architecture: {
      nodes: [
        "Custom Dataset (Kaggle → HF)",
        "BERT NER Fine-Tuning",
        "seqeval Validation",
        "HF Spaces Deployment",
      ],
      flow: "Custom Kaggle Dataset → BERT-based NER Fine-Tuning (HF) → seqeval Validation → Deployment",
    },
  },
  {
    id: "log-logic-agent",
    title: "Log Logic Agent",
    alignment: "Agentic workflows",
    alignmentLevel: "Extreme",
    icon: <Bot className="size-5 text-emerald-500" />,
    description:
      "AI-Native diagnostic system using Isolation Forest for outlier detection and LLaMA reasoning models.",
    techStack: ["Isolation Forest", "LLaMA-3", "Agentic Flow", "pandas/NumPy"],
    techDetails: [
      "Applies Isolation Forest anomaly detection to identify unusual log patterns.",
      "Uses LLaMA via Groq for recommendation-style diagnostic reasoning.",
    ],
    specs: [
      { label: "LATENCY", value: "12ms" },
      { label: "MODEL", value: "LLAMA-3" },
      { label: "ACCURACY", value: "94.8%" },
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/PandhereAnu10/loglogic_agent",
      },
      {
        label: "Agent Space",
        href: "https://huggingface.co/spaces/PandhereAnu/loglogic-agent",
      },
    ],
    architecture: {
      nodes: [
        "Log Ingestion Layer",
        "Isolation Forest Anomaly Filter",
        "Groq/LLaMA-3 Reasoning",
        "Diagnostic Dashboard Output",
      ],
      flow: "Log Ingestion → Isolation Forest Anomaly Detection → Groq/LLaMA-3 Reasoning → Diagnostic Output",
    },
  },
];

function LogAgentVisualizer() {
  const [anomalyFound, setAnomalyFound] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnomalyFound((prev) => !prev);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-zinc-800 bg-zinc-950/80 rounded-lg p-5 relative overflow-hidden flex flex-col justify-between h-[280px]">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5 mb-3 font-mono text-[9px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ANOMALY_ENGINE // ISOLATION_FOREST
        </span>
        <span>LATENCY: 12ms</span>
      </div>

      <div className="flex-1 relative min-h-[140px] text-[10px] leading-relaxed font-mono overflow-hidden bg-black/40 p-3 rounded border border-zinc-900/50 flex flex-col justify-between">
        <div className="space-y-1.5 text-zinc-400">
          <div>[10:14:02] GET /api/v1/auth/session - 200 OK</div>
          <div>[10:14:05] POST /api/v1/query - 200 OK</div>
          <AnimatePresence mode="wait">
            {anomalyFound ? (
              <motion.div
                key="anomaly"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-red-500 bg-red-950/20 border border-red-500/20 px-2 py-1 rounded flex items-center justify-between font-bold"
              >
                <span>[10:14:09] CRITICAL: BUFFER OVERRUN SUSPECTED</span>
                <span>[OUTLIER]</span>
              </motion.div>
            ) : (
              <motion.div
                key="normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-zinc-500"
              >
                [10:14:09] GET /api/v1/analytics/metrics - 200 OK
              </motion.div>
            )}
          </AnimatePresence>
          <div>[10:14:12] GET /api/v1/mcp/status - 200 OK</div>
        </div>

        {/* Isolation forest metrics charts */}
        <div className="mt-3 flex items-center justify-between border-t border-zinc-900 pt-2 font-mono text-[8px] text-zinc-600">
          <span>CONTAMINATION: 0.05</span>
          <span>ESTIMATOR_TREES: 100</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[10px]">
        <span className="text-zinc-600">MODE: AGENTIC_ROUTING</span>
        <span className="text-emerald-500/80">LLAMA_3.3_REASONER // RUNNING</span>
      </div>
    </div>
  );
}

function TiltCard({ project }: { project: ProjectData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showArch, setShowArch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="group relative border border-zinc-900 bg-zinc-950/20 backdrop-blur-md rounded-lg p-6 md:p-8 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 blueprint-grid overflow-hidden"
      >
        {/* Snapping Focus Brackets in the corners */}
        <motion.div
          animate={isHovered ? { x: 0, y: 0 } : { x: -6, y: -6 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/80 pointer-events-none"
        />
        <motion.div
          animate={isHovered ? { x: 0, y: 0 } : { x: 6, y: -6 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          className="absolute top-3 right-3 w-3 h-3 border-t border-r border-emerald-500/80 pointer-events-none"
        />
        <motion.div
          animate={isHovered ? { x: 0, y: 0 } : { x: -6, y: 6 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-emerald-500/80 pointer-events-none"
        />
        <motion.div
          animate={isHovered ? { x: 0, y: 0 } : { x: 6, y: 6 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/80 pointer-events-none"
        />

        <div style={{ transform: "translateZ(20px)" }} className="relative">
          {/* Tech specs in corner in dim zinc-600 */}
          <div className="absolute top-0 right-0 flex space-x-3 font-mono text-[8px] text-zinc-600 uppercase select-none">
            {project.specs.map((spec) => (
              <span key={spec.label}>
                {spec.label}: <span className="text-zinc-500">{spec.value}</span>
              </span>
            ))}
          </div>

          {/* Badge & Icon */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              {project.icon}
              <Badge
                variant="outline"
                className="font-mono text-[9px] uppercase tracking-widest border-zinc-800 text-zinc-500 bg-zinc-950/40"
              >
                Hypercubic Alignment: {project.alignmentLevel}
              </Badge>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Render the Interactive Live Demo instead of standard lists */}
          <div className="mb-6">
            {project.id === "pii-redactor" ? (
              <LiveRedactionDemo />
            ) : (
              <LogAgentVisualizer />
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 mb-4 relative z-20">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500 hover:text-emerald-400 transition-colors border border-zinc-900 hover:border-emerald-500/20 px-2.5 py-1.5 rounded cursor-pointer bg-zinc-950/60"
              >
                <ExternalLink className="size-3" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* View Architecture Button */}
        <Button
          onClick={() => setShowArch(true)}
          variant="outline"
          className="w-full mt-2 font-mono text-[10px] border-zinc-900 bg-zinc-950 text-zinc-500 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-300 py-4 cursor-pointer relative z-20"
        >
          VIEW DIAGRAM
        </Button>
      </motion.div>

      {/* Architecture Modal */}
      {showArch && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none">
          <div className="relative w-full max-w-lg border border-zinc-800 bg-zinc-950 rounded-lg p-6 md:p-8">
            <button
              onClick={() => setShowArch(false)}
              className="absolute top-3 right-3 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center space-x-2 mb-4">
              {project.icon}
              <h4 className="text-sm font-bold text-zinc-100 tracking-tight">
                {project.title} — Architecture
              </h4>
            </div>

            {/* Flow Visualization */}
            <div className="space-y-3 mb-6 relative">
              {project.architecture.nodes.map((node, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="h-8 w-8 rounded border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-center text-emerald-400 font-mono text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="ml-3 flex-1 border border-zinc-800 bg-zinc-900/40 rounded px-3 py-2">
                    <span className="text-xs font-mono text-zinc-300">
                      {node}
                    </span>
                  </div>
                  {idx < project.architecture.nodes.length - 1 && (
                    <div className="absolute left-9 mt-8 h-3 w-[1px] bg-zinc-700" />
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-4">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                Pipeline Flow
              </span>
              <p className="text-xs font-mono text-emerald-500/80 mt-1">
                {project.architecture.flow}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ProvenModules() {
  return (
    <section
      id="proven-modules"
      className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 mb-3 bg-zinc-950 border border-zinc-900 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
              PROVEN_MODULES // PROJECT_LOG
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-4 font-sans">
            Verified Project Modules
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
            Deep-tech AI projects directly aligned with Hypercubic&apos;s
            mission in agentic workflows and data privacy.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PROJECTS.map((project) => (
            <TiltCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
