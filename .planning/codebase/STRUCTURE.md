# Codebase Structure

```
Ai_Judge/
├── .planning/                  # GSD Project Management & Execution Memory
│   ├── config.json             # GSD Configuration
│   ├── PROJECT.md              # Vision, Hackathon Target & Architecture
│   ├── REQUIREMENTS.md         # Traceable Statutory & Technical Requirements
│   ├── ROADMAP.md              # Milestones & Phase Progress
│   ├── STATE.md                # Real-time Execution Health & Blocking Log
│   ├── codebase/               # Deep Architecture & Stack Documents
│   │   ├── STACK.md
│   │   ├── INTEGRATIONS.md
│   │   ├── ARCHITECTURE.md
│   │   ├── STRUCTURE.md
│   │   ├── CONVENTIONS.md
│   │   ├── TESTING.md
│   │   └── CONCERNS.md
│   └── onboarding/
│       └── SUMMARY.md          # Onboarding Synthesis
├── app/                        # Next.js App Router Pages & API Endpoints
│   ├── api/
│   │   └── courtroom/
│   │       └── modal-stream/   # Unified Orchestrator (Baseten + Modal)
│   ├── cases/                  # Case Management & Docket System
│   ├── dashboard/              # Institutional Metrics & Bench Status
│   ├── evidence/               # Evidence Vault & Custody Logs
│   ├── text-courtroom/
│   │   ├── [id]/               # Primary Virtual Courtroom Bench Interface
│   │   └── page.tsx            # Docket Router
│   ├── video-courtroom/        # Video Bench Interface
│   ├── globals.css             # Theme & Tailored Typography
│   └── layout.tsx              # Root Layout with Ashoka Lion Emblem
├── modal_backend/              # Serverless Python Legal Engine
│   └── legal_engine.py         # Modal App & Interest/Decree Microservices
├── public/                     # Sovereign Badges, Emblems & Assets
├── src/
│   ├── components/
│   │   ├── courtroom/          # Chat, Video, and Forensic Evidence Components
│   │   ├── layout/             # Navbar, Footer, Disclaimer
│   │   └── ui/                 # Institutional Buttons, Modals, Cards, Badges
│   ├── data/
│   │   └── mockData.ts         # High Court & Supreme Court Pre-loaded Dockets
│   ├── lib/
│   │   ├── baseten/            # Baseten Muse Spark Open API Client
│   │   └── modal/              # Modal Cloud SDK Integration
│   └── types/
│       └── index.ts            # Core TypeScript Interfaces (Case, Evidence, Message)
├── package.json                # Dependencies & Build Toolchain
└── tsconfig.json               # TypeScript Compiler Configuration
```

