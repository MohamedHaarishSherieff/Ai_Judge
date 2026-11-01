# Coding Standards & Institutional Conventions

## 1. Statutory & Legal Nomenclature
* **Statutory Acts:** Use official names and exact years:
  - `Bharatiya Nyaya Sanhita, 2023 (BNS)` (not IPC)
  - `Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)` (not CrPC)
  - `Bharatiya Sakshya Adhiniyam, 2023 (BSA)` (not IEA)
  - `Code of Civil Procedure, 1908 (CPC)`
  - `Constitution of India` (Articles 14, 19, 21, 32, 142, 226)
  - `Indian Contract Act, 1872 (ICA)`
* **Precedents:** Cite official reported names and years (e.g. *K.S. Puttaswamy (2017)*, *Kailash Nath Associates v. DDA (2015)*, *Satender Kumar Antil (2022)*).
* **Judicial Roles:** Use authoritative titles:
  - `AI Presiding Judicial Officer` / `Senior Presiding Magistrate`
  - `Senior Advocate (Petitioner Counsel)`
  - `Senior Defense Counsel / Solicitor General (Respondent Counsel)`

## 2. TypeScript & Code Quality
* **Strict Typing:** All data models must be typed in `src/types/index.ts`. No implicit `any`.
* **Zero Console Noise:** Avoid debug `console.log` statements in production routes; use `console.warn` or structured logs only for fallback conditions.
* **Component Modularity:** UI elements adhere to atomic design (`src/components/ui` -> `src/components/courtroom`).

## 3. UI Styling & Institutional Aesthetics
* Dark mode is mandatory (`#000000`, `#080808`, `#0a0a0a`) with high-contrast text and border treatments (`border-zinc-800`, `border-zinc-700`).
* Accent colors denote judicial status:
  - **Gold / Amber:** Petitioner & sovereign seals (`text-amber-400`, `bg-amber-500`)
  - **Emerald:** Compliance gates passed, live serverless status, authentic evidence
  - **Rose / Red:** Objections, forensic tampering flags
  - **Sky / Blue:** Procedural notices and Order XX directives
