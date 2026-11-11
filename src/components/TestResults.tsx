import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Eye,
  MinusCircle,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { TestResultSummary } from "../types";

interface TestResultsProps {
  result: TestResultSummary;
  examName: string;
  onReviewAnswers: () => void;
}

export function TestResults({
  result,
  examName,
  onReviewAnswers,
}: TestResultsProps) {
  const {
    correct_answers,
    wrong_answers,
    skipped,
    total_questions,
    score_percentage,
    time_taken_seconds,
  } = result;

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}m ${rem}s`;
  };

  const tier =
    score_percentage >= 90
      ? { label: "Excellent!", color: "text-green-600", bg: "bg-green-50" }
      : score_percentage >= 70
      ? { label: "Good Job!", color: "text-blue-600", bg: "bg-blue-50" }
      : score_percentage >= 50
      ? { label: "Keep Trying", color: "text-amber-600", bg: "bg-amber-50" }
      : { label: "Needs Work", color: "text-red-600", bg: "bg-red-50" };

  const attempted = total_questions - skipped;
  const accuracy =
    attempted > 0 ? Math.round((correct_answers / attempted) * 100) : 0;

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-card rounded-2xl border overflow-hidden">
        <div className={`p-8 text-center ${tier.bg}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-3 ${tier.color}`} />
          <h2 className={`text-2xl font-heading font-bold ${tier.color}`}>
            {tier.label}
          </h2>
          <p className="text-muted-foreground mt-1">{examName}</p>
          <div className="mt-4">
            <span className={`text-5xl font-display font-bold ${tier.color}`}>
              {score_percentage}%
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-green-50">
              <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-green-700">
                {correct_answers}
              </p>
              <p className="text-xs text-green-600">Correct</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-red-50">
              <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-red-700">{wrong_answers}</p>
              <p className="text-xs text-red-600">Wrong</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-100">
              <MinusCircle className="w-5 h-5 text-slate-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-slate-700">{skipped}</p>
              <p className="text-xs text-slate-500">Skipped</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Time Taken</span>
            </div>
            <span className="font-mono font-semibold">
              {formatDuration(time_taken_seconds)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Accuracy</span>
            </div>
            <span className="font-mono font-semibold">{accuracy}%</span>
          </div>

          <button
            onClick={onReviewAnswers}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-input bg-card hover:bg-muted text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            Review Answers & Explanations
          </button>

          <div className="flex gap-3 pt-1">
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-input text-sm font-medium hover:bg-muted transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/ai-guidance"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get AI Tips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
