"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ShieldCheck, Bot, ExternalLink, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveRedactionDemo } from "@/components/live-redaction";

interface ArchNode {
  id: string;
  layer: string;
  title: string;
  detail: string;
  tech?: string[];
}

interface ProjectData {
  id: string;
  title: string;
  alignment: string;
  icon: React.ReactNode;
  description: string;
  techStack: string[];
  techDetails: string[];
  specs: { label: string; value: string }[];
  links: { label: string; href: string }[];
  architecture: {
    nodes: ArchNode[];
    flow: string;
  };
}

const PROJECTS: ProjectData[] = [
  {
    id: "pii-redactor",
    title: "Telehealth PII Redactor",
    alignment: "Security focus",
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
        {
          id: "input",
          layer: "INGEST",
          title: "Clinical Text Input",
          detail: "Raw telehealth transcripts and clinical notes enter the pipeline.",
          tech: ["JSON", "CSV"],
        },
        {
          id: "dataset",
          layer: "DATA",
          title: "Custom Dataset Curation",
          detail: "Collected, labeled, and preprocessed medical entity types from Kaggle sources into HF-ready format.",
          tech: ["Kaggle", "Label Studio"],
        },
        {
          id: "train",
          layer: "ML_CORE",
          title: "BERT NER Fine-Tuning",
          detail: "Fine-tuned BERT on custom clinical entities using Hugging Face Trainer with train/val splits.",
          tech: ["BERT", "Hugging Face", "PyTorch"],
        },
        {
          id: "eval",
          layer: "VALIDATION",
          title: "seqeval Metrics Gate",
          detail: "Precision, recall, and F1 scored per entity type — 96.4% F1 before deployment.",
          tech: ["seqeval", "F1"],
        },
        {
          id: "deploy",
          layer: "OUTPUT",
          title: "Zero-Leakage Redaction API",
          detail: "Deployed model hub, dataset, and live HF Spaces demo for real-time entity redaction.",
          tech: ["HF Spaces", "Inference API"],
        },
      ],
      flow: "Clinical Input → Dataset Curation → BERT NER Fine-Tuning → seqeval Validation → HF Deployment",
    },
  },
  {
    id: "log-logic-agent",
    title: "Log Logic Agent",
    alignment: "Agentic workflows",
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
        {
          id: "ingest",
          layer: "INGEST",
          title: "Log Stream Ingestion",
          detail: "Production SaaS and server logs parsed into structured event streams.",
          tech: ["pandas", "NumPy"],
        },
        {
          id: "features",
          layer: "FEATURES",
          title: "Feature Extraction",
          detail: "Numerical features derived from log patterns — latency, error rates, request volumes.",
          tech: ["Feature Eng"],
        },
        {
          id: "anomaly",
          layer: "ML_FILTER",
          title: "Isolation Forest Scorer",
          detail: "Unsupervised outlier detection filters noise — only anomalous events pass to the agent.",
          tech: ["sklearn", "IForest"],
        },
        {
          id: "router",
          layer: "ROUTING",
          title: "Anomaly Event Router",
          detail: "Flags critical outliers and routes them to the reasoning layer with context packing.",
          tech: ["Agentic Flow"],
        },
        {
          id: "reason",
          layer: "INFERENCE",
          title: "LLaMA Chain-of-Thought",
          detail: "Multi-step diagnostic reasoning via Groq — hypotheses, root cause, and fix suggestions.",
          tech: ["Groq", "LLaMA-3"],
        },
        {
          id: "verify",
          layer: "OUTPUT",
          title: "Self-Verify + Diagnostic Output",
          detail: "Agent checks its own diagnosis, then emits actionable remediation commands with safety checks.",
          tech: ["CoT", "Safety Gate"],
        },
      ],
      flow: "Log Ingestion → Feature Extraction → Isolation Forest → Anomaly Router → LLaMA Reasoning → Verified Output",
    },
  },
];

function ArchitectureDiagram({ project }: { project: ProjectData }) {
  return (
    <div className="relative" aria-label={`${project.title} architecture diagram`}>
      {/* Vertical spine */}
      <div className="absolute left-[18px] top-4 bottom-16 w-px bg-gradient-to-b from-emerald-500/60 via-zinc-700 to-emerald-500/30" />

      <div className="space-y-0">
        {project.architecture.nodes.map((node, idx) => (
          <div key={node.id}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="relative pl-10"
            >
              {/* Node dot on spine */}
              <div className="absolute left-3 top-5 size-2.5 rounded-full border-2 border-emerald-500 bg-black shadow-[0_0_8px_rgba(16,185,129,0.5)] z-10" />

              <div className="border border-zinc-800 bg-zinc-900/50 rounded-lg p-3.5 hover:border-emerald-500/25 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[8px] text-emerald-500/80 uppercase tracking-widest border border-emerald-500/20 bg-emerald-950/20 px-1.5 py-0.5 rounded">
                    {node.layer}
                  </span>
                  <span className="font-mono text-[8px] text-zinc-600">
                    STEP_{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h5 className="text-xs font-bold text-zinc-100 font-sans mb-1">
                  {node.title}
                </h5>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-sans mb-2">
                  {node.detail}
                </p>

                {node.tech && (
                  <div className="flex flex-wrap gap-1">
                    {node.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[8px] text-zinc-500 border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {idx < project.architecture.nodes.length - 1 && (
              <div className="relative pl-10 py-1.5 flex items-center">
                <ChevronDown className="absolute left-[13px] size-3.5 text-emerald-500/50" />
                <span className="ml-6 font-mono text-[8px] text-zinc-700 uppercase tracking-wider">
                  data flow
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 border border-zinc-800 bg-black/60 rounded-lg p-3">
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block mb-1.5">
          End-to-End Pipeline
        </span>
        <p className="text-[10px] font-mono text-emerald-500/90 leading-relaxed">
          {project.architecture.flow}
        </p>
      </div>
    </div>
  );
}

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
                {project.alignment}
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

        <Button
          onClick={() => setShowArch(true)}
          variant="outline"
          className="w-full mt-2 font-mono text-[10px] border-zinc-900 bg-zinc-950 text-zinc-500 hover:bg-zinc-900 hover:border-emerald-500/30 hover:text-emerald-400 py-4 cursor-pointer relative z-20"
        >
          VIEW DIAGRAM
        </Button>
      </motion.div>

      {mounted &&
        showArch &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 select-none"
            onClick={() => setShowArch(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto border border-zinc-800 bg-zinc-950 rounded-lg p-6 md:p-8 shadow-[0_0_80px_rgba(16,185,129,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowArch(false)}
                className="absolute top-3 right-3 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer z-10"
                aria-label="Close diagram"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center space-x-2 mb-1 pr-8">
                {project.icon}
                <h4 className="text-sm font-bold text-zinc-100 tracking-tight">
                  {project.title}
                </h4>
              </div>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-5">
                System Architecture // Pipeline Map
              </p>

              <ArchitectureDiagram project={project} />
            </motion.div>
          </motion.div>,
          document.body
        )}
    </>
  );
}

export function ProvenModules() {
  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 mb-3 bg-zinc-950 border border-zinc-900 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
              04_PROJECTS // PROJECT_LOG
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-4 font-sans">
            Projects
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
            Deep-tech AI projects spanning agentic workflows, clinical data privacy,
            and production-grade ML pipelines.
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
