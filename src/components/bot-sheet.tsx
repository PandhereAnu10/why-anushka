"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowRight, RefreshCw, Cpu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHUD } from "@/context/hud-context";
import { FileViewer } from "./file-viewer";
import { AnimatePresence } from "framer-motion";
import {
  BLOG_POSTS,
  CERTIFICATIONS,
  GROQ_MODEL,
  SOCIAL_LINKS,
} from "@/lib/portfolio-data";

interface TerminalLine {
  text: string;
  type: "input" | "system" | "output" | "success" | "warning";
}

type CommandType = "experience" | "education" | "blogs" | "contact";

const COMMAND_MAP: Record<CommandType, { shell: string; prompt: string }> = {
  experience:
    {
      shell: "experience --timeline",
      prompt:
        "Walk me through Anushka Pandhere's work experience — from fn7.io Scout7.ai agentic AI internship to Auctus and FAUN. Include key impact for each role. LogLogic is a personal project, not employment.",
    },
  education:
    {
      shell: "education --credentials",
      prompt:
        "Summarize Anushka's education (B.E. at Atharva, Diploma at Government Polytechnic Mumbai), her 9.2 CGPA, research paper on NFC Duty Monitor, and hackathon awards.",
    },
  blogs:
    {
      shell: "blogs --list",
      prompt:
        "Tell me about Anushka's technical writing — her Medium and FAUN articles on AI agents, data science, and algorithms.",
    },
  contact:
    {
      shell: "contact",
      prompt: "",
    },
};

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
    const timer = setTimeout(scrollToEnd, 50);
    return () => clearTimeout(timer);
  }, [terminalLines, isTyping]);

  const bootTerminal = async () => {
    setIsTyping(true);
    const bootSequence: TerminalLine[] = [
      { text: "ANUSHKA_BOT [Version 4.0.0-Personal_Agent]", type: "system" },
      { text: "(c) 2026 Anushka Pandhere. Personal Agent Online.", type: "system" },
      { text: "Indexing LinkedIn profile, experience, education, blogs...", type: "system" },
      { text: `GROQ_SDK_${GROQ_MODEL} // CONTEXT_BRIDGE // STABLE`, type: "system" },
      { text: "SUCCESS: FULL PORTFOLIO INDEX LOADED.", type: "success" },
      {
        text: `Links: ${SOCIAL_LINKS.linkedin} | ${SOCIAL_LINKS.github} | ${SOCIAL_LINKS.medium}`,
        type: "warning",
      },
      {
        text: "Commands: experience | education | blogs | contact | ls | ls certifications",
        type: "output",
      },
    ];

    for (let i = 0; i < bootSequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80));
      setTerminalLines((prev) => [...prev, bootSequence[i]]);
    }
    setIsTyping(false);
  };

  const runContactSequence = async () => {
    setTerminalLines((prev) => [
      ...prev,
      { text: "guest@portfolio:~$ contact", type: "input" },
      { text: "LOG: Initializing secure contact overlay...", type: "warning" },
    ]);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsOpen(false);
    setSudoActive(true);
    setIsTyping(false);
  };

  const runCertificationsSequence = async () => {
    setTerminalLines((prev) => [
      ...prev,
      { text: "guest@portfolio:~$ ls certifications", type: "input" },
      { text: "VERIFIED_CREDENTIALS // DECRYPTING...", type: "system" },
    ]);
    await new Promise((resolve) => setTimeout(resolve, 300));

    for (const cert of CERTIFICATIONS) {
      setTerminalLines((prev) => [
        ...prev,
        {
          text: `[✓] ${cert.name} — ${cert.issuer} (${cert.issued})${cert.url ? ` → ${cert.url}` : ""}`,
          type: "success",
        },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    setIsTyping(false);
  };

  const runBlogsSequence = async () => {
    setTerminalLines((prev) => [
      ...prev,
      { text: "guest@portfolio:~$ blogs --list", type: "input" },
      { text: "FETCHING MEDIUM / FAUN CATALOG...", type: "system" },
    ]);
    await new Promise((resolve) => setTimeout(resolve, 250));

    for (const post of BLOG_POSTS) {
      setTerminalLines((prev) => [
        ...prev,
        { text: `[${post.date}] ${post.title} — ${post.url}`, type: "success" },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setIsTyping(false);
  };

  const runSocialLinksSequence = async () => {
    setTerminalLines((prev) => [
      ...prev,
      { text: "guest@portfolio:~$ links", type: "input" },
      { text: `LINKEDIN  → ${SOCIAL_LINKS.linkedin}`, type: "success" },
      { text: `GITHUB    → ${SOCIAL_LINKS.github}`, type: "success" },
      { text: `MEDIUM    → ${SOCIAL_LINKS.medium}`, type: "success" },
      { text: `EMAIL     → anushka.pandhere10@gmail.com`, type: "success" },
    ]);
    setIsTyping(false);
  };

  const fetchAIResponse = async (cmdText: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, { role: "user", content: cmdText }],
      }),
    });

    const data = await response.json();
    return data.response || "LOG: Telemetry extraction failed.";
  };

  const streamReply = async (reply: string, cmdText: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: cmdText },
      { role: "assistant", content: reply },
    ]);

    const lines = reply.split("\n");
    for (const line of lines) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      let lineType: "output" | "success" | "warning" = "output";
      if (line.startsWith("LOG:") || line.startsWith("ACCESS_DENIED")) {
        lineType = "warning";
      } else if (line.startsWith("SUCCESS:")) {
        lineType = "success";
      }
      setTerminalLines((prev) => [...prev, { text: line, type: lineType }]);
    }
  };

  const handleCommand = async (cmdType: CommandType) => {
    if (isTyping) return;

    if (cmdType === "contact") {
      runContactSequence();
      return;
    }

    if (cmdType === "blogs") {
      setIsTyping(true);
      await runBlogsSequence();
      setThinking(true);
      setTerminalLines((prev) => [...prev, { text: `LOG: Routing inference to ${GROQ_MODEL}...`, type: "system" }]);
      try {
        const reply = await fetchAIResponse(COMMAND_MAP.blogs.prompt);
        await streamReply(reply, COMMAND_MAP.blogs.prompt);
      } catch {
        setTerminalLines((prev) => [...prev, { text: "CRITICAL: Connection timed out.", type: "warning" }]);
      } finally {
        setIsTyping(false);
        setThinking(false);
      }
      return;
    }

    setIsTyping(true);
    setThinking(true);

    const { shell, prompt } = COMMAND_MAP[cmdType];

    setTerminalLines((prev) => [
      ...prev,
      { text: `guest@portfolio:~$ ${shell}`, type: "input" },
    ]);

    await new Promise((resolve) => setTimeout(resolve, 250));
    setTerminalLines((prev) => [...prev, { text: `LOG: Fetching dynamic inference from ${GROQ_MODEL}...`, type: "system" }]);

    try {
      const reply = await fetchAIResponse(prompt);
      await streamReply(reply, prompt);
    } catch {
      setTerminalLines((prev) => [
        ...prev,
        { text: "CRITICAL: Connection timed out. Ensure environment parameters are correct.", type: "warning" },
      ]);
    } finally {
      setIsTyping(false);
      setThinking(false);
    }
  };

  const runLsSequence = async () => {
    setTerminalLines((prev) => [
      ...prev,
      { text: "guest@portfolio:~$ ls", type: "input" },
      { text: "Searching local core catalog...", type: "system" },
    ]);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setTerminalLines((prev) => [
      ...prev,
      {
        text: "fine-tuning.py     anomaly-detector.py     achievements_manifest.log     certifications/",
        type: "success",
      },
      { text: "TIP: Run 'ls certifications' for verified credentials.", type: "output" },
    ]);
    setIsTyping(false);
  };

  const handleCustomInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const query = inputVal.trim();
    setTerminalLines((prev) => [
      ...prev,
      { text: `guest@portfolio:~$ ${query}`, type: "input" },
    ]);
    setInputVal("");
    setIsTyping(true);

    const cleanQuery = query.toLowerCase().trim();

    if (cleanQuery === "contact" || cleanQuery === "sudo hire") {
      runContactSequence();
      return;
    }
    if (cleanQuery === "ls") {
      runLsSequence();
      return;
    }
    if (cleanQuery === "ls certifications" || cleanQuery === "certifications") {
      runCertificationsSequence();
      return;
    }
    if (cleanQuery === "blogs" || cleanQuery === "blogs --list") {
      await handleCommand("blogs");
      return;
    }
    if (cleanQuery === "experience" || cleanQuery === "experience --timeline") {
      await handleCommand("experience");
      return;
    }
    if (cleanQuery === "education" || cleanQuery === "education --credentials") {
      await handleCommand("education");
      return;
    }
    if (cleanQuery === "links") {
      runSocialLinksSequence();
      return;
    }

    const fileCatalog = ["achievements_manifest.log", "fine-tuning.py", "anomaly-detector.py"];
    const matchingFile = fileCatalog.find((f) => cleanQuery.includes(f));

    if (matchingFile) {
      setTerminalLines((prev) => [
        ...prev,
        { text: `LOG: ACCESSING ENCRYPTED SECTOR: ${matchingFile}`, type: "system" },
      ]);

      const loaderFrames = [
        "DECRYPTING BUFFER [                ] 0%",
        "DECRYPTING BUFFER [████            ] 25%",
        "DECRYPTING BUFFER [████████        ] 50%",
        "DECRYPTING BUFFER [████████████    ] 75%",
        "DECRYPTING BUFFER [████████████████] 100%",
        "SUCCESS: KEY VERIFIED. MOUNTING STREAM OVERLAY...",
      ];

      for (const frame of loaderFrames) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        setTerminalLines((prev) => [...prev, { text: frame, type: "warning" }]);
      }

      setIsTyping(false);
      setActiveFile(matchingFile);
      return;
    }

    setTerminalLines((prev) => [...prev, { text: `LOG: Routing inference to ${GROQ_MODEL}...`, type: "system" }]);
    setThinking(true);

    try {
      const reply = await fetchAIResponse(query);
      await streamReply(reply, query);
    } catch {
      setTerminalLines((prev) => [
        ...prev,
        { text: "CRITICAL: Connection failure. Check your local API status.", type: "warning" },
      ]);
    } finally {
      setIsTyping(false);
      setThinking(false);
    }
  };

  const clearTerminal = () => {
    setTerminalLines([
      { text: "Terminal cache flushed.", type: "system" },
      { text: "ANUSHKA_BOT Active. Personal Agent ready.", type: "output" },
    ]);
  };

  const quickCommands: { type: CommandType; label: string }[] = [
    { type: "experience", label: "experience" },
    { type: "education", label: "education" },
    { type: "blogs", label: "blogs" },
    { type: "contact", label: "contact" },
  ];

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
            <SheetHeader className="border-b border-zinc-900 bg-zinc-950/40 p-4 shrink-0 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Terminal className="size-4 text-green-500" />
                  <SheetTitle className="font-mono text-xs font-semibold text-zinc-200 tracking-wider">
                    ANUSHKA_BOT: Personal Agent
                  </SheetTitle>
                </div>
                <p className="text-[10px] font-mono text-zinc-500">
                  Session Sec_Tunnel // 127.0.0.1 // Node.js_v20
                </p>
              </div>

              <div className="flex items-center space-x-1.5 bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded-full mr-6 font-mono text-[9px] text-red-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-semibold tracking-widest uppercase">LIVE</span>
              </div>
            </SheetHeader>

            <div className="p-3 border-b border-zinc-900 bg-zinc-950/20 shrink-0 space-y-1.5 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                Quick Commands
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {quickCommands.map(({ type, label }) => (
                  <button
                    key={type}
                    disabled={isTyping}
                    onClick={() => handleCommand(type)}
                    className="flex items-center justify-between text-left px-3 py-2 rounded border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 disabled:opacity-50 text-[11px] font-mono transition-colors text-zinc-300 group cursor-pointer"
                  >
                    <span>&gt; {label}</span>
                    <ArrowRight className="size-3 text-zinc-600 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

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
                        {line.text}
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
                    <span className="text-green-500 mr-2">guest@portfolio:~$</span>
                    <span className="h-4 w-1.5 bg-green-500 terminal-cursor" />
                  </div>
                </div>
              </ScrollArea>

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
                placeholder="experience | education | blogs | contact | links"
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
