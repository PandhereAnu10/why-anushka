"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHUD } from "@/context/hud-context";

const LOG_MESSAGES = [
  "[SYSTEM_CHECK] ... SCANNING FOR FORWARD_ENGINEER_DNA",
  "[MATCH_FOUND] ... ANUSHKA PANDHERE // 9.2 CGPA",
  "[CORE_STRENGTH] ... AGENTIC AI + BERT FINE-TUNING",
  "[MISSION_ALIGNED] ... HYPERCUBIC LEGACY MODERNIZATION",
  "[FINAL_STATUS] ... COMPATIBILITY: 98%"
];

const TARGET_TEXT = "BECAUSE I SHIP AI PRODUCTS, NOT JUST PROMPTS.";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]";

export function IntroLoader() {
  const { isLoaderActive, setLoaderActive } = useHUD();
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [scrambledText, setScrambledText] = useState("WHY ANUSHKA?");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isLoaderActive || !isClient) return;

    // 1. Rapid fire log updates (0.6s each)
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev < LOG_MESSAGES.length - 1) {
          return prev + 1;
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 600);

    // 2. Transition from logs to centered question text after 3 seconds
    const showQuestionTimeout = setTimeout(() => {
      setShowQuestion(true);
    }, 3000);

    // 3. Start the de-scrambling animation after 4.2 seconds
    const deScrambleTimeout = setTimeout(() => {
      let iterations = 0;
      const deScrambleInterval = setInterval(() => {
        setScrambledText(() => {
          return TARGET_TEXT
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) {
                return TARGET_TEXT[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("");
        });

        iterations += 1.0; // Settle 1.0 character per 50ms interval
        if (iterations >= TARGET_TEXT.length) {
          clearInterval(deScrambleInterval);
          setScrambledText(TARGET_TEXT);

          // 4. Trigger screen-split transition 800ms after settling
          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setLoaderActive(false);
            }, 800); // Time for split animation
          }, 800);
        }
      }, 50);
    }, 4200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(showQuestionTimeout);
      clearTimeout(deScrambleTimeout);
    };
  }, [isLoaderActive, setLoaderActive, isClient]);

  if (!isClient || !isLoaderActive) return null;

  const progress = showQuestion ? 100 : ((currentLogIndex + 1) / LOG_MESSAGES.length) * 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] overflow-hidden select-none bg-black">
        {/* Visual Flickering Digital Pixel Noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(circle_at_center,#22c55e_0.5px,transparent_0.5px)] bg-[size:8px_8px] animate-pulse" />

        {/* Top Half of split screen */}
        <motion.div
          animate={isTransitioning ? { y: "-100%" } : { y: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 w-full h-1/2 bg-black border-b border-zinc-900/50"
        />

        {/* Bottom Half of split screen */}
        <motion.div
          animate={isTransitioning ? { y: "100%" } : { y: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-black border-t border-zinc-900/50"
        />

        {/* Centered Pitch Screen Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-[210]">
          <AnimatePresence mode="wait">
            {!showQuestion ? (
              // Fast Telemetry Logs View
              <motion.div
                key="logs"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg font-mono text-[11px] text-left space-y-2 border border-zinc-900 bg-zinc-950/60 p-5 rounded-md shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3 text-[10px] text-zinc-500">
                  <span>HYPERCUBIC // SYSTEM_INGEST</span>
                  <span>INIT_PROTOCOL_DNA</span>
                </div>

                <div className="space-y-1.5 min-h-[95px]">
                  {LOG_MESSAGES.slice(0, currentLogIndex + 1).map((log, idx) => {
                    const isSuccess = log.includes("MATCH") || log.includes("COMPATIBILITY");
                    const isCheck = log.includes("SYSTEM_CHECK");
                    let colorClass = "text-zinc-400";
                    if (isSuccess) colorClass = "text-green-400 font-bold";
                    else if (isCheck) colorClass = "text-yellow-500/80";

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={colorClass}
                      >
                        {log}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              // Scrambled / De-scrambled glowing text reveal
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={
                  isTransitioning
                    ? { opacity: 0, scale: 1.2, filter: "blur(12px)" }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.4 }}
                className="max-w-3xl flex flex-col items-center justify-center gap-4"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                  Hypercubic Telemetry Target
                </span>

                <h1 className="font-sans text-2xl md:text-4xl font-extrabold tracking-tight text-white select-none text-glow leading-tight">
                  {scrambledText}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thin Green bottom progress bar */}
        {!isTransitioning && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-950 z-[220]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
