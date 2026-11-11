import { useEffect, useRef, useState } from "react";
import { BookOpen, Bot, Loader2, Send, Sparkles, Target, User } from "lucide-react";
import { askStudyGuide } from "../services/aiService";
import { storage } from "../services/storage";
import { MarkdownContent } from "../components/MarkdownContent";
import { ChatMessage } from "../types";

const SUGGESTED_PROMPTS = [
  "Create a study plan for UPSC in 6 months",
  "Explain Newton's laws simply",
  "Tips for improving GRE verbal score",
  "How to manage time in competitive exams?",
];

export function AIGuidancePage() {
  const attempts = storage.listAttempts(20);
  const avgScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((sum, a) => sum + (a.score_percentage || 0), 0) /
            attempts.length
        )
      : 0;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your **AI study assistant**. Ask me anything about your exam preparation — strategies, concepts, study plans, or get analysis on your performance. 🎓",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (textOverride?: string) => {
    const query = (textOverride ?? input).trim();
    if (!query || sending) return;
    if (!textOverride) setInput("");

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setSending(true);
    try {
      const reply = await askStudyGuide(query, attempts);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't process that. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div>
            <h1 className="font-heading font-bold text-2xl mb-1">
              AI Study Guide
            </h1>
            <p className="text-sm text-muted-foreground">
              Get personalized tips and strategies
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-card rounded-2xl border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold">{avgScore}%</p>
                <p className="text-xs text-muted-foreground">Average Score</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold">{attempts.length}</p>
                <p className="text-xs text-muted-foreground">Tests Completed</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-semibold text-violet-800">
                  Try asking:
                </span>
              </div>
              <ul className="space-y-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <li key={prompt}>
                    <button
                      onClick={() => sendMessage(prompt)}
                      className="text-left text-sm text-violet-700 hover:text-violet-900 hover:underline transition-colors"
                    >
                      • &ldquo;{prompt}&rdquo;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border overflow-hidden h-[calc(100vh-12rem)] min-h-[480px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="text-sm">{msg.content}</p>
                    ) : (
                      <MarkdownContent content={msg.content} />
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {sending && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about study plans, concepts, tips..."
                  disabled={sending}
                  className="flex-1 h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
