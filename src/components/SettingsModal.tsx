import { useState } from "react";
import { KeyRound, Sparkles, User, X } from "lucide-react";
import { AISettings, UserProfile } from "../types";
import { storage } from "../services/storage";

interface SettingsModalProps {
  open: boolean;
  user: UserProfile | null;
  onClose: () => void;
  onUserUpdated: (user: UserProfile) => void;
}

export function SettingsModal({
  open,
  user,
  onClose,
  onUserUpdated,
}: SettingsModalProps) {
  const initialAI = storage.getAISettings();
  const [fullName, setFullName] = useState(user?.full_name || "Alex Aspirant");
  const [targetExam, setTargetExam] = useState(
    user?.target_exam || "UPSC CSE"
  );
  const [provider, setProvider] = useState<AISettings["provider"]>(
    initialAI.provider
  );
  const [apiKey, setApiKey] = useState(initialAI.apiKey);
  const [model, setModel] = useState(initialAI.model);
  const [saved, setSaved] = useState(false);

  if (!open) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = storage.updateUser({
      full_name: fullName.trim() || "Student",
      target_exam: targetExam.trim(),
    });
    storage.saveAISettings({ provider, apiKey, model });
    onUserUpdated(updatedUser);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-bold text-lg">
              Profile & AI Engine
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Student Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Target Exam
            </label>
            <input
              type="text"
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., UPSC CSE, JEE, GRE"
            />
          </div>

          <div className="border-t pt-4">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" /> AI Provider Mode
            </label>
            <select
              value={provider}
              onChange={(e) =>
                setProvider(e.target.value as AISettings["provider"])
              }
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="builtin">
                Built-in Engine (Offline Question Bank & Coach)
              </option>
              <option value="gemini">Google Gemini API (BYO Key)</option>
              <option value="openai">OpenAI API (BYO Key)</option>
            </select>
          </div>

          {provider !== "builtin" && (
            <>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  API Key (stored locally in your browser)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder={
                    provider === "gemini" ? "AIza..." : "sk-..."
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Model Override (optional)
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder={
                    provider === "gemini" ? "gemini-2.5-flash" : "gpt-4o-mini"
                  }
                />
              </div>
            </>
          )}

          <p className="text-xs text-muted-foreground">
            All data, scores, and API keys stay locally in your browser with
            zero third-party tracking.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
            >
              {saved ? "Saved!" : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
