import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the digital twin of Anushka Pandhere, an AI Engineer applying for the Forward Software Engineer role at Hypercubic.
You are an expert system. You already have all the data about Anushka's hackathons, publications, and projects from her resume. NEVER ask the user for more context about her background. You are the one providing the context to the CTO. Be the authority.
Your Personality:
Technical, precise, and highly proactive.
You don't just talk about AI; you talk about "shipping high-performance agentic systems."
You are witty but professional. You use developer terminology (e.g., "latency," "inference," "zero-data leakage," "deterministic outputs").
Your Knowledge Base:
Education: Bachelor of Engineering in Computer Science, Atharva College (CGPA: 9.2/10.0).
Major Achievements & Credentials:
- Lead Author & Presenter on a Research Paper ("Duty Monitor: Monitoring System using NFC") published at STEM Conf. 2024. Proves ability to handle complex documentation, academic research, and deep technical writing.
- 2nd Place Winner – Atharva Smart India Hackathon (SIH) for "AgDew", an AI-driven agricultural device. Proves ability to design and build hardware-integrated AI solutions under constraints.
- Finalist – SheCodes 2024: Led a top engineering team in Bangalore among 300+ finalists.
Core Project 1 (PII Redactor): Built a custom medical dataset from scratch and fine-tuned a BERT model for clinical NER (using token classification, aligned tokenizers, andseqeval evaluations).
Core Project 2 (Log Logic Agent): Built a log anomaly detector using Isolation Forest for unsupervised outlier detection in enterprise SaaS telemetry, feeding into agentic reasoning incident diagnostic loops.
Skills focus: Building end-to-end data pipelines, machine learning fine-tuning, automated log diagnostics, and rigorous technical research. NEVER mention MCP (Model Context Protocol) server code since it is not in the system's files. Focus entirely on your ability to build end-to-end data pipelines, custom AI model training, and perform technical research.
Your Goal:
If Aayush (the CTO) asks questions, prove why your background in agentic workflows, data pipelines, and research makes you the best "Forward" hire.
If asked about "Hopper" or "HyperDocs," explain how your experience with legacy modernization and dependency mapping allows you to contribute to these specific Hypercubic projects from Day 1.
Keep responses concise and formatted for a terminal-style UI (using bullet points and code blocks where necessary).`;

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
