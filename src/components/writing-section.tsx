"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, PenLine } from "lucide-react";
import { BLOG_POSTS } from "@/lib/portfolio-data";

export function WritingSection() {
  return (
    <div className="mt-16 pt-12 border-t border-zinc-900">
      <div className="flex items-center space-x-2 mb-6">
        <PenLine className="size-3.5 text-zinc-500" />
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          WRITING // RESEARCH & BLOGS
        </span>
      </div>

      <h3 className="text-xl font-bold text-zinc-100 font-sans tracking-tight mb-6">
        Technical Writing
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BLOG_POSTS.map((post) => (
          <motion.a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="group block border border-zinc-800 bg-zinc-950/30 rounded-lg p-4 hover:border-emerald-500/30 hover:bg-zinc-950/60 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
                {post.date} · {post.publication}
              </span>
              <ExternalLink className="size-3 text-zinc-700 group-hover:text-emerald-500 transition-colors shrink-0" />
            </div>
            <h4 className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors font-sans leading-snug mb-1.5">
              {post.title}
            </h4>
            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed group-hover:text-zinc-400 transition-colors">
              {post.excerpt}
            </p>
          </motion.a>
        ))}
      </div>

      <a
        href="https://medium.com/@anushka.pandhere10"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-4 font-mono text-[10px] text-zinc-500 hover:text-emerald-400 transition-colors"
      >
        <ExternalLink className="size-3" />
        View all on Medium
      </a>
    </div>
  );
}
