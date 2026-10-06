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
  README.md              Naming convention + full topic list
  01-number-sense/        Worked example: assignment + answer key
sample-papers/
  README.md              How the full-length paper maps to the real pattern
  sample-paper-01.md          Full 50-question paper (IMO pattern, 60 marks, 60 min)
  sample-paper-01-answer-key.md
pdf/
  Print-ready PDF of every file above, mirroring the same folder structure
tools/
  generate-pdfs.js       Regenerates pdf/ from the Markdown
```

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

First pass, matching how the Class 4 kit started: syllabus/pattern
research, the 12-week plan, Week 1's assignment, and Sample Paper 1 are
built out in full as the reference template. Remaining weeks' assignments
follow the same template — ask for them to be built out, same as Class 4's
Weeks 2–11 and Sample Papers 2–6 were.
