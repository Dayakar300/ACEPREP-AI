import { selectQuestionsFromBank } from "../data/questionBank";
import { Difficulty, ExamCategory, Question, TestAttempt } from "../types";
import { storage } from "./storage";

async function callConfiguredLLM(
  prompt: string,
  jsonMode = false
): Promise<string | null> {
  const settings = storage.getAISettings();
  if (settings.provider === "builtin" || !settings.apiKey.trim()) {
    return null;
  }

  try {
    if (settings.provider === "openai") {
      const model = settings.model.trim() || "gpt-4o-mini";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.apiKey.trim()}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
        }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data?.choices?.[0]?.message?.content ?? null;
    }

    if (settings.provider === "gemini") {
      const model = settings.model.trim() || "gemini-2.5-flash";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
          model
        )}:generateContent?key=${encodeURIComponent(settings.apiKey.trim())}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            ...(jsonMode
              ? { generationConfig: { responseMimeType: "application/json" } }
              : {}),
          }),
        }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

export async function generateMockQuestions(
  exam: ExamCategory,
  subject: string,
  difficulty: Difficulty,
  count: number
): Promise<Question[]> {
  const subjectText =
    subject === "all"
      ? `Cover these subjects: ${exam.subjects.join(", ")}`
      : `Subject/Topic: ${subject}`;

  const prompt = `Generate exactly ${count} multiple-choice questions for the ${exam.name} exam.
${subjectText}
Difficulty: ${difficulty}

Return a JSON object with a "questions" array where each item has:
- question_text: string
- options: array of exactly 4 strings
- correct_answer_index: integer 0-3
- explanation: brief clear explanation
- subject: string
- difficulty: "${difficulty === "Mixed" ? "Easy | Medium | Hard" : difficulty}"`;

  const llmResponse = await callConfiguredLLM(prompt, true);
  if (llmResponse) {
    try {
      const parsed = JSON.parse(llmResponse);
      const list = Array.isArray(parsed?.questions) ? parsed.questions : [];
      if (list.length > 0) {
        return list.slice(0, count).map((q: Record<string, unknown>, i: number) => ({
          id: `ai_${Date.now()}_${i}`,
          exam_category_id: exam.id,
          question_text: String(q.question_text || ""),
          options: (Array.isArray(q.options) && q.options.length === 4
            ? q.options.map(String)
            : ["Option A", "Option B", "Option C", "Option D"]) as [
            string,
            string,
            string,
            string
          ],
          correct_answer_index: Number(q.correct_answer_index ?? 0),
          explanation: String(q.explanation || ""),
          subject: String(q.subject || (subject === "all" ? exam.subjects[0] : subject)),
          difficulty:
            q.difficulty === "Easy" ||
            q.difficulty === "Medium" ||
            q.difficulty === "Hard"
              ? q.difficulty
              : "Medium",
        }));
      }
    } catch {
      // Fall back to curated offline bank cleanly
    }
  }

  await new Promise((r) => setTimeout(r, 450));
  return selectQuestionsFromBank(exam.id, subject, difficulty, count);
}

function buildPerformanceSummary(attempts: TestAttempt[]): string {
  if (attempts.length === 0) {
    return "You haven't completed any mock tests yet. Taking a 10-question diagnostic test in Exams will unlock personalized score diagnostics!";
  }
  const avg = Math.round(
    attempts.reduce((sum, a) => sum + a.score_percentage, 0) / attempts.length
  );
  const best = Math.max(...attempts.map((a) => a.score_percentage));
  const examStats: Record<string, number[]> = {};
  for (const a of attempts) {
    examStats[a.exam_name] = examStats[a.exam_name] || [];
    examStats[a.exam_name].push(a.score_percentage);
  }
  const breakdown = Object.entries(examStats)
    .map(
      ([name, scores]) =>
        `- **${name}**: ${Math.round(
          scores.reduce((s, v) => s + v, 0) / scores.length
        )}% avg across ${scores.length} test(s)`
    )
    .join("\n");

  return `### Your Performance Snapshot
- **Tests Completed:** ${attempts.length}
- **Average Score:** ${avg}%
- **Best Score:** ${best}%

### Exam Breakdown
${breakdown}

**Next Tactical Move:** Focus your next 2 mock sessions on subjects where accuracy dipped below 75%, and review every skipped question's explanation immediately after submission.`;
}

function generateSmartOfflineStudyResponse(
  userQuery: string,
  attempts: TestAttempt[]
): string {
  const q = userQuery.toLowerCase();

  if (q.includes("upsc") && (q.includes("plan") || q.includes("6 month"))) {
    return `## 6-Month Strategic UPSC CSE Study Plan

### Months 1–2: Core Foundation (NCERTs + Standard Books)
- **Polity:** Laxmikanth chapters on Fundamental Rights, Parliament, Judiciary, and Federalism.
- **Economy:** Macro basics, RBI monetary policy, Fiscal Deficit, and Budget highlights.
- **History & Geography:** Spectrum Modern India + Class 11/12 Geography NCERTs.
- **Daily Habit:** 45 min newspaper analysis + 20 Prelims MCQs.

### Months 3–4: Subject Integration & Answer Writing
- Pair **Current Affairs** directly with static GS topics (Environment treaties, Constitutional amendments).
- Attempt **2 full subject-wise mock tests per week** and maintain an error log.

### Months 5–6: Full-Length Prelims Simulation & Revision
- **3–4 timed mock tests per week** (GS + CSAT) to calibrate guesswork and accuracy.
- Revise high-yield notes 3× before exam day; eliminate silly errors on negative marking.`;
  }

  if (q.includes("newton")) {
    return `## Newton's Three Laws of Motion — Made Simple

1. **First Law (Inertia):** An object stays at rest or moves at constant velocity unless acted on by a net external force.
   - *Exam Tip:* Zero net force implies zero acceleration (\`a = 0\`), not necessarily zero velocity.
2. **Second Law (\`F_net = m × a\`):** Net external force equals mass times acceleration (or rate of change of momentum \`dp/dt\`).
   - *Exam Tip:* Always draw a **Free Body Diagram (FBD)** along the direction of acceleration before writing equations.
3. **Third Law (Action–Reaction):** Every force has an equal and opposite reaction acting on **two different bodies**.
   - *Exam Tip:* Action and reaction forces never cancel each other because they act on different objects!`;
  }

  if (q.includes("gre") && q.includes("verbal")) {
    return `## High-Impact Tips for GRE Verbal Reasoning

- **Master Context Clues First:** Before peeking at options on Text Completion / Sentence Equivalence, predict your own word using contrast signals (*although, albeit, notwithstanding*) or support signals (*indeed, moreover*).
- **Word Pairs in Sentence Equivalence:** Look for two choices that produce **equivalent sentence meanings**, not just isolated dictionary synonyms.
- **Active Reading on RC:** Summarize each paragraph's **role** (claim, counter-example, nuance) in 5 words so inference questions take under 30 seconds.
- **Spaced Vocabulary:** Learn 15–20 high-frequency words daily in sentences rather than rote lists.`;
  }

  if (q.includes("time") || q.includes("manage")) {
    return `## Competitive Exam Time-Management Framework

1. **The Two-Pass Rule:**
   - **Pass 1 (First 60% of time):** Solve all quick, high-confidence questions immediately; mark medium/lengthy ones for review.
   - **Pass 2 (Next 30% of time):** Attack marked questions with high payoff.
   - **Final 10%:** Verify bubbling/navigation and avoid blind guessing where negative marking applies.
2. **Hard Cutoff per Question:** If you've spent **90 seconds** without a clear path, mark and move on — protecting easy marks later in the paper.
3. **Track Time in Practice:** Use the AcePrep AI timer on every mock test to lower your average seconds-per-question.`;
  }

  if (
    q.includes("score") ||
    q.includes("performance") ||
    q.includes("progress") ||
    q.includes("weak") ||
    q.includes("analy")
  ) {
    return buildPerformanceSummary(attempts);
  }

  return `## Study Strategy Recommendation

Based on your question: *"${userQuery.trim()}"*

- **1. Active Recall Over Passive Reading:** Convert notes into timed 10-question quizzes in the **Exams** tab and review explanations for every missed or guessed item.
- **2. Error Log Classification:** Tag mistakes as *Conceptual Gap*, *Misread Question*, or *Time Pressure* so your revision directly fixes the root cause.
- **3. Adaptive Difficulty Progression:** Start at **Medium**, hit ≥80% accuracy consistently, then step up to **Hard** mode.

${
  attempts.length > 0
    ? buildPerformanceSummary(attempts)
    : "*Tip: Configure an OpenAI or Gemini key in **AI Settings** (top right) anytime if you want live cloud LLM responses; built-in coaching always works offline too!*"
}`;
}

export async function askStudyGuide(
  question: string,
  attempts: TestAttempt[]
): Promise<string> {
  const avg =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((sum, a) => sum + a.score_percentage, 0) /
            attempts.length
        )
      : 0;

  const context =
    attempts.length > 0
      ? `Student has taken ${attempts.length} tests. Average score: ${avg}%. Recent exams: ${attempts
          .slice(0, 5)
          .map((a) => `${a.exam_name} (${a.score_percentage}%)`)
          .join(", ")}.`
      : "";

  const prompt = `You are an expert exam preparation tutor and coach for competitive exams (Indian exams like UPSC, JEE, NEET, SSC, GATE, CAT, Banking and International exams like GRE, GMAT, TOEFL, IELTS, SAT).

${context ? `Context about the student: ${context}\n` : ""}
Provide clear, concise, actionable guidance formatted in clean Markdown.

Student's question: ${question}`;

  const llm = await callConfiguredLLM(prompt, false);
  if (llm) return llm;

  await new Promise((r) => setTimeout(r, 400));
  return generateSmartOfflineStudyResponse(question, attempts);
}

export async function generateCoachReply(
  userMessage: string,
  attempts: TestAttempt[]
): Promise<{
  content: string;
  tool_calls?: { name: string; status: "completed"; results: string }[];
}> {
  const answer = await askStudyGuide(userMessage, attempts);
  return {
    content: answer,
    tool_calls:
      attempts.length > 0
        ? [
            {
              name: "analyze_test_attempts",
              status: "completed",
              results: `Reviewed ${attempts.length} recorded test attempt(s) locally`,
            },
          ]
        : undefined,
  };
}
