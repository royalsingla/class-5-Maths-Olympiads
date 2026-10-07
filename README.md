# Class 5 Maths Olympiad — Prep Kit

A practice kit for Class 5 (age 10–11) Mathematics Olympiad exams —
SOF‑IMO, Silverzone iOM, Unified Council UIMO, and similar school-level
olympiads. Companion to [Class-4-Maths-Olympiads](https://github.com/royalsingla/Class-4-Maths-Olympiads),
built the same way: syllabus and exam pattern researched first, then a
week-by-week practice plan, topic worksheets, and full-length sample papers.

## Primary target exam

The pattern and worksheets are built against **SOF International Mathematics
Olympiad (IMO), Class 5** — the most widely taken olympiad of this type.
Class 5's syllabus is a direct step up from Class 4: larger numbers
(7–8 digits), plus new topics — percentage, ratio & proportion, and an
introduction to profit/loss and simple interest. Topic overlap with
Silverzone iOM and Unified Council UIMO is mapped out in
[`docs/01-syllabus.md`](docs/01-syllabus.md).

## Repository layout

```
docs/
  01-syllabus.md         Full topic-wise syllabus, section by section
  02-exam-pattern.md     Marks, timing, levels, negative marking, cutoffs
  03-practice-plan.md    12-week schedule: what to practice, and when
assignments/
  README.md              Naming convention + full topic list (Weeks 1–11)
  01-number-sense/ … 11-achievers-hots/   11 topic worksheets, each with an answer key
  12-achievers-level2/ … 15-geometry-level2/   Level‑2 topic worksheets (harder, for Round‑1 qualifiers)
sample-papers/
  README.md              How the full-length papers map to the real pattern
  sample-paper-01.md … sample-paper-09.md     9 full 50-question papers (IMO pattern, 60 marks, 60 min)
  sample-paper-01-answer-key.md … sample-paper-09-answer-key.md
                         Papers 1–5: Level‑1. Papers 6–9: Level‑2 track.
pdf/
  Print-ready PDF of every file above, mirroring the same folder structure
tools/
  generate-pdfs.js       Regenerates pdf/ from the Markdown
12th-phy-derivations/
  README.md              Unrelated bonus content — see note below
```

**Note:** `12th-phy-derivations/` is unrelated to the Class 5 Maths
Olympiad plan above — it's a CBSE Class 12 Physics board-exam derivations
checklist, kept here at the user's request rather than in its own repo.

## How to use this

1. Read `docs/01-syllabus.md` and `docs/02-exam-pattern.md` once, so you know
   what "done" looks like.
2. Follow `docs/03-practice-plan.md` week by week.
3. Every assignment and sample paper is self-contained: questions first,
   answer key (with short explanations) in a separate file.
4. The sample paper is meant to be done **strictly timed** (60 minutes, no
   calculator) to build real exam pace.

## Regenerating PDFs

```
cd tools
npm install
npx playwright install chromium   # one-time, downloads a local Chromium
node generate-pdfs.js
```

It auto-discovers every `.md` file in the repo and titles each PDF from
that file's first `# heading` — no code changes needed as content is added.

## Status

Complete. Syllabus/pattern research, the 12-week plan, all 11 weekly
assignments (Weeks 1–11), and all 9 full-length sample papers (5 Level‑1 +
a 4-paper Level‑2 track for students who qualify Round 1) are built out —
each with an answer key, and each arithmetic/logic answer verified
programmatically. PDF versions of every file are in `pdf/`. Four dedicated
**Level‑2 topic assignments** (Achievers/HOTS, Logical Reasoning,
Percentage/Ratio/Profit-Loss/SI, Geometry — the areas where Level 2 gets
conceptually harder, not just numerically bigger) are also built, in
`assignments/12-achievers-level2/` through `15-geometry-level2/`.
