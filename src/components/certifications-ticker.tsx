"use client";

import React from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/lib/portfolio-data";

export function CertificationsTicker() {
  const items = [
    ...CERTIFICATIONS.map((c) => `${c.name} // ${c.issuer}`),
    ...CERTIFICATIONS.map((c) => `${c.name} // ${c.issuer}`),
  ];

  return (
    <div className="mt-10 border border-zinc-900 bg-zinc-950/40 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-900">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          VERIFIED_CREDENTIALS // ls certifications
        </span>
      </div>
      <div className="relative overflow-hidden py-3">
        <motion.div
          className="flex gap-8 whitespace-nowrap font-mono text-[10px] text-zinc-500"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {items.map((label, i) => (
            <span key={i} className="flex items-center gap-2 shrink-0">
              <span className="text-green-500/60">✓</span>
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
