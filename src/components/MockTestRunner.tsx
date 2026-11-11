import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Send,
  XCircle,
} from "lucide-react";
import { AnswerRecord, Question, TestResultSummary } from "../types";

interface MockTestRunnerProps {
  questions: Question[];
  onComplete?: (summary: TestResultSummary) => void;
  reviewMode?: boolean;
  initialAnswers?: Record<string, number>;
  initialElapsedSeconds?: number;
}

export function MockTestRunner({
  questions,
  onComplete,
  reviewMode = false,
  initialAnswers = {},
  initialElapsedSeconds = 0,
}: MockTestRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] =
    useState<Record<string, number>>(initialAnswers);
  const [elapsedSeconds, setElapsedSeconds] = useState(initialElapsedSeconds);
  const [submitted, setSubmitted] = useState(reviewMode);

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${rem
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const answerRecords: AnswerRecord[] = questions.map((q) => {
      const selected = selectedAnswers[q.id];
      return {
        question_id: q.id,
        selected_index: selected ?? -1,
        correct_index: q.correct_answer_index,
        is_correct: selected === q.correct_answer_index,
      };
    });

    const correctCount = answerRecords.filter((a) => a.is_correct).length;
    const wrongCount = answerRecords.filter(
      (a) => a.selected_index !== -1 && !a.is_correct
    ).length;
    const skippedCount = answerRecords.filter(
      (a) => a.selected_index === -1
    ).length;

    onComplete?.({
      answers: answerRecords,
      correct_answers: correctCount,
      wrong_answers: wrongCount,
      skipped: skippedCount,
      total_questions: questions.length,
      score_percentage:
        questions.length > 0
          ? Math.round((correctCount / questions.length) * 100)
          : 0,
      time_taken_seconds: elapsedSeconds,
    });
  }, [questions, selectedAnswers, elapsedSeconds, onComplete]);

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-xl border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="font-mono font-medium text-foreground">
            {formatTime(elapsedSeconds)}
          </span>
        </div>
        <div className="text-sm font-medium">
          {currentIndex + 1} / {questions.length}
        </div>
        <div className="text-sm text-muted-foreground">
          {answeredCount} answered
        </div>
      </div>

      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20 mb-8">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-card rounded-2xl border p-6 md:p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {currentQuestion.subject}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
            {currentQuestion.difficulty}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {currentIndex + 1}
          </span>
          <p className="text-lg font-medium leading-relaxed">
            {currentQuestion.question_text}
          </p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            const isCorrectOption =
              submitted && idx === currentQuestion.correct_answer_index;
            const isWrongSelected =
              submitted &&
              isSelected &&
              idx !== currentQuestion.correct_answer_index;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(currentQuestion.id, idx)}
                disabled={submitted}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 disabled:cursor-default ${
                  isCorrectOption
                    ? "border-green-500 bg-green-50"
                    : isWrongSelected
                    ? "border-red-500 bg-red-50"
                    : isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    isCorrectOption
                      ? "bg-green-500 text-white"
                      : isWrongSelected
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
                {isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
                {isWrongSelected && (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {submitted && currentQuestion.explanation && (
          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                Explanation
              </span>
            </div>
            <p className="text-sm text-blue-700 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-input bg-card text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : submitted ? null : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            Submit Test
          </button>
        )}
      </div>

      <div className="mt-8 p-4 bg-card rounded-xl border">
        <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
          Question Navigator
        </p>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const answered = selectedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            const isCorrect =
              submitted &&
              selectedAnswers[q.id] === q.correct_answer_index;
            const isWrong =
              submitted &&
              answered &&
              selectedAnswers[q.id] !== q.correct_answer_index;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-9 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                    : isCorrect
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : isWrong
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : answered
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
