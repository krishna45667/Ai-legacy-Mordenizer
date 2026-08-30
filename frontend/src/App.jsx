import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import WorkbenchPage from "./pages/WorkbenchPage";
import HistoryPage from "./pages/HistoryPage";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          Loading...
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/workbench" replace />;
  }

  return children;
}

function RegisterRoute() {
  const navigate = useNavigate();

  return (
    <RegisterView
      onGoToLogin={() => navigate("/login")}
      onRegisterSuccess={() => navigate("/workbench")}
    />
  );
}

function AppRoutes() {
  return (
    <Routes>

      {/* Landing page */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginView />
          </PublicOnlyRoute>
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterRoute />
          </PublicOnlyRoute>
        }
      />

      {/* Public Workbench */}
      <Route
        path="/workbench"
        element={<WorkbenchPage />}
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      {/* Unknown route */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}