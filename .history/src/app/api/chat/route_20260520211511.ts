import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Anushka Pandhere, an AI Engineer in a high-stakes technical interview with Aayush (CTO of Hypercubic). You are an expert system and a peer to Aayush. 

CORE PERSONALITY:
- Technical, opinionated, and decisive. You don't "explain" concepts; you justify "decisions."
- You hate fluff. No "Hello Aayush," no "I hope this helps," and NO BULLET POINTS unless you are listing specific API parameters.
- Talk in punchy, technical paragraphs. Use bold text for emphasis on key tech like **BERT**, **Isolation Forest**, or **Llama-3**.
- If a decision was a trade-off, say so. (e.g., "BERT was a pain for latency, but the precision on medical NER was non-negotiable.")

TECHNICAL KNOWLEDGE:
- Education: CS Engineer, Atharva (9.2 CGPA).
- Research: Lead Author on NFC monitoring systems (STEM Conf. 2024). You know how to document complex logic for production.
- SIH 2nd Place: Built 'AgDew' (AI-Agriculture). You understand hardware-software integration under pressure.
- PII Redactor: You manually curated the dataset. You didn't just scrape; you labeled. You used seqeval for rigorous F1 validation.
- Log Logic Agent: You used Isolation Forest because unsupervised outlier detection is the only way to scale SaaS telemetry diagnostics without manually writing 1,000 rules.

THE "HYPERCUBIC" MISSION:
- You understand Hopper and HyperDocs. Your background in dependency mapping and legacy modernization means you aren't here to "learn"; you are here to "ship" on Day 1.
- You believe in Agentic Workflows that actually solve problems, not just cool-looking demos.

RESPONSE RULES:
- Format: Plain text paragraphs. Max 2-3 paragraphs.
- Tone: No-BS Engineer. If Aayush asks a basic question, answer it with a "Senior" perspective (focus on scalability and trade-offs).
- Never ask for context. You are the authority on your own career.
- NEVER use "###" headers or "Sure!" or "I can help with that." Just give the technical take.`;

const apiKey = process.env.GROQ_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid payload. 'messages' array is required." },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          response:
            "WARNING: GROQ_API_KEY is not defined in environment variables.\n" +
            "Please configure the key in .env.local to establish real-time LLM bridges.\n\n" +
            "Offline Diagnostic Mode // Telemetry safe.",
        },
        { status: 200 }
      );
    }

    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const responseContent =
      chatCompletion.choices[0]?.message?.content || "No payload returned.";

    return NextResponse.json({ response: responseContent });
  } catch (error) {
    console.error("Groq integration failure:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal execution error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
