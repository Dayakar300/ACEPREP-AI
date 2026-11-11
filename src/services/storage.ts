import {
  AISettings,
  ChatMessage,
  CoachConversation,
  TestAttempt,
  UserProfile,
} from "../types";

const KEYS = {
  USER: "aceprep_user",
  AUTH: "aceprep_authenticated",
  ATTEMPTS: "aceprep_test_attempts",
  CONVERSATIONS: "aceprep_coach_conversations",
  AI_SETTINGS: "aceprep_ai_settings",
};

const DEFAULT_USER: UserProfile = {
  id: "local-student-1",
  full_name: "Alex Aspirant",
  email: "student@aceprep.local",
  target_exam: "UPSC CSE",
};

export const storage = {
  getUser(): UserProfile | null {
    const isAuth = localStorage.getItem(KEYS.AUTH);
    if (isAuth === "false") return null;
    const raw = localStorage.getItem(KEYS.USER);
    if (!raw) {
      localStorage.setItem(KEYS.USER, JSON.stringify(DEFAULT_USER));
      localStorage.setItem(KEYS.AUTH, "true");
      return DEFAULT_USER;
    }
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return DEFAULT_USER;
    }
  },

  login(email: string, fullName?: string): UserProfile {
    const derivedName =
      fullName?.trim() ||
      email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    const user: UserProfile = {
      id: `user_${Date.now()}`,
      full_name: derivedName || "Student",
      email,
    };
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
    localStorage.setItem(KEYS.AUTH, "true");
    return user;
  },

  updateUser(patch: Partial<UserProfile>): UserProfile {
    const current = this.getUser() || DEFAULT_USER;
    const updated = { ...current, ...patch };
    localStorage.setItem(KEYS.USER, JSON.stringify(updated));
    localStorage.setItem(KEYS.AUTH, "true");
    return updated;
  },

  logout(): void {
    localStorage.setItem(KEYS.AUTH, "false");
  },

  listAttempts(limit = 50): TestAttempt[] {
    try {
      const raw = localStorage.getItem(KEYS.ATTEMPTS);
      if (!raw) return [];
      const items = JSON.parse(raw) as TestAttempt[];
      return items
        .sort(
          (a, b) =>
            new Date(b.created_date).getTime() -
            new Date(a.created_date).getTime()
        )
        .slice(0, limit);
    } catch {
      return [];
    }
  },

  createAttempt(attempt: Omit<TestAttempt, "id" | "created_date">): TestAttempt {
    const existing = this.listAttempts(200);
    const created: TestAttempt = {
      ...attempt,
      id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      created_date: new Date().toISOString(),
    };
    localStorage.setItem(
      KEYS.ATTEMPTS,
      JSON.stringify([created, ...existing])
    );
    return created;
  },

  seedDemoAttempts(): TestAttempt[] {
    const now = Date.now();
    const demo: TestAttempt[] = [
      {
        id: "demo_1",
        exam_category_id: "upsc-cse",
        exam_name: "UPSC CSE",
        total_questions: 10,
        correct_answers: 6,
        wrong_answers: 3,
        skipped: 1,
        score_percentage: 60,
        time_taken_seconds: 540,
        subject: "Indian Polity",
        difficulty: "Medium",
        answers: [],
        created_date: new Date(now - 5 * 86400000).toISOString(),
      },
      {
        id: "demo_2",
        exam_category_id: "gre-general",
        exam_name: "GRE General",
        total_questions: 10,
        correct_answers: 7,
        wrong_answers: 2,
        skipped: 1,
        score_percentage: 70,
        time_taken_seconds: 480,
        subject: "Verbal Reasoning",
        difficulty: "Medium",
        answers: [],
        created_date: new Date(now - 3 * 86400000).toISOString(),
      },
      {
        id: "demo_3",
        exam_category_id: "gate-cs",
        exam_name: "GATE CS & IT",
        total_questions: 10,
        correct_answers: 8,
        wrong_answers: 2,
        skipped: 0,
        score_percentage: 80,
        time_taken_seconds: 420,
        subject: "Algorithms",
        difficulty: "Hard",
        answers: [],
        created_date: new Date(now - 2 * 86400000).toISOString(),
      },
      {
        id: "demo_4",
        exam_category_id: "upsc-cse",
        exam_name: "UPSC CSE",
        total_questions: 10,
        correct_answers: 9,
        wrong_answers: 1,
        skipped: 0,
        score_percentage: 90,
        time_taken_seconds: 390,
        subject: "All Subjects",
        difficulty: "Mixed",
        answers: [],
        created_date: new Date(now - 1 * 86400000).toISOString(),
      },
    ];
    localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(demo));
    return demo;
  },

  clearAttempts(): void {
    localStorage.removeItem(KEYS.ATTEMPTS);
  },

  listConversations(): CoachConversation[] {
    try {
      const raw = localStorage.getItem(KEYS.CONVERSATIONS);
      if (!raw) return [];
      const list = JSON.parse(raw) as CoachConversation[];
      return list.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } catch {
      return [];
    }
  },

  getConversation(id: string): CoachConversation | null {
    return this.listConversations().find((c) => c.id === id) || null;
  },

  createConversation(name = "New Coaching Session"): CoachConversation {
    const existing = this.listConversations();
    const conv: CoachConversation = {
      id: `conv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      metadata: {
        name,
        description: "Exam coaching session",
      },
      messages: [
        {
          role: "assistant",
          content:
            "Welcome to your **Exam Coach AI** session! Share your target exam, exam date, or recent weak topics and I'll build a tailored study strategy.",
          timestamp: new Date().toISOString(),
        },
      ],
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem(
      KEYS.CONVERSATIONS,
      JSON.stringify([conv, ...existing])
    );
    return conv;
  },

  appendMessages(
    conversationId: string,
    newMessages: ChatMessage[],
    titleOverride?: string
  ): CoachConversation | null {
    const existing = this.listConversations();
    const idx = existing.findIndex((c) => c.id === conversationId);
    if (idx === -1) return null;
    const conv = existing[idx];
    const updated: CoachConversation = {
      ...conv,
      metadata: {
        ...conv.metadata,
        name: titleOverride || conv.metadata.name,
      },
      messages: [...conv.messages, ...newMessages],
      updated_at: new Date().toISOString(),
    };
    existing[idx] = updated;
    localStorage.setItem(KEYS.CONVERSATIONS, JSON.stringify(existing));
    return updated;
  },

  deleteConversation(conversationId: string): void {
    const filtered = this.listConversations().filter(
      (c) => c.id !== conversationId
    );
    localStorage.setItem(KEYS.CONVERSATIONS, JSON.stringify(filtered));
  },

  getAISettings(): AISettings {
    try {
      const raw = localStorage.getItem(KEYS.AI_SETTINGS);
      if (!raw) {
        return { provider: "builtin", apiKey: "", model: "" };
      }
      return JSON.parse(raw) as AISettings;
    } catch {
      return { provider: "builtin", apiKey: "", model: "" };
    }
  },

  saveAISettings(settings: AISettings): void {
    localStorage.setItem(KEYS.AI_SETTINGS, JSON.stringify(settings));
  },
};
