"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, FileText, Cpu, X, Book, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileViewerProps {
  fileName: string;
  onClose: () => void;
}

export function FileViewer({ fileName, onClose }: FileViewerProps) {
  const getFileContent = () => {
    switch (fileName.toLowerCase().trim()) {
      case "achievements_manifest.log":
        return {
          title: "achievements_manifest.log",
          icon: <Trophy className="size-8 text-yellow-500 shrink-0" />,
          subtitle: "DECRYPTING: Credentials & Hackathon Ledger",
          status: "Verified Log",
          description: "Anushka Pandhere's core research publications and hardware-software prototype awards.",
          visual: (
            <div className="space-y-3 my-3">
              {/* Publication Card */}
              <div className="border border-zinc-800 bg-zinc-900/30 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start gap-3 relative overflow-hidden group hover:border-blue-500/20 transition-colors">
                <div className="size-8 rounded bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Book className="size-4" />
                </div>
                <div className="flex-1 space-y-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">[01] Research Publication</span>
                    <Badge variant="outline" className="font-mono text-[8px] border-blue-500/30 text-blue-400 bg-blue-950/20 select-none w-fit">
                      Scientific Publication
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200">&quot;Duty Monitor: Monitoring System using NFC&quot;</h4>
                  <p className="text-[10px] text-zinc-400 font-sans">Role: Lead Author & Presenter at STEM Conf. 2024. Demonstrates technical research depth and systems engineering rigor.</p>
                </div>
              </div>

              {/* SIH Card */}
              <div className="border border-zinc-800 bg-zinc-900/30 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start gap-3 relative overflow-hidden group hover:border-emerald-500/20 transition-colors">
                <div className="size-8 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Leaf className="size-4" />
                </div>
                <div className="flex-1 space-y-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">[02] Hackathon 2nd Place</span>
                    <Badge variant="outline" className="font-mono text-[8px] border-emerald-500/30 text-emerald-400 bg-emerald-950/20 select-none w-fit">
                      Atharva SIH
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200">Project: AgDew</h4>
                  <p className="text-[10px] text-zinc-400 font-sans">Built &apos;AgDew&apos;, an AI-driven agriculture device for real-time monitoring. Proves hardware-integrated AI engineering capabilities under tight constraints.</p>
                </div>
              </div>

              {/* SheCodes Card */}
              <div className="border border-zinc-800 bg-zinc-900/30 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start gap-3 relative overflow-hidden group hover:border-yellow-500/20 transition-colors">
                <div className="size-8 rounded bg-yellow-950/40 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                  <Trophy className="size-4" />
                </div>
                <div className="flex-1 space-y-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">[03] Hackathon Finalist</span>
                    <Badge variant="outline" className="font-mono text-[8px] border-yellow-500/30 text-yellow-400 bg-yellow-950/20 select-none w-fit">
                      SheCodes 2024
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200">Team Leader // Bangalore</h4>
                  <p className="text-[10px] text-zinc-400 font-sans">Led a top engineering team in Bangalore among 300+ finalists in high-pressure rapid prototyping.</p>
                </div>
              </div>
            </div>
          )
        };

      case "fine-tuning.py":
        return {
          title: "fine-tuning.py",
          icon: <FileText className="size-8 text-emerald-500 shrink-0" />,
          subtitle: "ACCESSING MODULE: Custom BERT NER Model Fine-Tuning Setup",
          status: "Active Script",
          description: "Key Logic: Custom labeling logic: handled 100% of medical entity annotation for no-leakage clinical NER.",
          visual: (
            <div className="border border-emerald-500/20 bg-zinc-950 p-3 rounded-lg my-3 overflow-x-auto max-h-[160px] sm:max-h-[220px]">
              <pre className="font-mono text-[10px] text-zinc-300 leading-normal">
                {`# Custom labeling logic: handled 100% of medical entity annotation for no-leakage clinical NER.
from transformers import AutoModelForTokenClassification, Trainer, TrainingArguments, DataCollatorForTokenClassification
from datasets import load_dataset
import numpy as np

id2label = {i: l for i, l in enumerate(label_list)}
label2id = {l: i for i, l in enumerate(label_list)}

model = AutoModelForTokenClassification.from_pretrained(
    "dslim/bert-base-NER",
    num_labels = len(label_list),
    id2label = id2label,
    label2id = label2id,
    ignore_mismatched_sizes = True
)

# Load telehealth datasets
hf_dataset = load_dataset('csv', data_files='clinical_pii_custom_v3.csv')

def tokenize_and_align_labels(examples):
  tokenized = tokenizer(examples["tokens"], truncation=True, is_split_into_words=True)
  all_labels = []
  for i, labels in enumerate(examples["ner_tags"]):
    word_ids = tokenized.word_ids(batch_index=i)
    aligned=[]
    prev_word = None
    for word_id in word_ids:
      if word_id is None:
        aligned.append(-100)
      elif word_id != prev_word:
        aligned.append(labels[word_id])
      else:
        aligned.append(-100)
      prev_word = word_id
    all_labels.append(aligned)
  tokenized["labels"] = all_labels
  return tokenized

tokenized_dataset = hf_dataset.map(tokenize_and_align_labels, batched=True)

args = TrainingArguments(
    output_dir="telehealth-pii-redactor",
    eval_strategy="epoch",
    learning_rate=2e-5,
    num_train_epochs=3,
    weight_decay=0.01,
    load_best_model_at_end=True,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["validation"],
    data_collator=DataCollatorForTokenClassification(tokenizer),
    compute_metrics=compute_metrics
)

trainer.train()
model.push_to_hub("PandhereAnu/telehealth-pii-redactor")`}
              </pre>
            </div>
          )
        };

      case "anomaly-detector.py":
        return {
          title: "anomaly-detector.py",
          icon: <Cpu className="size-8 text-blue-500 shrink-0" />,
          subtitle: "ACCESSING: Log Logic Anomaly Engine. Logic: Utilized Isolation Forest for unsupervised outlier detection in enterprise SaaS logs to trigger agentic reasoning loops.",
          status: "Active Script",
          description: "Logic: Utilized Isolation Forest for unsupervised outlier detection in enterprise SaaS logs to trigger agentic reasoning loops.",
          visual: (
            <div className="border border-blue-500/20 bg-zinc-950 p-3 rounded-lg my-3 overflow-x-auto max-h-[160px] sm:max-h-[220px]">
              <pre className="font-mono text-[10px] text-zinc-300 leading-normal">
                {`import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.feature_extraction.text import TfidfVectorizer

def detect_anomalies(df):
    """Use Isolation Forest to find suspicious logs"""
    if len(df) < 10:
        return df
    
    vectorizer = TfidfVectorizer(max_features=50)
    X = vectorizer.fit_transform(df['message'])
    
    # Initialize model and fit unsupervised outliers on SaaS telemetry logs
    detector = IsolationForest(contamination=0.1, random_state=42)
    df['anomaly'] = detector.fit_predict(X)
    suspicious_logs = df[df['anomaly'] == -1].copy()
    
    print(f"Found {len(suspicious_logs)} suspicious logs out of {len(df)}")
    return suspicious_logs

# ============================================================
# LLM ANALYSIS
# ============================================================
def analyze_logs_with_llm(suspicious_logs):
    """Agentic analysis with chain-of-thought"""
    log_summary = suspicious_logs[['timestamp', 'level', 'service', 'message']].to_string()
    
    prompt = f"""You are a Senior SRE investigating a system incident. Analyze incident logs:
{log_summary}
Think step-by-step to identify patterns, generate hypotheses, and conclude root causes."""

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
        temperature=0.3
    )
    return response.choices[0].message.content

# ============================================================
# MAIN AGENT LOOP
# ============================================================
def loglogic_agent(log_dataframe):
    """Complete agentic diagnostic agent"""
    print("LogLogic Agent Starting...")
    suspicious = detect_anomalies(log_dataframe)
    if len(suspicious) == 0:
        return {"status": "healthy"}
        
    diagnosis = analyze_logs_with_llm(suspicious)
    return {"diagnosis": diagnosis}`}
              </pre>
            </div>
          )
        };

      default:
        return null;
    }
  };

  const content = getFileContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-[101] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-lg p-4 sm:p-6 relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Scanning scanning overlay lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-3">
          <div className="flex items-center space-x-3">
            {content.icon}
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-bold text-zinc-100">{content.title}</h3>
              <p className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                Status: {content.status}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 border border-zinc-900 rounded p-1 hover:bg-zinc-900 cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Subtitle / Decryption logs */}
        <div className="font-mono text-[10px] sm:text-xs text-emerald-400 bg-emerald-950/10 border border-emerald-500/10 p-2 sm:p-3 rounded mb-3">
          {content.subtitle}
        </div>

        {/* Text descriptions */}
        <p className="font-sans text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
          {content.description}
        </p>

        {/* The Achievement Visualizer / Code syntax frame */}
        {content.visual}

        {/* Close Connection Footer button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="font-mono text-[9px] sm:text-[10px] tracking-wider border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 px-3 py-1.5 rounded-md hover:border-zinc-600 cursor-pointer"
          >
            [CLOSE_STREAM // BACK_TO_TERMINAL]
          </button>
        </div>
      </motion.div>
    </div>
  );
}
