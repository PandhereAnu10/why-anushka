"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextFragment {
  id: string;
  type: "text" | "pii";
  content: string;
  piiType?: "NAME" | "DIAGNOSIS" | "MEDICATION" | "MRN";
}

const SIMULATED_CLINICAL_NOTE: TextFragment[] = [
  { id: "1", type: "text", content: "ADMISSION NOTE:\n\nPatient " },
  { id: "2", type: "pii", content: "Anushka Pandhere", piiType: "NAME" },
  { id: "3", type: "text", content: " was admitted to telehealth ward 4. MRN: " },
  { id: "4", type: "pii", content: "948-27-01X", piiType: "MRN" },
  { id: "5", type: "text", content: ".\nChief complaint: Patient presents with " },
  { id: "6", type: "pii", content: "acute cardiac arrhythmia", piiType: "DIAGNOSIS" },
  { id: "7", type: "text", content: " and mild dyspnea.\n\nPlan:\n- Administer " },
  { id: "8", type: "pii", content: "Metoprolol 50mg", piiType: "MEDICATION" },
  { id: "9", type: "text", content: " QD.\n- Monitor vital signs continuously.\n- Establish zero-leakage telemetry bridge." },
];

export function LiveRedactionDemo() {
  const [scanStep, setScanStep] = useState(0); // 0: Idle/Raw, 1: Scanning, 2: Redacted
  const [redactedStates, setRedactedStates] = useState<Record<string, boolean>>({});
  const [glitchingStates, setGlitchingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (scanStep === 1) {
      // Step-by-step redaction simulation matching scanner progression
      const timeline = [
        { time: 1000, id: "2" }, // Anushka Pandhere
        { time: 1800, id: "4" }, // 948-27-01X
        { time: 2600, id: "6" }, // cardiac arrhythmia
        { time: 3400, id: "8" }, // Metoprolol
      ];

      const timers = timeline.map((event) => {
        return setTimeout(() => {
          // Trigger glitch flicker
          setGlitchingStates((prev) => ({ ...prev, [event.id]: true }));
          
          setTimeout(() => {
            setRedactedStates((prev) => ({ ...prev, [event.id]: true }));
            setGlitchingStates((prev) => ({ ...prev, [event.id]: false }));
          }, 350); // Glitch duration

        }, event.time);
      });

      // End of scan loop reset
      const resetTimer = setTimeout(() => {
        setScanStep(2);
      }, 5000);

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(resetTimer);
      };
    }
  }, [scanStep]);

  const restartScan = () => {
    setRedactedStates({});
    setGlitchingStates({});
    setScanStep(1);
  };

  const renderFragment = (frag: TextFragment) => {
    if (frag.type === "text") {
      return <span key={frag.id} className="text-zinc-400 font-sans">{frag.content}</span>;
    }

    const isRedacted = redactedStates[frag.id];
    const isGlitching = glitchingStates[frag.id];

    if (isGlitching) {
      return (
        <span
          key={frag.id}
          className="font-mono text-emerald-400 px-1 bg-emerald-950/20 rounded border border-emerald-500/20 glitch-active uppercase text-[10px] tracking-wider"
        >
          {Array(frag.content.length).fill("█").join("").substring(0, 8)}
        </span>
      );
    }

    if (isRedacted) {
      return (
        <motion.span
          key={frag.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-zinc-600 px-1 bg-zinc-900 rounded border border-zinc-800 select-none cursor-help group/pii relative"
          title={`REDACTED [${frag.piiType}]`}
        >
          {Array(Math.min(frag.content.length, 12)).fill("█").join("")}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/pii:block bg-black border border-zinc-800 text-[8px] text-zinc-500 px-1.5 py-0.5 rounded font-mono whitespace-nowrap z-30">
            {frag.piiType}
          </span>
        </motion.span>
      );
    }

    return (
      <span
        key={frag.id}
        className="text-zinc-200 border-b border-red-500/20 bg-red-950/10 px-0.5 rounded"
      >
        {frag.content}
      </span>
    );
  };

  return (
    <div className="border border-zinc-800 bg-zinc-950/80 rounded-lg p-5 relative overflow-hidden flex flex-col justify-between h-[280px]">
      {/* Header telemetry info */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5 mb-3 font-mono text-[9px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          NER_SCANNER // BERT_v3
        </span>
        <span>LATENCY: 24ms</span>
      </div>

      {/* Note Body */}
      <div className="flex-1 relative min-h-[140px] text-xs leading-relaxed font-sans overflow-hidden bg-black/40 p-3.5 rounded border border-zinc-900/50">
        {/* Dynamic Scanning Line */}
        {scanStep === 1 && (
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.85)] z-20 pointer-events-none"
          />
        )}

        <pre className="whitespace-pre-wrap font-sans text-zinc-300">
          {SIMULATED_CLINICAL_NOTE.map(renderFragment)}
        </pre>
      </div>

      {/* Control panel buttons */}
      <div className="mt-4 flex items-center justify-between font-mono text-[10px]">
        <span className="text-zinc-600">STATUS: {scanStep === 1 ? "ANALYZING..." : scanStep === 2 ? "CLEAN" : "PENDING_SCAN"}</span>
        <button
          onClick={restartScan}
          disabled={scanStep === 1}
          className="px-2.5 py-1.5 rounded border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-green-400 hover:border-green-500/20 transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
        >
          {scanStep === 0 ? "START SCANNER" : scanStep === 1 ? "SCANNING" : "RE-SCAN DATA"}
        </button>
      </div>
    </div>
  );
}
