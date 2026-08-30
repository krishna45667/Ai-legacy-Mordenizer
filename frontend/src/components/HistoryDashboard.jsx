import React, { useState, useEffect } from "react";
import {
  History,
  Search,
  ExternalLink,
  Calendar,
  Code,
  RefreshCw,
  Trash2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function HistoryDashboard({
  onLoadHistoryItem,
  onSwitchToWorkbench
}) {
  const { token } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to load code history.");
      }

      const data = await res.json();
      setHistoryItems(data);
    } catch (err) {
      console.error("Fetch history error:", err);
      setError("Unable to load history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [token]);

  const handleDelete = async (id) => {
    if (!token) return;
    try {
      await fetch(`http://localhost:5000/api/history/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistoryItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete history error:", err);
    }
  };

  const filteredItems = historyItems.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      (item.title || "").toLowerCase().includes(search) ||
      (item.originalCode || "").toLowerCase().includes(search) ||
      (item.updatedCode || "").toLowerCase().includes(search) ||
      (item.explanation || "").toLowerCase().includes(search)
    );
  });

  // Common class helpers
  const cardClass = `rounded-xl border shadow-xs ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`;

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className={`${cardClass} p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div>
          <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            <History className="h-4 w-4 text-blue-500" />
            <span>Saved Refactoring History</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            View and reload your previously modernized JavaScript sessions.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className={`h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search history..."
              className={`w-full rounded-lg border pl-9 pr-3 py-1.5 text-xs placeholder:text-slate-400 focus:outline-none transition ${
                isDark
                  ? "border-slate-600 bg-slate-800 text-slate-200 focus:border-blue-500"
                  : "border-slate-300 bg-white text-slate-900 focus:border-blue-600"
              }`}
            />
          </div>

          <button
            onClick={fetchHistory}
            className={`rounded-lg border p-2 transition shadow-xs ${
              isDark
                ? "border-slate-600 bg-slate-800 text-slate-400 hover:bg-slate-700"
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            }`}
            title="Refresh History"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-blue-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div className={`${cardClass} p-12 text-center`}>
          <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2.5" />
          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Loading saved sessions...</p>
        </div>
      ) : error ? (
        <div className={`rounded-xl border p-4 text-center text-xs ${isDark ? "border-red-800 bg-red-900/20 text-red-400" : "border-red-200 bg-red-50 text-red-700"}`}>
          {error}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <Code className={`h-8 w-8 mx-auto mb-2 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
          <p className={`text-sm font-semibold mb-1 ${isDark ? "text-slate-200" : "text-slate-800"}`}>No Saved History Yet</p>
          <p className={`text-xs mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Your JavaScript modernization sessions will be automatically saved here.
          </p>
          <button
            onClick={onSwitchToWorkbench}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-xs"
          >
            Open Workbench
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const dateStr = new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <div
                key={item._id}
                className={`${cardClass} p-5 flex flex-col justify-between hover:shadow-md transition`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-medium flex items-center gap-1.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                      <Calendar className="h-3 w-3" />
                      {dateStr}
                    </span>
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      ES6+ Modernized
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    {item.title || "JavaScript Refactoring"}
                  </h3>

                  {/* Code snippet preview */}
                  <div className="rounded-lg bg-slate-900 p-3 text-[11px] font-mono text-slate-300 h-24 overflow-hidden relative mb-3">
                    <pre className="whitespace-pre">{item.updatedCode}</pre>
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
                  </div>

                  <p className={`text-xs line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {item.explanation}
                  </p>
                </div>

                <div className={`flex justify-between border-t pt-3 mt-4 ${isDark ? "border-slate-700" : "border-slate-100"}`}>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition shadow-xs ${
                      isDark
                        ? "border-red-800/60 text-red-400 hover:bg-red-900/20"
                        : "border-red-200 text-red-600 hover:bg-red-50"
                    }`}
                    title="Delete this session"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </button>

                  <button
                    onClick={() => {
                      onLoadHistoryItem(item);
                      onSwitchToWorkbench();
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition shadow-xs ${
                      isDark
                        ? "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Load in Editor</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}