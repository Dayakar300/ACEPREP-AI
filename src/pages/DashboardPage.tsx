import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Clock,
  Sparkles,
  Target,
  Trash2,
  Trophy,
} from "lucide-react";
import { storage } from "../services/storage";
import { TestAttempt } from "../types";

const PIE_COLORS = ["#22c55e", "#ef4444", "#94a3b8"];

export function DashboardPage() {
  const [attempts, setAttempts] = useState<TestAttempt[]>(() =>
    storage.listAttempts(50)
  );

  const handleSeedDemo = () => {
    const seeded = storage.seedDemoAttempts();
    setAttempts(seeded);
  };

  const handleClear = () => {
    storage.clearAttempts();
    setAttempts([]);
  };

  if (attempts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="font-heading font-bold text-2xl mb-2">
          No Tests Taken Yet
        </h2>
        <p className="text-muted-foreground mb-6">
          Take your first mock test to see your performance analytics here.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/exams"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            <BookOpen className="w-4 h-4" />
            Browse Exams
          </Link>
          <button
            onClick={handleSeedDemo}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-input bg-card hover:bg-muted text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Load Sample Demo Data
          </button>
        </div>
      </div>
    );
  }

  const totalTests = attempts.length;
  const avgScore = Math.round(
    attempts.reduce((sum, a) => sum + (a.score_percentage || 0), 0) / totalTests
  );
  const bestScore = Math.max(...attempts.map((a) => a.score_percentage || 0));
  const totalSeconds = attempts.reduce(
    (sum, a) => sum + (a.time_taken_seconds || 0),
    0
  );
  const avgSeconds = Math.round(totalSeconds / totalTests);

  const trendData = [...attempts].reverse().map((a, idx) => ({
    test: idx + 1,
    score: a.score_percentage || 0,
    exam: a.exam_name,
  }));

  const byExam: Record<string, { scores: number[]; count: number }> = {};
  attempts.forEach((a) => {
    if (!byExam[a.exam_name]) {
      byExam[a.exam_name] = { scores: [], count: 0 };
    }
    byExam[a.exam_name].scores.push(a.score_percentage || 0);
    byExam[a.exam_name].count += 1;
  });

  const examBarData = Object.entries(byExam).map(([name, info]) => ({
    name: name.length > 12 ? `${name.slice(0, 12)}…` : name,
    avg: Math.round(
      info.scores.reduce((s, v) => s + v, 0) / info.scores.length
    ),
    tests: info.count,
  }));

  const totalCorrect = attempts.reduce(
    (sum, a) => sum + (a.correct_answers || 0),
    0
  );
  const totalWrong = attempts.reduce(
    (sum, a) => sum + (a.wrong_answers || 0),
    0
  );
  const totalSkipped = attempts.reduce((sum, a) => sum + (a.skipped || 0), 0);

  const pieData = [
    { name: "Correct", value: totalCorrect },
    { name: "Wrong", value: totalWrong },
    { name: "Skipped", value: totalSkipped },
  ];

  const scoreDelta =
    trendData.length >= 2
      ? trendData[trendData.length - 1].score -
        trendData[trendData.length - 2].score
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl mb-1">
            Performance Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your progress across all exams
          </p>
        </div>
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-input text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/40"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Reset Analytics
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: BookOpen,
            label: "Total Tests",
            value: totalTests,
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: Target,
            label: "Avg Score",
            value: `${avgScore}%`,
            color: "from-violet-500 to-purple-600",
            trend: scoreDelta,
          },
          {
            icon: Trophy,
            label: "Best Score",
            value: `${bestScore}%`,
            color: "from-amber-500 to-orange-500",
          },
          {
            icon: Clock,
            label: "Avg Time",
            value: `${Math.floor(avgSeconds / 60)}m`,
            color: "from-green-500 to-emerald-500",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-card rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {card.trend !== undefined && card.trend !== 0 && (
                  <span
                    className={`flex items-center text-xs font-medium ${
                      card.trend > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {card.trend > 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {Math.abs(card.trend)}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-2xl border p-6">
          <h3 className="font-heading font-semibold text-base mb-4">
            Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="test" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value, _name, item) => [
                  `${value}%`,
                  item?.payload?.exam || "Score",
                ]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#7c3aed"
                strokeWidth={2.5}
                dot={{ fill: "#7c3aed", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border p-6">
          <h3 className="font-heading font-semibold text-base mb-4">
            Answer Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, idx) => (
                  <Cell key={entry.name} fill={PIE_COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((entry, idx) => (
              <div
                key={entry.name}
                className="flex items-center gap-1.5 text-xs"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[idx] }}
                />
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-6 mb-8">
        <h3 className="font-heading font-semibold text-base mb-4">
          Exam-wise Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={examBarData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
              }}
              formatter={(value) => [`${value}%`, "Avg Score"]}
            />
            <Bar dataKey="avg" fill="#7c3aed" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-2xl border overflow-hidden">
        <div className="p-6 pb-4">
          <h3 className="font-heading font-semibold text-base">
            Recent Tests
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Exam
                </th>
                <th className="text-center p-3 font-medium text-muted-foreground">
                  Score
                </th>
                <th className="text-center p-3 font-medium text-muted-foreground">
                  Correct
                </th>
                <th className="text-center p-3 font-medium text-muted-foreground">
                  Wrong
                </th>
                <th className="text-center p-3 font-medium text-muted-foreground">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {attempts.slice(0, 10).map((att) => (
                <tr key={att.id} className="border-t">
                  <td className="p-3 font-medium">{att.exam_name}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        att.score_percentage >= 70
                          ? "bg-green-100 text-green-700"
                          : att.score_percentage >= 50
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {att.score_percentage}%
                    </span>
                  </td>
                  <td className="p-3 text-center text-green-600">
                    {att.correct_answers}
                  </td>
                  <td className="p-3 text-center text-red-500">
                    {att.wrong_answers}
                  </td>
                  <td className="p-3 text-center text-muted-foreground">
                    {Math.floor((att.time_taken_seconds || 0) / 60)}m
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
