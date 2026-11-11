export type Region = "India" | "International";

export type ExamIconKey =
  | "landmark"
  | "atom"
  | "heart-pulse"
  | "briefcase"
  | "cpu"
  | "bar-chart-3"
  | "building-2"
  | "graduation-cap"
  | "trending-up"
  | "languages"
  | "book-open"
  | "school";

export interface ExamCategory {
  id: string;
  name: string;
  description: string;
  region: Region;
  icon: ExamIconKey;
  subjects: string[];
}

export type Difficulty = "Easy" | "Medium" | "Hard" | "Mixed";

export interface Question {
  id: string;
  exam_category_id: string;
  question_text: string;
  options: [string, string, string, string];
  correct_answer_index: number;
  explanation: string;
  subject: string;
  difficulty: Exclude<Difficulty, "Mixed">;
}

export interface AnswerRecord {
  question_id: string;
  selected_index: number;
  correct_index: number;
  is_correct: boolean;
}

export interface TestAttempt {
  id: string;
  exam_category_id: string;
  exam_name: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  skipped: number;
  score_percentage: number;
  time_taken_seconds: number;
  subject: string;
  difficulty: Difficulty;
  answers: AnswerRecord[];
  created_date: string;
}

export interface TestResultSummary {
  answers: AnswerRecord[];
  correct_answers: number;
  wrong_answers: number;
  skipped: number;
  total_questions: number;
  score_percentage: number;
  time_taken_seconds: number;
}

export interface ToolCallInfo {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  arguments_string?: string;
  results?: unknown;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  tool_calls?: ToolCallInfo[];
  timestamp?: string;
}

export interface CoachConversation {
  id: string;
  metadata: {
    name: string;
    description: string;
  };
  messages: ChatMessage[];
  updated_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  target_exam?: string;
}

export interface AISettings {
  provider: "builtin" | "openai" | "gemini";
  apiKey: string;
  model: string;
}
