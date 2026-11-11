import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { EXAM_CATEGORIES } from "../data/exams";
import { storage } from "../services/storage";
import { ExamCard } from "../components/ExamCard";
import { UserProfile } from "../types";

export function HomePage({ user }: { user: UserProfile | null }) {
  const attempts = storage.listAttempts(50);
  const indianExams = EXAM_CATEGORIES.filter((e) => e.region === "India");
  const internationalExams = EXAM_CATEGORIES.filter(
    (e) => e.region === "International"
  );

  const avgScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((sum, a) => sum + (a.score_percentage || 0), 0) /
            attempts.length
        )
      : 0;
  const bestScore =
    attempts.length > 0
      ? Math.max(...attempts.map((a) => a.score_percentage || 0))
      : 0;

  const firstName = user?.full_name ? user.full_name.split(" ")[0] : null;

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50/50 to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="max-w-2xl">
            <h1 className="font-heading font-bold text-3xl md:text-5xl leading-tight mb-4">
              Welcome back{firstName ? `, ${firstName}` : ""}! 👋
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Master competitive exams with AI-powered mock tests, instant
              analysis, and personalized coaching.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/exams"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Start a Test
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ai-coach"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-input bg-card font-medium hover:bg-muted transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Talk to AI Coach
              </Link>
            </div>
          </div>
        </div>
      </section>

      {attempts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 mb-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen,
                label: "Tests Taken",
                value: attempts.length,
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Trophy,
                label: "Avg Score",
                value: `${avgScore}%`,
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: TrendingUp,
                label: "Best Score",
                value: `${bestScore}%`,
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Sparkles,
                label: "Exams Available",
                value: EXAM_CATEGORIES.length,
                color: "from-violet-500 to-purple-500",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl border p-4 flex items-center gap-3 shadow-sm"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 pt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-bold text-xl md:text-2xl">
              🇮🇳 Indian Exams
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Prepare for India&apos;s top competitive examinations
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {indianExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-bold text-xl md:text-2xl">
              🌍 International Exams
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Get ready for globally recognized standardized tests
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {internationalExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </section>
    </div>
  );
}
