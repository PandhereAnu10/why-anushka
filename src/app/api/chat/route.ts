import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";

import { GROQ_MODEL, PORTFOLIO_SYSTEM_PROMPT } from "@/lib/portfolio-data";

const SYSTEM_PROMPT = PORTFOLIO_SYSTEM_PROMPT;

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
      model: GROQ_MODEL,
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
