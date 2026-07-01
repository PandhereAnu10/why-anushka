"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHUD } from "@/context/hud-context";
import { Cpu, ShieldCheck, X, Mail, Github, Linkedin } from "lucide-react";

export function SudoTakeover() {
  const { isSudoActive, setSudoActive, isPitchActive, setPitchActive } = useHUD();
  const [typedBriefing, setTypedBriefing] = useState("");
  const [takeoverLogs, setTakeoverLogs] = useState<string[]>([]);

  useEffect(() => {
    if (isSudoActive) {
      setTypedBriefing("");
      setTakeoverLogs([]);

      const logs = [
        "[LOG_001] CONTACT PROTOCOL INITIATED...",
        "[LOG_012] BYPASSING GATEWAY FIREWALL // IP: 127.0.0.1",
        "[LOG_025] TARGET: OPEN COLLABORATION CHANNEL",
        "[LOG_039] OVERRIDING LOCAL GRAPHICS COMPOSITOR...",
        "[LOG_042] PARSING PORTFOLIO DB...",
        "[LOG_068] EXTRACTING ANUSHKA_CORE METRICS:",
        "  -> BERT NER Model: 96.4% Clinical F1 Accuracy",
        "  -> IoT Platform: AI-driven AgDew agriculture device",
        "  -> Logic Engine: Isolation Forest anomaly isolation",
        "[LOG_087] CONSTRUCTING SECURE COMMUNICATION CHANNELS...",
        "[LOG_099] CONTACT OVERLAY READY.",
        "--------------------------------------------------",
        "[STATUS] HIRE / COLLABORATE // CHANNEL OPEN"
      ];

      let logIndex = 0;
      const logInterval = setInterval(() => {
        if (logIndex < logs.length) {
          const nextLog = logs[logIndex];
          setTakeoverLogs((prev) => [...prev, nextLog]);
          logIndex++;
        } else {
          clearInterval(logInterval);
          setPitchActive(true);
        }
      }, 150);

      return () => clearInterval(logInterval);
    }
  }, [isSudoActive, setPitchActive]);

  useEffect(() => {
    if (isPitchActive) {
      const pitchMessage =
        "[CONTACT CHANNEL OPEN]\n\n" +
        "I'm Anushka Pandhere — Forward Software Engineer & AI Builder. " +
        "From research publications to production AI systems, I bridge the gap between " +
        "frontier models and shipped software.\n\n" +
        "Open to full-time roles, contract work, and ambitious collaborations. " +
        "Let's build something that ships.";

      let charIndex = 0;
      let current = "";
      const typeInterval = setInterval(() => {
        if (charIndex < pitchMessage.length) {
          current += pitchMessage[charIndex];
          setTypedBriefing(current);
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 15);

      return () => clearInterval(typeInterval);
    }
  }, [isPitchActive]);

  const closeTakeover = () => {
    setSudoActive(false);
    setPitchActive(false);
  };

  if (!isSudoActive) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%) pointer-events-none" />

      <div className="flex items-center justify-between border-b border-zinc-900 pb-4 shrink-0 font-mono text-[10px] text-zinc-500 relative z-10">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="size-4 text-emerald-500" />
          <span className="text-zinc-200 tracking-wider">CONTACT_OVERLAY_SEQUENCE</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>CODE: 0xCONTACT</span>
          <button
            onClick={closeTakeover}
            className="text-zinc-500 hover:text-zinc-200 p-1 border border-zinc-900 rounded bg-zinc-950 cursor-pointer"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 my-6 flex flex-col md:flex-row gap-6 items-stretch relative z-10 min-h-0">
        <div className="w-full md:w-1/3 border border-zinc-900 bg-black/50 p-4 rounded-lg flex flex-col justify-between font-mono text-[9px] text-zinc-400 overflow-y-auto min-h-[120px] md:min-h-0">
          <div className="space-y-1.5">
            <span className="text-zinc-600 block mb-2 uppercase tracking-wider font-bold">Log Stream</span>
            {takeoverLogs.map((log, index) => {
              if (!log) return null;
              const isHighlight = log.startsWith("[STATUS");
              return (
                <div key={index} className={isHighlight ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                  {log}
                </div>
              );
            })}
          </div>
          <span className="text-zinc-700 mt-4">EXECUTION_NODE // VERIFIED</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence>
            {isPitchActive && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="w-full max-w-xl border border-emerald-500/20 bg-zinc-950/80 p-6 md:p-8 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.08)] relative overflow-hidden"
              >
                <span className="absolute top-2 left-3 font-mono text-[8px] text-zinc-600">SYS: CONTACT_OPEN</span>
                <span className="absolute top-2 right-3 font-mono text-[8px] text-zinc-600">SEC_ID: ANU</span>

                <div className="flex flex-col items-center text-center gap-5">
                  <div className="size-12 rounded-full border border-emerald-500/20 bg-emerald-950/10 flex items-center justify-center text-emerald-400">
                    <Cpu className="size-6 animate-pulse" />
                  </div>

                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-500">
                    CONTACT // HIRE ME
                  </h3>

                  <div className="w-full min-h-[140px] border border-zinc-900 bg-black/40 p-4 rounded text-left text-xs font-mono text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {typedBriefing}
                    <span className="h-4 w-1.5 bg-emerald-500 inline-block align-middle ml-1 animate-pulse" />
                  </div>

                  <div className="w-full flex flex-col gap-2 text-left">
                    <a
                      href="mailto:anushka.pandhere10@gmail.com"
                      className="flex items-center gap-2 px-3 py-2 rounded border border-zinc-800 bg-zinc-950 hover:border-emerald-500/30 text-xs font-mono text-zinc-300 hover:text-emerald-400 transition-colors"
                    >
                      <Mail className="size-3.5" />
                      anushka.pandhere10@gmail.com
                    </a>
                    <a
                      href="https://github.com/PandhereAnu10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded border border-zinc-800 bg-zinc-950 hover:border-emerald-500/30 text-xs font-mono text-zinc-300 hover:text-emerald-400 transition-colors"
                    >
                      <Github className="size-3.5" />
                      github.com/PandhereAnu10
                    </a>
                    <a
                      href="https://linkedin.com/in/anushka-pandhere"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded border border-zinc-800 bg-zinc-950 hover:border-emerald-500/30 text-xs font-mono text-zinc-300 hover:text-emerald-400 transition-colors"
                    >
                      <Linkedin className="size-3.5" />
                      linkedin.com/in/anushka-pandhere
                    </a>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row gap-3 mt-2">
                    <a href="mailto:anushka.pandhere10@gmail.com" className="flex-1">
                      <button className="w-full py-3.5 rounded font-mono text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-wider cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all animate-pulse duration-1000">
                        ESTABLISH CONNECTION
                      </button>
                    </a>
                    <button
                      onClick={closeTakeover}
                      className="flex-1 py-3.5 rounded font-mono text-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      CLOSE OVERLAY
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/3 border border-zinc-900 bg-black/50 p-4 rounded-lg flex flex-col justify-between font-mono text-[9px] text-zinc-500 min-h-[120px] md:min-h-0">
          <div className="space-y-4">
            <span className="text-zinc-600 block uppercase tracking-wider font-bold">HUD Graphs</span>

            <div className="h-28 border border-zinc-900 bg-zinc-950/40 rounded p-2.5 relative flex flex-col justify-between">
              <span className="text-[8px] text-zinc-700 absolute top-1 right-2">SYS_LOAD: 98.4%</span>
              <div className="flex-1 flex items-end gap-1">
                <motion.div animate={{ height: ["20%", "70%", "40%", "90%", "20%"] }} transition={{ repeat: Infinity, duration: 2 }} className="w-full bg-zinc-800" />
                <motion.div animate={{ height: ["40%", "20%", "90%", "50%", "40%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-full bg-emerald-950/60 border-t border-emerald-500/40" />
                <motion.div animate={{ height: ["80%", "40%", "20%", "80%", "80%"] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-full bg-zinc-800" />
                <motion.div animate={{ height: ["10%", "90%", "60%", "30%", "10%"] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-full bg-zinc-800" />
                <motion.div animate={{ height: ["90%", "30%", "80%", "40%", "90%"] }} transition={{ repeat: Infinity, duration: 2.2 }} className="w-full bg-emerald-950/60 border-t border-emerald-500/40" />
              </div>
              <span className="text-[8px] text-zinc-700">PIPELINE TELEMETRY</span>
            </div>

            <div className="space-y-1 bg-zinc-950/20 p-2 rounded border border-zinc-900/50">
              <div>AVAILABILITY: OPEN</div>
              <div>REASONING_LATENCY: 12ms</div>
              <div>DATA_PIPELINES: VERIFIED</div>
            </div>
          </div>

          <span className="text-zinc-700">SYS_HUD // ACTIVE</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-zinc-700 font-mono text-[9px] mt-2 relative z-10">
        <span>ENCRYPTED_CONNECTION // CONTACT CHANNEL SECURED</span>
        <span>NODE: ANUSHKA_CORE_v3.0</span>
      </div>
    </div>
  );
}
