import { Link } from "react-router-dom";
import {
  Atom,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Cpu,
  GraduationCap,
  HeartPulse,
  Landmark,
  Languages,
  School,
  TrendingUp,
} from "lucide-react";
import { ExamCategory, ExamIconKey } from "../types";

const ICON_MAP: Record<ExamIconKey, typeof BookOpen> = {
  landmark: Landmark,
  atom: Atom,
  "heart-pulse": HeartPulse,
  briefcase: Briefcase,
  cpu: Cpu,
  "bar-chart-3": BarChart3,
  "building-2": Building2,
  "graduation-cap": GraduationCap,
  "trending-up": TrendingUp,
  languages: Languages,
  "book-open": BookOpen,
  school: School,
};

const REGION_GRADIENT: Record<string, string> = {
  India: "from-orange-500 to-amber-500",
  International: "from-blue-500 to-indigo-500",
};

export function ExamCard({ exam }: { exam: ExamCategory }) {
  const Icon = ICON_MAP[exam.icon] || BookOpen;
  const gradient = REGION_GRADIENT[exam.region] || "from-gray-500 to-gray-600";

  return (
    <Link to={`/exam/${exam.id}`} className="group block">
      <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        <div
          className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-[4rem] transition-all duration-300 group-hover:opacity-20 group-hover:w-32 group-hover:h-32`}
        />
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-sm`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
          {exam.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {exam.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium bg-gradient-to-r ${gradient} text-white`}
          >
            {exam.region}
          </span>
          {exam.subjects.slice(0, 2).map((subj) => (
            <span
              key={subj}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >
              {subj}
            </span>
          ))}
          {exam.subjects.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{exam.subjects.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
