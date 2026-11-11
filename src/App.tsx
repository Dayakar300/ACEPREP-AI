import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SettingsModal } from "./components/SettingsModal";
import { AICoachPage } from "./pages/AICoachPage";
import { AIGuidancePage } from "./pages/AIGuidancePage";
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
} from "./pages/AuthPages";
import { DashboardPage } from "./pages/DashboardPage";
import { ExamSessionPage } from "./pages/ExamSessionPage";
import { ExamsPage } from "./pages/ExamsPage";
import { HomePage } from "./pages/HomePage";
import { storage } from "./services/storage";
import { UserProfile } from "./types";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AppLayout({
  user,
  onUserChange,
  onOpenSettings,
}: {
  user: UserProfile | null;
  onUserChange: (u: UserProfile | null) => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        user={user}
        onUserChange={onUserChange}
        onOpenSettings={onOpenSettings}
      />
      <Outlet />
    </div>
  );
}

export function App() {
  const [user, setUser] = useState<UserProfile | null>(() => storage.getUser());
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage onAuth={setUser} />} />
        <Route path="/register" element={<RegisterPage onAuth={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          element={
            user ? (
              <AppLayout
                user={user}
                onUserChange={setUser}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exam/:id" element={<ExamSessionPage />} />
          <Route path="/ai-guidance" element={<AIGuidancePage />} />
          <Route path="/ai-coach" element={<AICoachPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <SettingsModal
        open={settingsOpen}
        user={user}
        onClose={() => setSettingsOpen(false)}
        onUserUpdated={setUser}
      />
    </BrowserRouter>
  );
}

export default App;
