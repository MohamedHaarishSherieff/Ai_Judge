# Statutory & Technical Requirements Matrix

## 1. Statutory Compliance Requirements (Indian Jurisprudence)

| Requirement ID | Statute & Provision | Implementation Mechanism | Status |
| :--- | :--- | :--- | :--- |
| **REQ-STAT-01** | **Bharatiya Sakshya Adhiniyam, 2023 (BSA § 63)** | Electronic records admissibility: SHA-256 certificate validation, continuous chain-of-custody, and SAM 3.1 seal segmentation. | **VERIFIED** |
| **REQ-STAT-02** | **Constitution of India (Articles 14, 19, 21, 32, 142)** | Constitutional Writ Bench simulation: Proportionality review, fundamental rights enforcement, and plenary procedural directives. | **VERIFIED** |
| **REQ-STAT-03** | **Bharatiya Nyaya Sanhita, 2023 (BNS § 103, § 61)** & **BNSS (§ 480)** | Criminal Sessions & Bail adjudication: Prima facie chargesheet analysis, triple-test bail criteria, and surety bond condition imposition. | **VERIFIED** |
| **REQ-STAT-04** | **Code of Civil Procedure, 1908 (Order XX & XXXIX)** | Civil Suits & Interim Injunctions: Balance of convenience, prima facie case, status quo preservation, and formal decree pronouncement. | **VERIFIED** |
| **REQ-STAT-05** | **Indian Contract Act, 1872 (§ 74) & Commercial Courts Act, 2015** | Commercial recovery: Strict adherence to *Kailash Nath Associates v. DDA* barring penal forfeiture and enforcing proof of actual loss. | **VERIFIED** |

---

## 2. Technical & AI Architecture Requirements (Meta Models)

| Requirement ID | Target Capability | Technology / Architecture | Status |
| :--- | :--- | :--- | :--- |
| **REQ-AI-01** | **Adversarial Legal Simulation** | Meta **Muse Spark Open** (`meta-models/muse-spark-open-1026`) via Baseten at up to 2M tokens/min. Low reasoning effort (`reasoning_effort: 'low'`) for fast, non-truncating legal argumentation. | **VERIFIED** |
| **REQ-AI-02** | **Legal Deliberation Isolation** | Model Chain-of-Thought deliberation cleanly parsed into a collapsible UI accordion, preventing internal scratchpad leakage. | **VERIFIED** |
| **REQ-AI-03** | **Forensic Evidence Segmentation** | Meta **SAM 3.1** (`meta/sam-3.1`) pixel-level mask segmentation on notary seals, altered signatures, and metadata discrepancies. | **VERIFIED** |
| **REQ-AI-04** | **Deterministic Decree Synthesis** | Modal Cloud Serverless Python Engine (`modal_backend/legal_engine.py`) calculating compounding interest, legal costs, and SHA-256 digests. | **VERIFIED** |
| **REQ-AI-05** | **Statutory Verification Checklist Gate** | Automated 3-stage validation gate based on Meta's official Legal Agent Workshop architecture (`verify_checklist`), blocking decree synthesis on non-compliance. | **VERIFIED** |

---

## 3. UI/UX & User Interface Standards

| Requirement ID | Feature Area | Standard | Status |
| :--- | :--- | :--- | :--- |
| **REQ-UI-01** | **Sovereign Aesthetic** | High-contrast dark theme, gold accents, Ashoka Lion insignia, official court seals, and bilingual nomenclature. | **VERIFIED** |
| **REQ-UI-02** | **Full Jurisdictional Breadth** | Native support for Supreme Court (Constitutional), High Court (Commercial/Appellate), and District/Sessions Courts (Civil/Criminal). | **VERIFIED** |
| **REQ-UI-03** | **Interactive Modals & Vault** | Interactive Forensic Evidence Viewer, Decree Synthesis Modal, Case Information Vault, and Real-time Status Badges. | **VERIFIED** |
| **REQ-UI-04** | **Cross-Platform Accessibility** | Responsive layout supporting mobile, tablet, and ultra-wide courtroom monitors with zero horizontal overflow. | **VERIFIED** |

