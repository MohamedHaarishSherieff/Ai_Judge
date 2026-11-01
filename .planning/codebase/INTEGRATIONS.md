# External & AI Model Integrations

## 1. Baseten Muse Spark Open Integration
* **Client File:** `src/lib/baseten/museClient.ts`
* **Route Handler:** `app/api/courtroom/modal-stream/route.ts`
* **Model ID:** `meta-models/muse-spark-open-1026`
* **Configuration:**
  - `reasoning_effort`: `'low'` (Prevents reasoning token starvation)
  - `temperature`: `0.5`
  - `max_tokens`: `4000`
* **Features:**
  - Full jurisdictional role prompting (Constitutional Supreme Court, Criminal Sessions, Civil District, Commercial Division)
  - Extraction and isolation of `<think>` tags into `reasoning_content`
  - Precedent citation regex extractor

## 2. Meta SAM 3.1 Forensics Integration
* **Component File:** `src/components/courtroom/ForensicEvidenceViewer.tsx`
* **Model ID:** `meta/sam-3.1`
* **Features:**
  - Multimodal pixel-level segmentation mask generation
  - Identification of altered notary stamps and ink strokes
  - Section 63 BSA compliance rating (Authentic / Suspicious / Tampered)

## 3. Modal Cloud Serverless Engine
* **Client File:** `src/lib/modal/legalClient.ts`
* **Backend File:** `modal_backend/legal_engine.py`
* **Methods:**
  - `simulateTrialTurnOnModal`: Fallback serverless courtroom simulation
  - `synthesizeDecreeOnModal`: Order XX CPC decree calculation and cryptographic seal creation
  - `calculateInterestOnModal`: Section 34 CPC statutory quarterly compounding interest
  - `verifyEvidenceOnModal`: SHA-256 hash digest generator and chain-of-custody verifier

