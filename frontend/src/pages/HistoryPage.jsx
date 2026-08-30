import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HistoryDashboard from "../components/HistoryDashboard";
import { useTheme } from "../context/ThemeContext";

export default function HistoryPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLoadHistoryItem = (item) => {
    navigate("/workbench", {
      state: {
        historyItem: item
      }
    });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDark ? "bg-[#0f1117] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>
      <Header />
      <main className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6">
        <HistoryDashboard
          onLoadHistoryItem={handleLoadHistoryItem}
          onSwitchToWorkbench={() => navigate("/workbench")}
        />
      </main>
    </div>
  );
}