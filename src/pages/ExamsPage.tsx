import { useState } from "react";
import { Search, SearchX } from "lucide-react";
import { EXAM_CATEGORIES } from "../data/exams";
import { ExamCard } from "../components/ExamCard";

type RegionFilter = "All" | "India" | "International";

export function ExamsPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<RegionFilter>("All");

  const filtered = EXAM_CATEGORIES.filter((exam) => {
    const q = search.toLowerCase();
    const matchesSearch =
      exam.name.toLowerCase().includes(q) ||
      exam.description.toLowerCase().includes(q) ||
      exam.subjects.some((s) => s.toLowerCase().includes(q));
    const matchesRegion = region === "All" || exam.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">
          All Examinations
        </h1>
        <p className="text-muted-foreground">
          Browse and select an exam to start your mock test
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search exams or subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          {(["All", "India", "International"] as RegionFilter[]).map((item) => (
            <button
              key={item}
              onClick={() => setRegion(item)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                region === item
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-card hover:bg-muted text-foreground"
              }`}
            >
              {item === "India"
                ? "🇮🇳 "
                : item === "International"
                ? "🌍 "
                : ""}
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <SearchX className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No exams match your search
          </p>
        </div>
      )}
    </div>
  );
}
