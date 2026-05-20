"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Cpu, Server, Zap, CheckCircle2, Terminal } from "lucide-react";

export function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const cardsData = [
    {
      id: "agentic-logic",
      title: "Agentic Logic",
      percentage: 98,
      icon: <Cpu className="size-5 text-green-500" />,
      subtitle: "MCP & LLM Orchestration",
      description: "Bridging the gap between frontier reasoning models and enterprise applications.",
      highlights: ["Groq Llama-3 Reasoning", "Model Context Protocol (MCP)", "BERT / Custom NER Fine-tuning", "PII Redaction Systems"],
      details: [
        "Built Log Logic Agent applying Isolation Forest for anomaly detection and LLaMA via Groq for SaaS recommendation-style reasoning.",
        "Contributed to building an agentic AI system as part of a team — built and integrated MCP servers and Python backend workflows.",
        "Independently designed and curated a custom dataset from scratch for clinical PII detection, fine-tuning a BERT-based NER model using Hugging Face."
      ],
      metrics: "9.2 CGPA • Atharva CSE"
    },
    {
      id: "backend-architecture",
      title: "Backend Architecture",
      percentage: 95,
      icon: <Server className="size-5 text-green-500" />,
      subtitle: "High-Performance Pipelines",
      description: "Designing deterministic, scalable API layers supporting agentic state machines.",
      highlights: ["FastAPI", "Python", "RESTful APIs", "PostgreSQL", "Node.js", "Docker & CI/CD"],
      details: [
        "Built production-grade, highly secure RESTful APIs using Python, NumPy, and pandas for enterprise data integration.",
        "Collaborated in fast-paced remote engineering squads delivering clean, modular, and extensively documented code.",
        "Engineered reliable, responsive frontend integrations including 3-4 key Angular components to sync with backend systems."
      ],
      metrics: "FastAPI • REST • Python"
    },
    {
      id: "product-velocity",
      title: "Product Velocity",
      percentage: 100,
      icon: <Zap className="size-5 text-green-500" />,
      subtitle: "The 'Forward Engineer' Mindset",
      description: "Obsessing over product delivery, user satisfaction, and CTO Aayush's technical vision.",
      highlights: ["Research-to-Product", "Rapid Prototyping", "Proactive Product Decisions", "Cross-stack Autonomy"],
      details: [
        "Engineered with extreme autonomy, taking clinical and diagnostic AI ideas from early Hugging Face research to live interactive demos.",
        "Possesses a dual-layer skill set: deep technical understanding of NLP/BERT and high-velocity frontend/backend capability.",
        "Committed to accelerating Hypercubic's agentic systems from day one with proactive documentation and testing."
      ],
      metrics: "Day 1 Readiness • Product Owner"
    }
  ];

  return (
    <section
      id="compatibility-dashboard"
      className="py-24 px-6 md:px-12 bg-black border-t border-zinc-800 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-left max-w-2xl">
          <div className="flex items-center space-x-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              COMPATIBILITY SCHEMA // MATRIX_V1
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-4">
            Integration Dashboard
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            A metric-driven analysis of Anushka Pandhere&apos;s operational alignment with Hypercubic&apos;s &quot;Forward Software Engineer&quot; criteria.
          </p>
        </div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {cardsData.map((card) => (
            <motion.div key={card.id} variants={itemVariants}>
              <Card className="h-full border border-zinc-800 bg-zinc-950/20 backdrop-blur-md rounded-lg hover:border-green-500/30 hover:shadow-[0_0_25px_rgba(34,197,94,0.04)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 rounded border border-zinc-800 bg-zinc-900/30">
                          {card.icon}
                        </div>
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                          {card.subtitle}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-zinc-800 bg-zinc-950 text-green-400"
                      >
                        {card.percentage}% Match
                      </Badge>
                    </div>

                    <CardTitle className="text-lg font-bold text-zinc-100 font-sans tracking-tight pt-1">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-zinc-500 text-[13px] pt-1">
                      {card.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Custom progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-zinc-500">SYSTEM_INTEGRATION</span>
                        <span className="text-green-500">{card.percentage}%</span>
                      </div>
                      <Progress value={card.percentage} className="w-full">
                        <ProgressTrack className="bg-zinc-900 h-1.5">
                          <ProgressIndicator className="bg-green-500 h-full rounded-full transition-all duration-1000" />
                        </ProgressTrack>
                      </Progress>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {card.highlights.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md border border-zinc-800/80 bg-zinc-950/50 text-[10px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Personalization Bullet Points */}
                    <ul className="space-y-3 pt-2 text-[12px] leading-relaxed text-zinc-400 font-sans">
                      {card.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="size-4 shrink-0 text-green-600 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="px-6 py-4 border-t border-zinc-900 bg-zinc-950/50 rounded-b-lg flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center space-x-1.5">
                    <Terminal className="size-3 text-zinc-600" />
                    <span>STATUS: CALIBRATED</span>
                  </div>
                  <span>{card.metrics}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
