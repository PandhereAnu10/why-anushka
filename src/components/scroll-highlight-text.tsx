"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollHighlightTextProps {
  before: string;
  highlight: string;
  after?: string;
  className?: string;
}

export function ScrollHighlightText({
  before,
  highlight,
  after = "",
  className = "",
}: ScrollHighlightTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const highlightOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 1]);
  const baseOpacity = useTransform(scrollYProgress, [0, 0.4], [0.55, 0.7]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity: baseOpacity }}
      className={`text-base md:text-lg leading-relaxed font-sans ${className}`}
    >
      <span className="text-zinc-500">{before}</span>
      <motion.span
        style={{ opacity: highlightOpacity }}
        className="text-zinc-100 font-medium"
      >
        {highlight}
      </motion.span>
      {after && <span className="text-zinc-500">{after}</span>}
    </motion.p>
  );
}
