import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronLeft,
  Loader2,
  MessageSquare,
  Plus,
  Send,
  Trash2,
  User,
} from "lucide-react";
import { generateCoachReply } from "../services/aiService";
import { storage } from "../services/storage";
import { MarkdownContent } from "../components/MarkdownContent";
import { CoachConversation, ToolCallInfo } from "../types";

function ToolCallBadge({ toolCall }: { toolCall: ToolCallInfo }) {
  const [expanded, setExpanded] = useState(false);
  const dotColor =
    toolCall.status === "failed"
      ? "bg-red-500"
      : toolCall.status === "completed"
      ? "bg-green-500"
      : "bg-amber-500 animate-pulse";

  return (
    <div className="mt-2 text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span>{toolCall.name}</span>
        <span className="text-green-600">Completed</span>
      </button>
      {expanded && toolCall.results !== undefined && (
        <div className="mt-1.5 p-2 bg-background/70 rounded-lg border text-[11px] text-muted-foreground">
          {String(toolCall.results)}
        </div>
      )}
    </div>
  );
}

export function AICoachPage() {
  const [conversations, setConversations] = useState<CoachConversation[]>(() =>
    storage.listConversations()
  );
  const [activeConv, setActiveConv] = useState<CoachConversation | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages.length]);

  const handleNewChat = () => {
    const conv = storage.createConversation("New Coaching Session");
    setConversations(storage.listConversations());
    setActiveConv(conv);
    setShowSidebarMobile(false);
  };

  const handleSelectConv = (conv: CoachConversation) => {
    const fresh = storage.getConversation(conv.id) || conv;
    setActiveConv(fresh);
    setShowSidebarMobile(false);
  };

  const handleDeleteConv = (
    e: React.MouseEvent,
    convId: string
  ) => {
    e.stopPropagation();
    storage.deleteConversation(convId);
    const updated = storage.listConversations();
    setConversations(updated);
    if (activeConv?.id === convId) {
      setActiveConv(null);
      setShowSidebarMobile(true);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending || !activeConv) return;
    setInput("");

    const isFirstUserMessage =
      activeConv.messages.filter((m) => m.role === "user").length === 0;
    const titleOverride = isFirstUserMessage
      ? text.slice(0, 34) + (text.length > 34 ? "…" : "")
      : undefined;

    const afterUser = storage.appendMessages(
      activeConv.id,
      [{ role: "user", content: text, timestamp: new Date().toISOString() }],
      titleOverride
    );
    if (afterUser) {
      setActiveConv(afterUser);
      setConversations(storage.listConversations());
    }

    setSending(true);
    try {
      const attempts = storage.listAttempts(30);
      const reply = await generateCoachReply(text, attempts);
      const afterBot = storage.appendMessages(activeConv.id, [
        {
          role: "assistant",
          content: reply.content,
          tool_calls: reply.tool_calls,
          timestamp: new Date().toISOString(),
        },
      ]);
      if (afterBot) {
        setActiveConv(afterBot);
        setConversations(storage.listConversations());
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div
        className={`${
          showSidebarMobile ? "flex" : "hidden md:flex"
        } flex-col w-full md:w-72 border-r bg-card`}
      >
        <div className="p-4 border-b">
          <button
            onClick={handleNewChat}
            className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelectConv(conv)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelectConv(conv);
              }}
              className={`group w-full text-left p-3 rounded-xl text-sm transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                activeConv?.id === conv.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{conv.metadata.name}</span>
              </div>
              <button
                onClick={(e) => handleDeleteConv(e, conv.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-opacity"
                aria-label="Delete conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              No conversations yet
            </p>
          )}
        </div>
      </div>

      <div
        className={`${
          showSidebarMobile ? "hidden md:flex" : "flex"
        } flex-col flex-1 bg-background`}
      >
        {activeConv ? (
          <>
            <div className="p-4 border-b flex items-center gap-3 bg-card">
              <button
                onClick={() => setShowSidebarMobile(true)}
                className="md:hidden p-1 rounded-lg hover:bg-muted"
                aria-label="Back to conversations"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Exam Coach AI</p>
                <p className="text-xs text-muted-foreground">
                  Your personalized exam preparation assistant
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConv.messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {isUser ? (
                        <p className="text-sm">{msg.content}</p>
                      ) : (
                        <MarkdownContent content={msg.content} />
                      )}
                      {msg.tool_calls?.map((tc, i) => (
                        <ToolCallBadge key={i} toolCall={tc} />
                      ))}
                    </div>
                    {isUser && (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                );
              })}
              {sending && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t p-4 bg-card">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your exam coach anything..."
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-md">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">
                Exam Coach AI
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Your dedicated AI coach for exam strategy, study planning,
                concept mastery, and performance analysis.
              </p>
              <button
                onClick={handleNewChat}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Start a Conversation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
