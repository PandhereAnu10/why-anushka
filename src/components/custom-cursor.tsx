"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (mobile) return;

    document.body.classList.add("cursor-none");

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const check =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer");
      setIsHovered(!!check);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-green-500 rounded-full pointer-events-none z-[99999]"
        style={{ x: cursorX, y: cursorY, transform: "translate(6px, 6px)" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-green-500/50 pointer-events-none z-[99999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 40 : 20,
          height: isHovered ? 40 : 20,
          backgroundColor: isHovered ? "rgba(34, 197, 94, 0.05)" : "rgba(34, 197, 94, 0)",
          boxShadow: isHovered ? "0 0 15px rgba(34, 197, 94, 0.3)" : "none",
          transform: isHovered ? "translate(-10px, -10px)" : "translate(0px, 0px)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28, mass: 0.15 }}
      />
    </>
  );
}
