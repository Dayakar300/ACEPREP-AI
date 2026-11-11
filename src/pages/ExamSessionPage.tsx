import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { EXAM_CATEGORIES } from "../data/exams";
import { generateMockQuestions } from "../services/aiService";
import { storage } from "../services/storage";
import { MockTestRunner } from "../components/MockTestRunner";
import { TestResults } from "../components/TestResults";
import { Difficulty, Question, TestResultSummary } from "../types";

type SessionPhase = "config" | "test" | "results" | "review";

export function ExamSessionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const exam = EXAM_CATEGORIES.find((e) => e.id === id);

  const [subject, setSubject] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("Mixed");
  const [questionCount, setQuestionCount] = useState("10");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<SessionPhase>("config");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<TestResultSummary | null>(null);

  if (!exam) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-heading font-bold text-2xl mb-2">
          Exam Not Found
        </h2>
        <button
          onClick={() => navigate("/exams")}
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
        >
          Back to Exams
        </button>
      </div>
    );
  }

  const handleStartTest = async () => {
    setLoading(true);
    try {
      const count = parseInt(questionCount, 10) || 10;
      const generated = await generateMockQuestions(
        exam,
        subject,
        difficulty,
        count
      );
      setQuestions(generated);
      setResult(null);
      setPhase("test");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTest = (summary: TestResultSummary) => {
    setResult(summary);
    setPhase("results");
    storage.createAttempt({
      exam_category_id: exam.id,
      exam_name: exam.name,
      total_questions: summary.total_questions,
      correct_answers: summary.correct_answers,
      wrong_answers: summary.wrong_answers,
      skipped: summary.skipped,
      score_percentage: summary.score_percentage,
      time_taken_seconds: summary.time_taken_seconds,
      subject: subject === "all" ? "All Subjects" : subject,
      difficulty,
      answers: summary.answers,
    });
  };

  const reviewAnswersMap: Record<string, number> = {};
  if (result) {
    for (const ans of result.answers) {
      if (ans.selected_index !== -1) {
        reviewAnswersMap[ans.question_id] = ans.selected_index;
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {phase === "config" && (
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                {exam.name}
              </h1>
              <p className="text-muted-foreground">{exam.description}</p>
            </div>

            <div className="bg-card rounded-2xl border p-6 space-y-5 shadow-sm">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Subjects</option>
                  {exam.subjects.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Mixed">Mixed</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Number of Questions
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="5">5 Questions</option>
                  <option value="10">10 Questions</option>
                  <option value="15">15 Questions</option>
                  <option value="20">20 Questions</option>
                  <option value="25">25 Questions</option>
                </select>
              </div>

              <button
                onClick={handleStartTest}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl h-12 bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Questions with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate &amp; Start Test
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Questions match real exam patterns with step-by-step
                explanations.
              </p>
            </div>
          </div>
        </div>
      )}

      {phase === "test" && (
        <div>
          <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-xl">
              {exam.name} — Mock Test
            </h2>
          </div>
          <MockTestRunner
            questions={questions}
            onComplete={handleCompleteTest}
          />
        </div>
      )}

      {phase === "results" && result && (
        <div>
          <div className="text-center mb-6">
            <h2 className="font-heading font-bold text-xl">Test Results</h2>
          </div>
          <TestResults
            result={result}
            examName={exam.name}
            onReviewAnswers={() => setPhase("review")}
          />
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setPhase("config");
                setResult(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-input bg-card hover:bg-muted text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Take Another Test
            </button>
          </div>
        </div>
      )}

      {phase === "review" && result && (
        <div>
          <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
            <button
              onClick={() => setPhase("results")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Results
            </button>
            <h2 className="font-heading font-bold text-lg">
              Answer Review — {exam.name}
            </h2>
          </div>
          <MockTestRunner
            questions={questions}
            reviewMode
            initialAnswers={reviewAnswersMap}
            initialElapsedSeconds={result.time_taken_seconds}
          />
        </div>
      )}
    </div>
  );
}
