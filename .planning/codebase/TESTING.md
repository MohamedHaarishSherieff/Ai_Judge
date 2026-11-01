# Testing & Verification Protocols

## 1. Type Checking & Compilation
* Primary verification gate:
  ```bash
  npx tsc --noEmit
  ```
  Must exit with code `0` before any pull request or deployment.

## 2. Statutory Admissibility Verification (Section 63 BSA Gate)
* All electronic evidence submitted must satisfy:
  1. Deterministic SHA-256 hash generation
  2. Timestamp and chain-of-custody logging
  3. SAM 3.1 segmentation check confirming seal and signature authenticity

## 3. Deliberation Separation Verification
* Simulated courtroom turns must undergo:
  1. `cleanCourtroomArgument` parsing to verify zero scratchpad or sentence-counting tokens leak into the argument text.
  2. Isolation of `<think>` blocks into the dedicated legal deliberation accordion.

## 4. Decree Determinism Verification
* All financial decree awards must be deterministically computable:
  - Principal + Statutory Interest (quarterly compounding) + Taxed Costs == Total Enforceable Sum.
