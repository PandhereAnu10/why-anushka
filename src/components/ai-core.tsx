"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useHUD } from "@/context/hud-context";

export function AICore() {
  const { isThinking, isLoaderActive } = useHUD();
  const { scrollYProgress } = useScroll();

  // Mouse coordinates for heavy lag positioning
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy spring configuration to give the orb physical "lag" and inertia
  const springX = useSpring(mouseX, { stiffness: 12, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 12, damping: 20 });

  // Map scroll progress to color interpolation (from Zinc-600 to Hypercubic Green)
  const orbColor = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["#52525b", "#22c55e"] // Zinc-600 to Emerald-500
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset from center
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      // Limit range to make it feel heavy and anchored in the center
      mouseX.set(x * 0.15);
      mouseY.set(y * 0.15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="relative flex items-center justify-center size-80 md:size-[28rem]"
      >
        {/* Outer Glow Blur ring */}
        <motion.div
          style={{
            borderColor: orbColor,
            boxShadow: useTransform(orbColor, (color) => `0 0 80px ${color}22`),
          }}
          animate={
            isLoaderActive
              ? { scale: 0, opacity: 0 }
              : isThinking
              ? {
                  scale: [1, 1.05, 0.98, 1.02, 1],
                  rotate: 360,
                  opacity: 0.6,
                }
              : {
                  scale: [1, 1.02, 1],
                  rotate: [0, 90, 180, 270, 360],
                  opacity: 0.6,
                }
          }
          transition={
            isLoaderActive
              ? { duration: 0.2 }
              : isThinking
              ? {
                  scale: { repeat: Infinity, duration: 0.15, ease: "linear" }, // Humming visual effect
                  rotate: { repeat: Infinity, duration: 4, ease: "linear" },
                }
              : {
                  scale: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 40, ease: "linear" },
                }
          }
          className="absolute inset-0 rounded-full border border-dashed border-zinc-800 filter blur-[2px]"
        />

        {/* Middle blur layer */}
        <motion.div
          style={{
            backgroundColor: orbColor,
            boxShadow: useTransform(orbColor, (color) => `0 0 60px ${color}33`),
          }}
          animate={
            isLoaderActive
              ? { scale: 0, opacity: 0 }
              : isThinking
              ? {
                  scale: [1, 1.08, 0.96, 1.04, 1],
                  opacity: 0.2,
                }
              : {
                  scale: [1, 1.04, 1],
                  opacity: 0.2,
                }
          }
          transition={{
            repeat: isLoaderActive ? 0 : Infinity,
            duration: isThinking ? 0.08 : 4,
            ease: "easeInOut",
          }}
          className="absolute inset-16 rounded-full filter blur-2xl"
        />

        {/* Core Solid Ring */}
        <motion.div
          style={{
            borderColor: orbColor,
          }}
          animate={
            isLoaderActive
              ? { scale: 0, opacity: 0 }
              : isThinking
              ? {
                  rotate: -360,
                  opacity: 1,
                }
              : {
                  rotate: 0,
                  opacity: 1,
                }
          }
          transition={{
            repeat: isLoaderActive ? 0 : Infinity,
            duration: 8,
            ease: "linear",
          }}
          className="absolute inset-24 rounded-full border border-double border-zinc-800/80 flex items-center justify-center"
        >
          {/* Inner pulse node */}
          <motion.div
            style={{
              backgroundColor: orbColor,
              boxShadow: useTransform(orbColor, (color) => `0 0 30px ${color}cc`),
            }}
            animate={
              isLoaderActive
                ? { scale: 0 }
                : isThinking
                ? {
                    scale: [1, 1.1, 0.9, 1.1, 1],
                  }
                : {
                    scale: [1, 1.05, 1],
                  }
            }
            transition={{
              repeat: isLoaderActive ? 0 : Infinity,
              duration: isThinking ? 0.12 : 3,
              ease: "easeInOut",
            }}
            className="size-6 rounded-full filter blur-[1px]"
          />
        </motion.div>

        {/* Orbiting particles / telemetry text */}
        {!isLoaderActive && (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[7px] text-zinc-800 select-none opacity-40">
            <div className="animate-spin" style={{ animationDuration: "120s" }}>
              [CORE_INITIALIZED // TELEMETRY_ACTIVE]
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
