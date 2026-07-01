import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CustomCursor } from "@/components/custom-cursor";
import { DepthMeter } from "@/components/depth-meter";
import { MicrosoftClarity } from "@/components/microsoft-clarity";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anushka Pandhere | AI Engineer",
  description:
    "Anushka Pandhere — Forward Software Engineer & AI Builder. Agentic AI, LogLogic, BERT fine-tuning, and production software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", geistSans.variable, geistMono.variable)}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="antialiased bg-black text-zinc-400 selection:bg-zinc-800 selection:text-zinc-100 overflow-x-hidden font-sans">
        {/* Global organic noise texture overlay */}
        <div className="noise-overlay" />

        {/* Global layout scroll tracker */}
        <DepthMeter />

        {children}

        {/* Interactive Custom Cursor */}
        <CustomCursor />

        <MicrosoftClarity />
      </body>
    </html>
  );
}
