import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, ChevronDown, Menu, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Header({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const isWorkbench = location.pathname === "/workbench" || location.pathname === "/";
  const isHistory = location.pathname === "/history";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const displayName = user?.name || "User";
  const firstLetter = displayName.charAt(0).toUpperCase();
  const isDark = theme === "dark";

  return (
    <header className={`sticky top-0 z-40 border-b ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`}>
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        
        {/* Left: Brand & Hamburger Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-mono text-blue-600">&lt;/&gt;</span>
            <span className={`text-base font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>AI-Legacy</span>
          </Link>

          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              title="Toggle Sidebar"
              className={`rounded-lg p-1.5 transition-colors ${isDark ? "text-slate-400 hover:bg-slate-700 hover:text-slate-200" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Center: Workbench & History Tabs */}
        <nav className="flex items-center h-full space-x-8">
          <Link
            to="/workbench"
            className={`flex items-center h-14 border-b-2 text-xs sm:text-sm font-semibold transition-all px-1 ${
              isWorkbench
                ? "border-blue-600 text-blue-500"
                : `border-transparent ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"}`
            }`}
          >
            Workbench
          </Link>

          <Link
            to="/history"
            className={`flex items-center h-14 border-b-2 text-xs sm:text-sm font-semibold transition-all px-1 ${
              isHistory
                ? "border-blue-600 text-blue-500"
                : `border-transparent ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"}`
            }`}
          >
            History
          </Link>
        </nav>

        {/* Right: Theme Toggle & User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`rounded-lg p-1.5 transition-colors ${isDark ? "text-slate-400 hover:bg-slate-700 hover:text-yellow-400" : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"}`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-2 rounded-full p-1 transition-colors ${isDark ? "text-slate-300 hover:bg-slate-700" : "text-slate-700 hover:bg-slate-100"}`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-xs">
                {firstLetter}
              </div>
              <span className={`hidden sm:inline text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                {displayName}
              </span>
              <ChevronDown className={`h-3.5 w-3.5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-xl border py-1 shadow-lg z-50 ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`}>
                <div className={`px-3.5 py-2 border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}>
                  <p className={`text-xs font-bold ${isDark ? "text-slate-100" : "text-slate-800"}`}>{displayName}</p>
                  <p className={`text-[11px] truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>{user?.email || "developer@example.com"}</p>
                </div>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/history");
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 transition-colors ${isDark ? "text-slate-300 hover:bg-slate-700" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  <User className={`h-3.5 w-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                  Saved Sessions
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    handleLogout();
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs text-red-500 hover:bg-red-50/10 flex items-center gap-2 border-t transition-colors ${isDark ? "border-slate-700" : "border-slate-100"}`}
                >
                  <LogOut className="h-3.5 w-3.5 text-red-500" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}