# System Architecture & Design Patterns

## Overview
AI Judge is designed as an institutional, low-latency, hybrid edge-and-cloud architecture tailored for sovereign judicial environments.

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 Web Client                    │
│  - Virtual Courtroom ([id]/page.tsx)                        │
│  - Forensic Evidence Viewer (SAM 3.1 Mask Overlays)         │
│  - Order XX Decree Synthesis Modal                          │
└──────────────┬───────────────────────────────▲──────────────┘
               │                               │
               ▼ JSON API                      │ JSON Stream
┌──────────────────────────────────────────────┴──────────────┐
│       Next.js API Orchestrator (/api/courtroom/modal-stream) │
└──────┬───────────────────────────────┬──────────────────────┘
       │                               │
       ▼ Primary Reasoning             ▼ Cloud Backend
┌──────────────────────────────┐ ┌──────────────────────────────┐
│     Baseten Inference API    │ │     Modal Cloud Serverless   │
│  - Meta Muse Spark Open 1026 │ │  - Deterministic Math Engine │
│  - Dynamic Role Prompts      │ │  - Sec 74 ICA Mitigation     │
│  - Precedent Extraction      │ │  - SHA-256 Seal Digest       │
└──────────────────────────────┘ └──────────────────────────────┘
```

## Design Patterns & Separation of Concerns
1. **Adversarial Orchestration Pattern:**
   - The courtroom turns follow the adversarial tripartite model: Petitioner Senior Counsel -> Respondent Senior Counsel -> Presiding Bench Officer.
   - Each turn receives the full cumulative courtroom transcript history to ensure coherent cross-examination and rebuttal.
2. **Meta Trustworthy Legal Agent Pattern:**
   - The platform strictly separates **legal deliberation** (Chain of Thought) from **operative oral pronouncements**.
   - No decree is synthesized without passing the automated **Statutory Verification Checklist Gate** (`verify_checklist`).
3. **Graceful Fallback & Resilience:**
   - The Next.js API orchestrator attempts live inference via Baseten's 2M/min endpoint first.
   - If network or provider failure occurs, it seamlessly degrades to the Modal Serverless Legal Engine, ensuring zero bench interruption.
