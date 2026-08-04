# Website Foundations High-Level Module Map

**Status:** Locked. Audited line by line against the Completion Standard - the audit found three evidence items (§2.4/§3.4: protecting unrelated work during a change, identifying exposed secrets or API-key placement, correcting polished-but-goal-failing output) that did not yet trace to a module, and Modules 4 and 5 below now name them explicitly. Every other §2/§3 evidence item and all three checkpoints trace cleanly. Approved August 4, 2026.
**Program:** Website Foundations
**Derived from:** [`docs/website-foundations-completion-standard.md`](website-foundations-completion-standard.md) (Locked)
**Purpose:** Define the module-level structure of Website Foundations — one cumulative outcome per module, the completion evidence it produces, and where the three required human-review checkpoints occur — before any chapter, lesson, quiz, or project content is written.

This document does not contain lessons, a chapter count, quizzes, or project instructions. Per the Completion Standard's Curriculum Derivation Rule, every module below exists only because it produces one or more required artifacts, judgments, or demonstrations named in that standard. Section 4 traces each module back to the exact evidence item it produces, so the mapping can be audited line by line.

---

## 1. How to Read This Map

Each module defines:

1. **Cumulative capability** — the one thing the student can do after this module that they could not do before.
2. **Completion Standard evidence produced** — the exact §2/§3 items from the Completion Standard.
3. **Guided Build-Along evidence**
4. **Coursework-Only evidence**
5. **Earlier knowledge and habits reused** — nothing is taught once and forgotten.
6. **Scaffolding level** — support is high early and fades as competence grows.
7. **Review checkpoint** — whether one of the three locked checkpoints occurs at the end of this module.
8. **What the student can demonstrably do after** — a plain, honest capability statement.

---

## 2. Module Sequence Overview

| # | Module | Checkpoint |
|---|---|---|
| 1 | Program Orientation, Path Selection, and the First Plan Entry | — |
| 2 | Planning Before Prompting | **Checkpoint 1 — Plan/Blueprint Approval** |
| 3 | Tool Selection and Directing AI With Control | — |
| 4 | Architecture and the Shared Foundation | **Checkpoint 2 — Architecture/File-Map Checkpoint** |
| 5 | Building Pages With Purpose | — |
| 6 | Responsive, Accessible, and Working | — |
| 7 | Testing, Defects, and Recovery | — |
| 8 | Publishing the Website | — |
| 9 | Structured Explanation and Final Completion Review | **Checkpoint 3 — Final Completion Review** |

Nine modules, within the approximately seven-to-nine range set for this map. The count follows from the evidence, not the other way around.

---

## 3. Modules

### Module 1 — Program Orientation, Path Selection, and the First Plan Entry

**Cumulative capability:** Understand exactly what Website Foundations does and does not teach, choose Guided Build-Along or Coursework-Only, and open the first Build Plan or Learning Plan entry.

**Completion Standard evidence produced:** None yet — this module establishes the conditions the rest of the evidence depends on (§2.1/§3.1 begin here but are not complete).

**Guided evidence:** A started Build Plan entry — working title, initial purpose, and why the student enrolled.

**Coursework evidence:** A started Learning Plan entry with the same initial content.

**Earlier knowledge and habits reused:** None — this is the entry point. It establishes the plan-before-prompting habit that every later module reuses.

**Scaffolding level:** Highest. Fully worked examples, no independent judgment required yet.

**Review checkpoint:** None.

**What the student can demonstrably do after:** Explain the program's boundaries, explain that the platform itself was vibe coded, state which path they chose and why, and point to a first plan entry that exists.

---

### Module 2 — Planning Before Prompting

**Cumulative capability:** Turn a website idea into a realistic, bounded first-version plan before any building or prompting begins.

**Completion Standard evidence produced:** §2.1 Website Build Plan (complete) / §3.1 Complete Website Blueprint.

**Guided evidence:** A complete Build Plan — purpose, problem, audience, main visitor outcome, required pages, primary user flow, first-version boundaries, deliberately excluded features, visual direction, major content requirements, and an initial file/responsibility plan.

**Coursework evidence:** A complete blueprint covering the same items, since Coursework-Only follows §3.1 in parallel.

**Earlier knowledge and habits reused:** The plan entry opened in Module 1.

**Scaffolding level:** High. One complete worked example of a bounded plan, then the student produces their own.

**Review checkpoint:** **Checkpoint 1 — Plan or Blueprint Approval (§4.1).** Occurs at the end of this module, before substantial building or later cumulative architecture work, exactly as required.

**What the student can demonstrably do after:** Present a plan a reviewer can approve — one that states what the first version will and will not do, and why.

---

### Module 3 — Tool Selection and Directing AI With Control

**Cumulative capability:** Choose tools appropriate to a basic website, and give AI a focused, controlled instruction rather than accepting its first answer.

**Completion Standard evidence produced:** Begins §2.4 Evidence of Controlled AI Use / §3.3 Tool-Selection Reasoning and the first §3.4 Controlled-AI Exercise.

**Guided evidence:** At least one focused prompt tied to a specific page or problem, plus the first documented example of rejected or corrected AI output.

**Coursework evidence:** Written tool-selection reasoning (why a basic website does not need a database, authentication, or an unrelated framework) plus the first controlled-AI exercise — improving a vague prompt.

**Earlier knowledge and habits reused:** The approved plan from Module 2, used as the context given to AI.

**Scaffolding level:** High, with the first weak-vs-controlled-prompt worked example. This is the earliest point flawed AI output can be meaningfully inspected, since it requires a plan to judge output against.

**Review checkpoint:** None.

**What the student can demonstrably do after:** Write a prompt that states the goal, the exact file or page, and what must remain unchanged — and recognize at least one category of bad AI output on sight.

---

### Module 4 — Architecture and the Shared Foundation

**Cumulative capability:** Establish a modular project structure — one page per file, shared design tokens, clear route ownership — before the project grows to many pages.

**Completion Standard evidence produced:** §2.3 Modular Project Structure (initial) / §3.2 Proposed Modular File Map, plus continued §3.4 exercises correcting monolithic or duplicated architecture and identifying exposed secrets or inappropriate API-key placement.

**Guided evidence:** The shared foundation (tokens, shared styles, routing) and the first real page built on it, with no monolithic `App.tsx` and no mixed responsibilities.

**Coursework evidence:** A proposed modular file map naming every page, shared component, route, and style responsibility, plus early architecture-correction exercises and an exercise identifying where a secret or API key was placed where it does not belong.

**Earlier knowledge and habits reused:** The plan (Module 2) that defines which pages are needed; the controlled-AI habits (Module 3) used to direct the build.

**Scaffolding level:** Moderate — the student makes real architecture decisions with support close at hand.

**Review checkpoint:** **Checkpoint 2 — Architecture or File-Map Checkpoint (§4.2).** For Guided, this occurs once the shared foundation and first meaningful page exist, but before the project multiplies into many pages. For Coursework, it occurs once the proposed file map and early correction exercises are complete, before later cumulative evidence is built on them — matching the standard exactly.

**What the student can demonstrably do after:** Explain why each major file exists, and show a foundation a reviewer can approve before it is built on further.

---

### Module 5 — Building Pages With Purpose

**Cumulative capability:** Apply the approved foundation to build out the required pages by reusing shared patterns, rejecting scope creep, and correcting AI when it duplicates instead of reusing.

**Completion Standard evidence produced:** Continues §2.2 (working pages) and §2.3 (no duplicated structures); adds the required §2.4 documented scope-control decision, documented architecture correction, and evidence that unrelated working behavior was protected during a change. Coursework continues §3.4 with duplicated-styles, scope-creep, protecting-existing-work, and polished-but-goal-failing-output exercises.

**Guided evidence:** The homepage plus at least two additional purposeful pages, built on the shared foundation, with one documented scope-control decision, one documented architecture correction, and one documented instance where unrelated working behavior was explicitly protected while making a change.

**Coursework evidence:** Correction exercises covering duplicated CSS or components, AI-introduced scope creep, protecting existing work during a change, and a page that looks finished but fails the stated user goal — all evaluated against the Module 2 plan.

**Earlier knowledge and habits reused:** The foundation from Module 4; the plan boundaries from Module 2, used as the standard against which scope creep is rejected.

**Scaffolding level:** Reduced — the student is expected to catch duplication and scope creep with less prompting.

**Review checkpoint:** None.

**What the student can demonstrably do after:** Show a multi-page site where pages share patterns instead of duplicating them, and explain one thing they deliberately kept out of the first version.

---

### Module 6 — Responsive, Accessible, and Working

**Cumulative capability:** Make the website work correctly across desktop, tablet, and mobile, with accessible labels, headings, focus states, and contrast.

**Completion Standard evidence produced:** Completes §2.2's responsive and accessibility requirements. Coursework produces the responsive and accessibility sections of the §3.5 Testing Plan and continues §3.4 with missing-mobile-behavior and broken-control exercises.

**Guided evidence:** A site verified across all three breakpoints, with working controls, valid heading structure, visible focus states, and readable contrast.

**Coursework evidence:** Written testing-plan sections covering the same items, plus corrections to AI output that broke mobile behavior or accessibility.

**Earlier knowledge and habits reused:** The pages built in Module 5, now tested and corrected rather than assumed to work.

**Scaffolding level:** Low — independent correction is expected, with support available on request.

**Review checkpoint:** None.

**What the student can demonstrably do after:** Test their own site across breakpoints and input methods and fix what they find, without being told exactly what is broken first.

---

### Module 7 — Testing, Defects, and Recovery

**Cumulative capability:** Run a real testing pass that finds and fixes at least one defect, and demonstrate — not just describe — recovering from a broken change using GitHub.

**Completion Standard evidence produced:** §2.5 GitHub Repository and Recovery Evidence, §2.6 Testing Record / §3.5 required defect walkthrough, §3.6 GitHub and Recovery Scenarios.

**Guided evidence:** A testing record with at least one real defect found, corrected, and retested; a GitHub history with meaningful commits; a documented recovery action — stable commit, a change that breaks something, a revert or restore, and confirmation the restored project works.

**Coursework evidence:** A full written defect walkthrough (what is observed, how it reproduces, what file to inspect, what must stay unchanged, how the fix is tested, how a failed fix would be recovered) plus GitHub/recovery scenarios.

**Earlier knowledge and habits reused:** Everything built in Modules 4–6 becomes the subject under test; the scope-control and architecture-correction habits from Module 5 are reused when a fix is proposed.

**Scaffolding level:** Low, except the recovery demonstration gets one full worked example first, since it is high-stakes and must be shown, not assumed.

**Review checkpoint:** None of the three named checkpoints, but this module produces evidence the Final Completion Review depends on.

**What the student can demonstrably do after:** Point to a specific commit where something broke and a specific commit where it was fixed, and explain how they know the fix worked.

---

### Module 8 — Publishing the Website

**Cumulative capability:** Take the finished project to a successful production build and a public deployment, then compare the result against the original plan.

**Completion Standard evidence produced:** §2.7 Published Website.

**Guided evidence:** A successful production build, a public deployment (Vercel primary, Railway as the approved alternative), live-version testing, correction of any deployment-specific problems, and a final comparison against the Module 2 Build Plan.

**Coursework evidence:** Since Coursework-Only does not require publishing, this module instead produces a written explanation of the deployment process and what a reviewer would check on a live version — reasoning, not execution.

**Earlier knowledge and habits reused:** The testing habits from Module 7, now applied to the live version; the Module 2 plan, used as the yardstick for the final comparison.

**Scaffolding level:** Low for Guided — independent execution using the deployment guides in `docs/deployment/` for support. Coursework continues independent written analysis.

**Review checkpoint:** None directly, but this module's evidence feeds Checkpoint 3.

**What the student can demonstrably do after:** Guided students have a live public URL that works; Coursework students can explain what "done" looks like for a deployed site.

---

### Module 9 — Structured Explanation and Final Completion Review

**Cumulative capability:** Explain the finished project's decisions in the student's own words, and pass the Final Completion Review against every required item.

**Completion Standard evidence produced:** §2.8 / §3.7 Structured Final Explanation; the review itself is §4.3.

**Guided evidence:** Answers to all six structured questions (what it does, who it serves, what was excluded, what AI got wrong, what was corrected and why, what would improve later), specific to the completed project.

**Coursework evidence:** Answers to the parallel six questions, specific to the completed blueprint and exercises.

**Earlier knowledge and habits reused:** All of it — this module is the cumulative outcome of every module before it.

**Scaffolding level:** Lowest. The explanation must be independent and specific; generic answers do not satisfy it.

**Review checkpoint:** **Checkpoint 3 — Final Completion Review (§4.3).** The reviewer checks the plan, page count, responsiveness, modular structure, controlled-AI evidence, GitHub history, recovery evidence, testing record, deployment, the structured explanation, and the accuracy of the completion claim.

**What the student can demonstrably do after:** Be told, honestly: "You can now plan, build, organize, test, and publish a professional responsive website with AI assistance."

---

## 4. Traceability to the Completion Standard

| Module | Guided evidence (§2) | Coursework evidence (§3) |
|---|---|---|
| 1 | Plan opened (pre-§2.1) | Learning Plan opened (pre-§3.1) |
| 2 | §2.1 | §3.1 |
| 3 | §2.4 (begins) | §3.3, §3.4 (begins) |
| 4 | §2.3 (begins) | §3.2, §3.4 (continues) |
| 5 | §2.2 (pages), §2.3, §2.4 (scope + architecture correction) | §3.4 (continues) |
| 6 | §2.2 (responsive + accessible) | §3.5 (partial), §3.4 (continues) |
| 7 | §2.5, §2.6 | §3.5 (defect walkthrough), §3.6 |
| 8 | §2.7 | — (reasoning only; Coursework does not publish) |
| 9 | §2.8 | §3.7 |

Checkpoints: §4.1 → end of Module 2. §4.2 → end of Module 4. §4.3 → Module 9.

The recurring flawed-AI-output requirement (§5 of the Completion Standard) is not a single module — it appears starting in Module 3 and recurs in Modules 4 through 8, matched to whichever category is relevant to what the student is building at that point, per the "early and often" rule.

---

## 5. What This Map Does Not Decide

Consistent with the README's open-decisions list, this map does not set:

- The exact chapter count within each module
- The approved Guided website project catalog or default project
- Check Your Understanding question content
- Chapter-level pacing or word count
- Anything about later, separately gated programs

The preferred-AI-tool question is already resolved separately (README §13.1): Website Foundations names no default tool, so it is not one of this map's open items.

Those are the next decisions, not this one, and none of them are implied by this map being approved.

---

## 6. Next Steps

Per the README's Next Planning and Build Phase, now that this map is audited and approved:

1. Choose the small Guided website project catalog and default project.
2. Divide approved modules into focused chapters.
3. Define the practical action and Check Your Understanding activity for each chapter.
4. Build one complete pilot module and observe real beginners using it before scaling the pattern to the rest of the program.

Frontend platform work — including the authenticated Student App Shell — may begin using this map's module and checkpoint structure once it is approved, using placeholder data only and no invented backend behavior.
