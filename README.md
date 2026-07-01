# [ANUSHKA_CORE v1.0] // Personal Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/Status-Deployment--Ready-059669?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Intelligence-Llama--3.1--70B-3b82f6?style=for-the-badge" alt="Intelligence" />
  <img src="https://img.shields.io/badge/Aesthetic-Cinematic--HUD-27272a?style=for-the-badge" alt="Theme" />
</div>

<br />

<div align="center">
  <h3>
    <a href="https://why-anushka.vercel.app/">View Live Portfolio →</a>
  </h3>
</div>

---

## Overview
**`ANUSHKA_CORE`** is a high-fidelity, interactive personal portfolio. Moving beyond the limitations of a static PDF, this project serves as a live demonstration of **Forward Software Engineering**—bridging the gap between AI research (LLMs/Agents) and production-grade product delivery.

It was **vibecoded** to demonstrate velocity, architectural vision, and engineering depth across agentic systems and ML pipelines.

---

## Core Modules

### 1. The AI Core // Intelligence Layer
Powered by **Llama 3.1 (via Groq)**, the AI Resume Assistant answers questions about skills, projects, and education. It is hardened against prompt injection and grounded in portfolio data.
- **Context:** BERT fine-tuning, Isolation Forest logic, and technical research.
- **Tone:** No-BS, engineering-first, opinionated.

### 2. The Operational HUD // Visual Logic
A premium, dark-mode dashboard inspired by industrial Heads-Up Displays (HUDs).
- **Cinematic Preloader:** A high-speed boot sequence with scramble-text reveal.
- **Live Redaction Demo:** Visual simulation of the **PII Redactor** logic, showcasing real-time scanning and redaction effects.
- **Scroll Navigation:** Left-side drawing-line HUD tracking About, Experience, Education, and Projects.

### 3. Virtual File System // Technical Proofs
A command-line interface (CLI) to explore actual project architecture:
- `fine-tuning.py`: Custom BERT training logic for clinical datasets.
- `anomaly-detector.py`: Unsupervised outlier detection using Isolation Forest.
- `achievements_manifest.log`: Verified records of SIH 2nd Place, SheCodes Finalist, and STEM Research Publication.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **AI Inference** | Groq SDK (Llama 3.1 70B Versatile) |
| **Motion** | Framer Motion (Hardware-accelerated) |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Typography** | Geist Sans & Geist Mono |

---

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/PandhereAnu10/why-anushka.git


2. **Configure Environment Variables**
    Create a ```.env.local``` file and add your Groq API Key:
    
    ```
   GROQ_API_KEY=your_gsk_key_here
   ```


3. **Initialize System**
   ```bash
   npm run dev
   ```
