"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowRight, RefreshCw, Cpu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHUD } from "@/context/hud-context";
import { FileViewer } from "./file-viewer";
import { AnimatePresence } from "framer-motion";

interface TerminalLine {
  text: string;
  type: "input" | "system" | "output" | "success" | "warning";
}

export function BotSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const { setThinking, setSudoActive } = useHUD();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && terminalLines.length === 0) {
      bootTerminal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const scrollToEnd = () => {
      if (scrollRef.current) {
        const scrollContainer = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };

    scrollToEnd();
    // Use a small timeout to let Radix layout settle before updating scroll position
    const timer = setTimeout(scrollToEnd, 50);
    return () => clearTimeout(timer);
  }, [terminalLines, isTyping]);

  const bootTerminal = async () => {
    setIsTyping(true);
    const bootSequence: TerminalLine[] = [
      { text: "ANUSHKA_BOT [Version 3.0.0-HUD_Link]", type: "system" },
      { text: "(c) 2026 Anushka Pandhere. AI System Online.", type: "system" },
      { text: "Establishing neural secure tunnel to Hypercubic...", type: "system" },
      { text: "GROQ_SDK_Llama-3.3-70B // CONTEXT_BRIDGE // STABLE", type: "system" },
      { text: "SUCCESS: REAL-TIME SECURE HANDSHAKE COMPLETED.", type: "success" },
      {
        text: "System Note: Analyzed Aayush's focus on legacy mainframe modernization (e.g. Hopper agentic environments and HyperDocs dependency maps). My custom BERT fine-tuning and Log Logic anomaly detection models directly address the data parsing validation and pipeline error identification constraints inherent in this mission.",
        type: "warning"
      },
      { text: "Ready for telemetry queries. Choose a calibration, type 'ls', or execute 'sudo hire'.", type: "output" }
    ];

    for (let i = 0; i < bootSequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80));
      setTerminalLines((prev) => [...prev, bootSequence[i]]);
    }
    setIsTyping(false);
  };

  const handleCommand = async (cmdType: "why_me" | "anomaly_work" | "day_1_plan") => {
    if (isTyping) return;
    setIsTyping(true);
    setThinking(true);

    const cmdText =
      cmdType === "why_me"
        ? "Run a capability audit: why is Anushka Pandhere the best Forward Software Engineer fit for Hypercubic?"
        : cmdType === "anomaly_work"
          ? "Explain your experience building custom anomaly detection pipelines and deploying unsupervised Isolation Forest classifiers."
          : "Provide a structured day 1 execution plan for onboarding and scaling context agents at Hypercubic.";

    const shellLabel =
      cmdType === "why_me"
        ? "run-audit --candidate=anushka --target=hypercubic"
        : cmdType === "anomaly_work"
          ? "explain-anomaly-detection --isolation-forest"
          : "view-execution-plan --day-1-timeline";

    setTerminalLines((prev) => [
      ...prev,
      { text: `guest@hypercubic:~$ ${shellLabel}`, type: "input" }
    ]);

    await new Promise((resolve) => setTimeout(resolve, 250));
    setTerminalLines((prev) => [...prev, { text: "LOG: Fetching dynamic inference from Llama-3.3-70B...", type: "system" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: cmdText }]
        })
      });

      const data = await response.json();
      const reply = data.response || "LOG: Telemetry extraction failed.";

      setMessages((prev) => [
        ...prev,
        { role: "user", content: cmdText },
        { role: "assistant", content: reply }
      ]);

      const lines = reply.split("\n");
      for (const line of lines) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        let lineType: "output" | "success" | "warning" = "output";
        if (line.startsWith("LOG:") || line.startsWith("ESTABLISHING") || line.startsWith("TECHNICAL")) {
          lineType = "warning";
        } else if (line.startsWith("SUCCESS:") || line.includes("READY") || line.includes("LOCKED")) {
          lineType = "success";
        }
        setTerminalLines((prev) => [...prev, { text: line, type: lineType }]);
      }
    } catch {
      setTerminalLines((prev) => [
        ...prev,
        { text: "CRITICAL: Connection timed out. Ensure environment parameters are correct.", type: "warning" }
      ]);
    } finally {
      setIsTyping(false);
      setThinking(false);
    }
  };

  const runLsSequence = async () => {
    setTerminalLines((prev) => [
      ...prev,
      { text: "guest@hypercubic:~$ ls", type: "input" },
      { text: "Searching local core catalog...", type: "system" }
    ]);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setTerminalLines((prev) => [
      ...prev,
      { text: "fine-tuning.py     anomaly-detector.py     achievements_manifest.log", type: "success" }
    ]);
    setIsTyping(false);
  };

  const runSudoHireSequence = async () => {
    setTerminalLines((prev) => [
      ...prev,
      { text: "guest@hypercubic:~$ sudo hire", type: "input" },
      { text: "CRITICAL: Initializing deconstruction protocol...", type: "warning" }
    ]);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsOpen(false); // Close terminal drawer smoothly
    setSudoActive(true); // Fire up full screen cinematic override
  };

  const handleCustomInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const query = inputVal.trim();
    setTerminalLines((prev) => [
      ...prev,
      { text: `guest@hypercubic:~$ ${query}`, type: "input" }
    ]);
    setInputVal("");
    setIsTyping(true);

    const cleanQuery = query.toLowerCase().trim();
    if (cleanQuery === "sudo hire") {
      runSudoHireSequence();
      setIsTyping(false);
      return;
    } else if (cleanQuery === "ls") {
      runLsSequence();
      return;
    }

    // Filename Recognition parser
    const fileCatalog = ["achievements_manifest.log", "fine-tuning.py", "anomaly-detector.py"];
    const matchingFile = fileCatalog.find((f) => cleanQuery.includes(f));

    if (matchingFile) {
      setTerminalLines((prev) => [
        ...prev,
        { text: `LOG: ACCESSING ENCRYPTED SECTOR: ${matchingFile}`, type: "system" }
      ]);

      const loaderFrames = [
        "DECRYPTING BUFFER [                ] 0%",
        "DECRYPTING BUFFER [████            ] 25%",
        "DECRYPTING BUFFER [████████        ] 50%",
        "DECRYPTING BUFFER [████████████    ] 75%",
        "DECRYPTING BUFFER [████████████████] 100%",
        "SUCCESS: KEY VERIFIED. MOUNTING STREAM OVERLAY..."
      ];

      for (const frame of loaderFrames) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        setTerminalLines((prev) => [...prev, { text: frame, type: "warning" }]);
      }

      setIsTyping(false);
      setActiveFile(matchingFile);
      return;
    }

    setTerminalLines((prev) => [...prev, { text: "LOG: Routing inference to Llama-3.3-70B...", type: "system" }]);
    setThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: query }]
        })
      });

      const data = await response.json();
      const reply = data.response || "LOG: Response generation failed.";

      setMessages((prev) => [
        ...prev,
        { role: "user", content: query },
        { role: "assistant", content: reply }
      ]);

      const lines = reply.split("\n");
      for (const line of lines) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setTerminalLines((prev) => [...prev, { text: line, type: "output" }]);
      }
    } catch {
      setTerminalLines((prev) => [
        ...prev,
        { text: "CRITICAL: Connection failure. Check your local API status.", type: "warning" }
      ]);
    } finally {
      setIsTyping(false);
      setThinking(false);
    }
  };

  const clearTerminal = () => {
    setTerminalLines([
      { text: "Terminal cache flushed.", type: "system" },
      { text: "ANUSHKA_BOT Active. Ready for integration queries.", type: "output" }
    ]);
  };

  const renderLineText = (lineText: string) => {
    if (lineText.includes("Hopper") || lineText.includes("HyperDocs")) {
      const parts = lineText.split(/(Hopper|HyperDocs)/g);
      return parts.map((part, idx) => {
        if (part === "Hopper" || part === "HyperDocs") {
          return (
            <span key={idx} className="text-green-400 font-bold underline decoration-green-400/30">
              {part}
            </span>
          );
        }
        return part;
      });
    }
    return lineText;
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button
                size="sm"
                className="font-mono text-[10px] tracking-wider border border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-green-500/30 hover:text-green-400 hover:bg-zinc-900/60 rounded-md px-3.5 py-5 transition-all duration-300 relative shadow-2xl group flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <Cpu className="size-3.5 transition-transform duration-300 group-hover:rotate-12" />
                <span>[SYS_CONSOLE]</span>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 system-pulse" />
              </Button>
            }
          />

          <SheetContent
            side="right"
            showCloseButton={true}
            className="w-full sm:max-w-2xl bg-black border-l border-zinc-800 text-zinc-100 flex flex-col h-full p-0 gap-0 shadow-2xl backdrop-blur-md bg-opacity-90 font-sans"
          >

            {/* Header */}
            <SheetHeader className="border-b border-zinc-900 bg-zinc-950/40 p-4 shrink-0 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Terminal className="size-4 text-green-500" />
                  <SheetTitle className="font-mono text-xs font-semibold text-zinc-200 tracking-wider">
                    ANUSHKA_BOT: Query System
                  </SheetTitle>
                </div>
                <p className="text-[10px] font-mono text-zinc-500">
                  Session Sec_Tunnel // 127.0.0.1 // Node.js_v20
                </p>
              </div>

              {/* Pulsing Live REC Indicator */}
              <div className="flex items-center space-x-1.5 bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded-full mr-6 font-mono text-[9px] text-red-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-semibold tracking-widest uppercase">LIVE</span>
              </div>
            </SheetHeader>

            {/* Quick Commands Grid */}
            <div className="p-3 border-b border-zinc-900 bg-zinc-950/20 shrink-0 space-y-1.5 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                Quick Calibrations
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  disabled={isTyping}
                  onClick={() => handleCommand("why_me")}
                  className="flex items-center justify-between text-left px-3 py-2 rounded border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 disabled:opacity-50 text-[11px] font-mono transition-colors text-zinc-300 group cursor-pointer"
                >
                  <span>&gt; why-anushka-for-hypercubic?</span>
                  <ArrowRight className="size-3 text-zinc-600 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  disabled={isTyping}
                  onClick={() => handleCommand("anomaly_work")}
                  className="flex items-center justify-between text-left px-3 py-2 rounded border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 disabled:opacity-50 text-[11px] font-mono transition-colors text-zinc-300 group cursor-pointer"
                >
                  <span>&gt; explain-anomaly-detection-logic</span>
                  <ArrowRight className="size-3 text-zinc-600 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  disabled={isTyping}
                  onClick={() => handleCommand("day_1_plan")}
                  className="flex items-center justify-between text-left px-3 py-2 rounded border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 disabled:opacity-50 text-[11px] font-mono transition-colors text-zinc-300 group cursor-pointer"
                >
                  <span>&gt; view-day-1-timeline</span>
                  <ArrowRight className="size-3 text-zinc-600 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </div>

            {/* Terminal Console */}
            <div className="flex-1 min-h-0 bg-black flex flex-col p-4 relative font-mono text-[12px] leading-relaxed">
              <ScrollArea ref={scrollRef} className="flex-1 h-full w-full">
                <div className="space-y-2 pr-2">
                  {terminalLines.map((line, idx) => {
                    let textClass = "text-zinc-300";
                    if (line.type === "input") textClass = "text-green-400 font-semibold";
                    else if (line.type === "system") textClass = "text-zinc-600";
                    else if (line.type === "success") textClass = "text-green-500 font-bold";
                    else if (line.type === "warning") textClass = "text-yellow-500/80";

                    return (
                      <div key={idx} className={`${textClass} whitespace-pre-wrap`}>
                        {renderLineText(line.text)}
                      </div>
                    );
                  })}

                  {isTyping && (
                    <div className="flex items-center space-x-1 text-green-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}

                  <div className="flex items-center text-zinc-400">
                    <span className="text-green-500 mr-2">guest@hypercubic:~$</span>
                    <span className="h-4 w-1.5 bg-green-500 terminal-cursor" />
                  </div>
                </div>
              </ScrollArea>

              {/* Clear terminal floating button */}
              {terminalLines.length > 7 && (
                <button
                  onClick={clearTerminal}
                  className="absolute bottom-16 right-4 p-1.5 rounded border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  title="Clear Terminal Cache"
                >
                  <RefreshCw className="size-3" />
                </button>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleCustomInput}
              className="border-t border-zinc-900 bg-zinc-950/40 p-3 shrink-0 flex items-center space-x-2 font-mono"
            >
              <span className="font-mono text-zinc-600 text-xs select-none">$</span>
              <input
                type="text"
                disabled={isTyping}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Submit custom command..."
                className="flex-1 bg-transparent border-0 outline-none text-xs text-zinc-200 font-mono placeholder:text-zinc-700 disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={isTyping || !inputVal.trim()}
                size="xs"
                variant="outline"
                className="border-zinc-800 bg-zinc-950 font-mono text-[10px] text-zinc-400 px-2 py-1 hover:border-zinc-600 hover:text-zinc-100 cursor-pointer"
              >
                RUN
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* File Stream Overlay */}
      <AnimatePresence>
        {activeFile && (
          <FileViewer
            fileName={activeFile}
            onClose={() => setActiveFile(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
