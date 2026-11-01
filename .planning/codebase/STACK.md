# Technology Stack

## Core Runtime & Frameworks
* **Runtime:** Node.js v20.14.0 (Windows / Linux compatible)
* **Frontend Framework:** Next.js 16.3.2 (App Router with Turbopack)
* **UI Library:** React 19.2.8 / ReactDOM 19.2.8
* **Styling Engine:** Tailwind CSS v4 with `@tailwindcss/postcss`
* **Icons:** Lucide React (`^1.33.0`)
* **Validation:** Zod (`^4.6.7`)
* **Language:** TypeScript 5.x (Strict typechecking enabled)

## Backend & Cloud AI Infrastructure
* **Inference Host 1 (Baseten):**
  - Model: `meta-models/muse-spark-open-1026` (Meta Muse Spark Open)
  - Endpoint: `https://inference.baseten.co/v1`
  - Throughput: Up to 2M tokens/min
  - Capability: Native reasoning with configurable `reasoning_effort` (`low`)
* **Inference Host 2 (Meta SAM):**
  - Model: `meta/sam-3.1` (Segment Anything Model 3.1)
  - Capability: Pixel-level segmentation of forensic document seals and signatures
* **Serverless Backend (Modal Cloud):**
  - Language: Python 3.11+
  - File: `modal_backend/legal_engine.py`
  - Libraries: `modal`, `pydantic`, `hashlib`
  - Capability: Deterministic legal interest calculation and cryptographic SHA-256 seal hashing

