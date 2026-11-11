# AcePrep AI

Standalone competitive exam preparation platform with adaptive mock tests, performance analytics, AI study guidance, and personalized coaching.

## Features

- **Exam Directory (`/exams`)**: 12 Indian and International competitive exams (UPSC CSE, JEE Main & Adv, NEET UG, GATE CS & IT, CAT MBA, SSC CGL, IBPS/SBI PO, GRE General, GMAT Focus, Digital SAT, IELTS Academic, TOEFL iBT) with instant search and region filters.
- **Mock Test Runner (`/exam/:id`)**: Configurable subject, difficulty, and question count (5–25), live countdown/elapsed timer, question navigator grid, instant scoring, and post-test explanation review.
- **Performance Dashboard (`/dashboard`)**: Score trend chart, answer distribution donut, exam-wise performance bar chart, recent test history, and one-click sample demo data.
- **AI Study Guide (`/ai-guidance`)**: Context-aware study strategy assistant with quick-ask prompts.
- **AI Coach (`/ai-coach`)**: Multi-session coaching workspace with persistent conversation history.
- **Local-First & Optional Live AI**: Works immediately offline using a built-in question bank and performance-aware coaching engine, with optional support for your own Google Gemini or OpenAI API key in **AI Settings**.

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```
