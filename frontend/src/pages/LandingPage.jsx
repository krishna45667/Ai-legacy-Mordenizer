import React from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 ${isDark ? "bg-[#0f1117] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>
      
      {/* ================= NAVBAR ================= */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-md ${isDark ? "border-slate-700 bg-[#0f1117]/90" : "border-slate-200 bg-white/80"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-mono text-blue-600">&lt;/&gt;</span>
            <span className={`text-lg font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>AI-Legacy</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className={`text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"}`}>
              Features
            </a>
            <a href="#how-it-works" className={`text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"}`}>
              How It Works
            </a>
          </nav>

          {/* Auth Buttons & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`rounded-lg p-2 transition-colors ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-yellow-400" : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"}`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              to="/login"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isDark ? "text-slate-300 hover:text-slate-100" : "text-slate-700 hover:text-slate-900"}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all shadow-blue-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
              
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                {/* Pill Badge */}
                <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium text-blue-600 shadow-sm ${isDark ? "border-blue-800 bg-blue-900/30" : "border-blue-200 bg-blue-50/80"}`}>
                  <span>Modernize • Refactor • Elevate</span>
                </div>

                {/* Main Headline */}
                <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[52px] lg:leading-[1.15] ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Modernize Legacy<br />
                  JavaScript Effortlessly
                </h1>

                {/* Subtitle */}
                <p className={`text-base leading-relaxed max-w-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  AI-Legacy helps developers automatically refactor old, messy JavaScript code into modern, efficient, and maintainable ES6+ code in seconds.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all shadow-blue-500/25"
                  >
                    Get Started for Free
                  </Link>
                  <Link
                    to="/workbench"
                    className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all shadow-xs ${isDark ? "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:border-slate-500" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400"}`}
                  >
                    <Play className={`h-3.5 w-3.5 fill-current ${isDark ? "text-slate-200" : "text-slate-700"}`} />
                    <span>View Demo</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Floating Code Visual & Badges */}
              <div className="relative flex items-center justify-center lg:col-span-6 lg:justify-end">
                
                {/* Decorative Background Rings & Glow */}
                <div className="absolute -inset-4 flex items-center justify-center pointer-events-none">
                  <div className={`h-96 w-96 rounded-full border ${isDark ? "border-blue-900/50" : "border-blue-100/80"}`}></div>
                  <div className={`absolute h-80 w-80 rounded-full border ${isDark ? "border-blue-800/30" : "border-blue-200/50"}`}></div>
                  <div className="absolute h-64 w-64 rounded-full bg-blue-400/10 filter blur-3xl"></div>
                </div>

                {/* Floating Code Card */}
                <div className="relative w-full max-w-[460px] rounded-2xl bg-slate-900/95 p-1 shadow-2xl backdrop-blur-xl border border-slate-800 animate-float-slow">
                  
                  {/* Window Titlebar */}
                  <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#EF4444]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#EAB308]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#22C55E]"></div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">legacy.js</span>
                    <div className="w-10"></div>
                  </div>

                  {/* Code Body */}
                  <div className="p-5 font-code text-[13px] leading-relaxed text-slate-300 overflow-x-auto">
                    <div>
                      <span className="text-purple-400 font-medium">function</span>{" "}
                      <span className="text-blue-400 font-medium">loadData</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-orange-300">userId</span>
                      <span className="text-slate-400">) {"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400 font-medium">var</span> self ={" "}
                      <span className="text-orange-300">this</span>;
                    </div>
                    <div className="h-2"></div>
                    <div className="pl-4">
                      <span className="text-blue-400 font-medium">$</span>.
                      <span className="text-yellow-300 font-medium">ajax</span>
                      <span className="text-slate-400">({"{"}</span>
                    </div>
                    <div className="pl-8 text-slate-300">
                      url: <span className="text-emerald-400">'/api/users/'</span> + userId,
                    </div>
                    <div className="pl-8 text-slate-300">
                      type: <span className="text-emerald-400">'GET'</span>,
                    </div>
                    <div className="pl-8 text-slate-300">
                      dataType: <span className="text-emerald-400">'json'</span>,
                    </div>
                    <div className="pl-8">
                      success: <span className="text-purple-400">function</span>
                      <span className="text-slate-400">(response) {"{"}</span>
                    </div>
                    <div className="pl-12">
                      <span className="text-blue-400">$</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-400">'#user'</span>
                      <span className="text-slate-400">).</span>
                      <span className="text-yellow-300">html</span>
                      <span className="text-slate-400">(response.name);</span>
                    </div>
                    <div className="pl-8 text-slate-400">{"}"}</div>
                    <div className="pl-4 text-slate-400">{"});"}</div>
                    <div className="text-slate-400">{"}"}</div>
                  </div>
                </div>

                {/* Floating Badge 1: Top Right "AI" */}
                <div className="absolute -top-3 right-0 sm:-right-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 animate-float-gentle">
                  AI
                </div>

                {/* Floating Badge 2: Middle Left "{}" */}
                <div className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white font-mono font-bold text-base shadow-lg shadow-emerald-500/30 animate-float-gentle" style={{ animationDelay: "1s" }}>
                  {"{}"}
                </div>

                {/* Floating Badge 3: Bottom Left "</>" */}
                <div className="absolute -bottom-3 left-6 sm:left-2 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white font-mono font-bold text-sm shadow-lg shadow-amber-500/30 animate-float-gentle" style={{ animationDelay: "2s" }}>
                  &lt;/&gt;
                </div>

                {/* Floating Badge 4: Bottom Right "ES6+" */}
                <div className="absolute -bottom-4 right-4 sm:-right-2 flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white font-bold text-xs tracking-wider shadow-lg shadow-blue-600/30 animate-float-gentle" style={{ animationDelay: "1.5s" }}>
                  ES6+
                </div>

              </div>

            </div>

            {/* ================= FEATURES ================= */}
            <div id="features" className="mt-20 scroll-mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              
              {[
                { icon: <Sparkles className="h-4 w-4" />, label: "AI-Powered Refactoring" },
                { icon: <Zap className="h-4 w-4" />, label: "ES6+ Best Practices" },
                { icon: <CheckCircle2 className="h-4 w-4" />, label: "Clean & Readable Code" },
                { icon: <Lock className="h-4 w-4" />, label: "Secure & Private" }
              ].map(({ icon, label }) => (
                <div key={label} className={`flex items-center gap-3 rounded-xl border p-4 shadow-xs transition hover:shadow-md ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`}>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isDark ? "bg-blue-900/40 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                    {icon}
                  </div>
                  <span className={`text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{label}</span>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className={`border-t py-16 scroll-mt-16 ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Workflow</span>
              <h2 className={`mt-2 text-3xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>How AI-Legacy Works</h2>
              <p className={`mt-3 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Turn legacy code into clean modern ES6+ in three straightforward steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "Paste or Select Code",
                  desc: "Choose from popular legacy patterns like jQuery AJAX, ES5 Prototypes, or paste your existing JS snippet."
                },
                {
                  num: "02",
                  title: "AI Refactoring Engine",
                  desc: "Our model transforms legacy callbacks and loops into async/await, modern destructuring, and template strings."
                },
                {
                  num: "03",
                  title: "Review Diff & Export",
                  desc: "Inspect the side-by-side diff, read the detailed explanation, and copy or download the modernized code."
                }
              ].map(({ num, title, desc }) => (
                <div key={num} className={`rounded-2xl border p-6 ${isDark ? "border-slate-700 bg-[#252d3d]" : "border-slate-200 bg-slate-50/50"}`}>
                  <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                    {num}
                  </div>
                  <h3 className={`font-semibold text-base mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>{title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className={`border-t py-6 ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-mono text-blue-600 font-bold">&lt;/&gt;</span>
            <span className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-800"}`}>AI-Legacy</span>
            <span>© 2026 AI-Legacy. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800 transition">Terms</a>
            <a href="#" className="hover:text-slate-800 transition">Privacy</a>
            <a href="#" className="hover:text-slate-800 transition">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}