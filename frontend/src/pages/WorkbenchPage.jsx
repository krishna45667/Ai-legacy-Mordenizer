import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import DiffEditor from "../components/DiffEditor";
import { LEGACY_PRESETS } from "../data/presets";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  FileCode,
  Layers,
  GitMerge,
  Zap,
  Scale,
  Code,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function WorkbenchPage() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState(LEGACY_PRESETS[0]);
  const [inputCode, setInputCode] = useState(LEGACY_PRESETS[0].code);
  const [modernizedCode, setModernizedCode] = useState(LEGACY_PRESETS[0].modernizedCode);
  const [explanation, setExplanation] = useState(LEGACY_PRESETS[0].explanation);
  const [keyImprovements, setKeyImprovements] = useState(LEGACY_PRESETS[0].keyImprovements);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  /* Load history item when navigating from History page */
  useEffect(() => {
    const historyItem = location.state?.historyItem;
    if (!historyItem) return;

    setInputCode(historyItem.originalCode || "");
    setModernizedCode(historyItem.updatedCode || "");
    setExplanation(historyItem.explanation || "");
    setKeyImprovements(historyItem.changes || []);
    setSelectedPreset(null);
    setError(null);
    setSaveStatus(null);

    window.history.replaceState({}, document.title);
  }, [location.state]);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setInputCode(preset.code);
    setModernizedCode(preset.modernizedCode || "");
    setExplanation(preset.explanation || "");
    setKeyImprovements(preset.keyImprovements || []);
    setError(null);
    setSaveStatus(null);
  };

  const handleClear = () => {
    setInputCode("");
    setModernizedCode("");
    setExplanation("");
    setKeyImprovements([]);
    setSelectedPreset(null);
    setError(null);
    setSaveStatus(null);
  };

  const handleModernize = async () => {
    if (!inputCode.trim()) {
      setError("Please enter or paste legacy JavaScript code first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSaveStatus(null);

    try {
      const response = await fetch("http://localhost:5000/api/modernize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: inputCode })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to modernize code. Please try again."
        );
      }

      const data = await response.json();
      setModernizedCode(data.updatedCode || "");
      setExplanation(data.explanation || "");
      if (data.changes && data.changes.length > 0) {
        setKeyImprovements(data.changes);
      }

      if (token) {
        await saveToHistory(data, inputCode);
      } else {
        setSaveStatus("Sign in to save this session to your history.");
        setTimeout(() => setSaveStatus(null), 4000);
      }
    } catch (err) {
      console.error("Modernization failed:", err);
      // If server is not reachable or fails, fallback to local intelligent transformation if preset matches
      if (selectedPreset && selectedPreset.modernizedCode) {
        setModernizedCode(selectedPreset.modernizedCode);
        setExplanation(selectedPreset.explanation);
        setKeyImprovements(selectedPreset.keyImprovements);
      } else {
        setError(err.message || "Unable to connect to AI backend.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveToHistory = async (modernizedData, rawCode) => {
    try {
      const response = await fetch("http://localhost:5000/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: selectedPreset?.title || "JavaScript Refactoring Session",
          originalCode: rawCode,
          updatedCode: modernizedData.updatedCode,
          explanation: modernizedData.explanation,
          metrics: modernizedData.metrics,
          changes: modernizedData.changes || keyImprovements,
          warnings: modernizedData.warnings
        })
      });

      if (response.ok) {
        setSaveStatus("Saved to your history.");
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (err) {
      console.error("Auto-save error:", err);
    }
  };

  const getPresetIcon = (iconName) => {
    switch (iconName) {
      case "file-code":
        return <FileCode className="h-4 w-4" />;
      case "layers":
        return <Layers className="h-4 w-4" />;
      case "git-merge":
        return <GitMerge className="h-4 w-4" />;
      case "zap":
        return <Zap className="h-4 w-4" />;
      case "scale":
        return <Scale className="h-4 w-4" />;
      case "code":
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDark ? "bg-[#0f1117] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>
      
      {/* Top Header Bar */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ================= LEFT SIDEBAR (PRESETS) ================= */}
        <aside
          className={`border-r transition-all duration-200 ease-in-out flex flex-col justify-between shrink-0 h-full overflow-hidden ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"} ${
            sidebarOpen ? "w-64" : "w-0 -translate-x-full overflow-hidden border-none"
          }`}
        >
          <div className="flex-1 overflow-y-auto p-4">
            {/* Presets Title & Subtitle */}
            <div className="mb-3 px-2">
              <p className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                EXAMPLE PRESETS
              </p>
              <p className={`text-[10px] mt-0.5 leading-tight ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Try an example or paste your own JavaScript.
              </p>
            </div>

            {/* Presets List */}
            <div className="space-y-1">
              {LEGACY_PRESETS.map((preset) => {
                const isSelected = selectedPreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition text-left ${
                      isSelected
                        ? "bg-blue-600/10 text-blue-500 font-semibold"
                        : isDark
                          ? "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className={`shrink-0 ${isSelected ? "text-blue-500" : isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {getPresetIcon(preset.icon)}
                    </span>
                    <span className="truncate">{preset.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Sidebar Card: Upgrade Your Code */}
          <div className={`p-4 border-t ${isDark ? "border-slate-700" : "border-slate-100"}`}>
            <div className={`rounded-xl border p-3.5 space-y-1.5 ${isDark ? "border-blue-900/50 bg-blue-900/20" : "border-blue-100 bg-blue-50/60"}`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500">
                <Zap className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
                <span>Upgrade Your Code</span>
              </div>
              <p className={`text-[11px] leading-snug ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Transform old JavaScript into modern, efficient, and maintainable code.
              </p>
            </div>
          </div>
        </aside>

        {/* ================= WORKBENCH MAIN AREA ================= */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 ${isDark ? "bg-[#0f1117]" : "bg-[#F8FAFC]"}`}>
          
          {/* Notifications */}
          {saveStatus && (
            <div className={`mb-4 flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs ${isDark ? "border-emerald-800 bg-emerald-900/30 text-emerald-400" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
              <CheckCircle2 className="h-4 w-4" />
              <span>{saveStatus}</span>
            </div>
          )}

          {error && (
            <div className={`mb-4 flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs ${isDark ? "border-red-800 bg-red-900/30 text-red-400" : "border-red-200 bg-red-50 text-red-700"}`}>
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Subheader: Source/Target Info & Action Buttons */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Transformation Indicator */}
            <div className={`flex items-center gap-2 text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-700"}`}>
              <span>Source: <strong className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-900"}`}>Legacy JavaScript</strong></span>
              <ArrowRight className={`h-3.5 w-3.5 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
              <span>Target: <strong className="font-semibold text-blue-500">Modern ES6+</strong></span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition shadow-xs ${isDark ? "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
              >
                Clear
              </button>

              <button
                type="button"
                onClick={handleModernize}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition disabled:opacity-60 shadow-blue-500/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Modernizing your code...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Modernize JS</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3-Column Diff & Output Editor */}
          <DiffEditor
            inputCode={inputCode}
            setInputCode={setInputCode}
            modernizedCode={modernizedCode}
            explanation={explanation}
            keyImprovements={keyImprovements}
          />

        </main>

      </div>

    </div>
  );
}