import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function LoginView({
  onGoToRegister,
  onLoginSuccess
}) {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate("/workbench");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    if (onGoToRegister) {
      onGoToRegister();
    } else {
      navigate("/register");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDark ? "bg-[#0f1117] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <header className={`border-b ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`}>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold text-blue-600">&lt;/&gt;</span>
            <span className={`text-lg font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>AI-Legacy</span>
          </Link>


          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`rounded-lg p-2 transition-colors ${isDark ? "text-slate-400 hover:bg-slate-700 hover:text-yellow-400" : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"}`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Don't have an account?{" "}
              <button
                onClick={handleRegisterClick}
                className="font-semibold text-blue-500 transition-colors hover:text-blue-400"
              >
                Create one
              </button>
            </div>
          </div>

        </div>

      </header>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">


          {/* ================================================= */}
          {/* LEFT — LOGIN FORM */}
          {/* ================================================= */}

          <section className="order-2 lg:order-1 lg:col-span-5">

            <div className="mx-auto w-full max-w-[420px] lg:mx-0">

              {/* Heading */}

              <div className="mb-8">

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                  Welcome back
                </p>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Continue modernizing.
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in to access your workspace and previously
                  modernized JavaScript sessions.
                </p>

              </div>


              {/* Error */}

              {error && (
                <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">

                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                  <span>
                    {error}
                  </span>

                </div>
              )}


              {/* Login Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Email */}

                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* Password */}

                <div>

                  <div className="mb-1.5 flex items-center justify-between">

                    <label className="text-xs font-semibold text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-[11px] font-medium text-blue-600 hover:text-blue-700"
                      onClick={() =>
                        setError("Password reset is not available yet.")
                      }
                    >
                      Forgot password?
                    </button>

                  </div>

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="text-base">→</span>
                    </>
                  )}

                </button>

              </form>


              {/* Divider */}

              <div className="my-7 flex items-center gap-3">

                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                  AI-Legacy
                </span>

                <div className="h-px flex-1 bg-slate-200" />

              </div>


              {/* Features */}

              <div className="grid grid-cols-3 gap-2">

                <Feature
                  title="Modernize"
                  description="Legacy JS"
                />

                <Feature
                  title="Review"
                  description="Visual diff"
                />

                <Feature
                  title="Save"
                  description="Your history"
                />

              </div>


              {/* Register */}

              <div className="mt-7 border-t border-slate-200 pt-5 text-center">

                <p className="text-xs text-slate-500">

                  Don't have an account?{" "}

                  <button
                    onClick={handleRegisterClick}
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Create your account
                  </button>

                </p>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* RIGHT — DEVELOPER WORKSPACE */}
          {/* ================================================= */}

          <section className="order-1 hidden lg:order-2 lg:col-span-7 lg:block">

            <div className="relative mx-auto h-[540px] w-[560px] max-w-full">


              {/* Background */}

              <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50" />

              <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100" />


              {/* Dotted decoration */}

              <div className="dot-pattern absolute right-4 top-4 h-28 w-40 rounded-xl" />


              {/* ================================================= */}
              {/* OLD CODE CARD */}
              {/* ================================================= */}

              <div className="animate-float-gentle absolute left-0 top-20 z-40 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                <div className="flex h-8 items-center gap-1.5 border-b border-slate-200 px-3">

                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />

                  <span className="ml-1 font-mono text-[8px] text-slate-400">
                    legacy.js
                  </span>

                </div>

                <div className="bg-slate-900 p-3 font-code text-[9px] leading-5">

                  <div>
                    <span className="text-purple-300">
                      var
                    </span>{" "}
                    user =
                  </div>

                  <div className="text-green-300">
                    getUser(id);
                  </div>

                  <div className="text-blue-300">
                    callback(user);
                  </div>

                </div>

              </div>


              {/* ================================================= */}
              {/* MAIN MONITOR */}
              {/* ================================================= */}

              <div className="absolute right-10 top-14 z-20 w-[350px]">

                <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

                  {/* Monitor header */}

                  <div className="flex h-9 items-center gap-1.5 border-b border-slate-700 bg-slate-800 px-3">

                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />

                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                    <span className="ml-2 font-mono text-[9px] text-slate-400">
                      AI-Legacy / workspace
                    </span>

                  </div>


                  {/* Code */}

                  <div className="p-5 font-code text-[10px] leading-6">

                    <CodeLine number="01">
                      <span className="text-purple-300">
                        const
                      </span>{" "}
                      user ={" "}
                      <span className="text-green-300">
                        await
                      </span>{" "}
                      fetchUser(id);
                    </CodeLine>

                    <CodeLine number="02">
                      <span className="text-blue-300">
                        if
                      </span>{" "}
                      (user) {"{"}
                    </CodeLine>

                    <CodeLine number="03">
                      <span className="pl-4 text-slate-300">
                        console.log(user.name);
                      </span>
                    </CodeLine>

                    <CodeLine number="04">
                      {"}"}
                    </CodeLine>

                    <CodeLine number="05">
                      <span className="text-slate-500">
                        // modernized successfully
                      </span>
                    </CodeLine>

                  </div>

                </div>


                {/* Monitor stand */}

                <div className="mx-auto h-8 w-12 border-x-8 border-slate-400" />

                <div className="mx-auto h-2 w-28 rounded-full bg-slate-300" />

              </div>


              {/* ================================================= */}
              {/* DEVELOPER */}
              {/* ================================================= */}

              <div className="absolute bottom-24 left-[225px] z-30">

                {/* Chair */}

                <div className="absolute -left-3 top-16 h-36 w-28">

                  <div className="absolute left-5 top-0 h-24 w-20 rounded-xl bg-slate-300" />

                  <div className="absolute left-0 top-20 h-7 w-28 rounded-lg bg-slate-400" />

                  <div className="absolute left-[58px] top-24 h-20 w-2 bg-slate-500" />

                  <div className="absolute left-8 top-40 h-2 w-20 bg-slate-500" />

                </div>


                {/* Head */}

                <div className="relative ml-14 h-14 w-14 rounded-full bg-orange-200">

                  <div className="absolute -top-1 left-1 h-8 w-12 rounded-t-full bg-slate-800" />

                  <div className="absolute right-0 top-6 h-5 w-3 rounded-r-full bg-orange-200" />

                </div>


                {/* Body */}

                <div className="relative ml-10 mt-1 h-32 w-24">

                  <div className="absolute left-3 top-0 h-28 w-20 rounded-t-[28px] bg-blue-600" />

                  <div className="absolute left-[-16px] top-8 h-4 w-20 rotate-[18deg] rounded-full bg-blue-600" />

                  <div className="absolute right-[-25px] top-8 h-4 w-20 rotate-[-18deg] rounded-full bg-blue-600" />

                  <div className="absolute left-[-22px] top-12 h-5 w-6 rounded-full bg-orange-200" />

                  <div className="absolute right-[-28px] top-12 h-5 w-6 rounded-full bg-orange-200" />

                </div>


                {/* Legs */}

                <div className="absolute left-14 top-40 h-24 w-5 rotate-[12deg] rounded-full bg-slate-700" />

                <div className="absolute left-28 top-40 h-24 w-5 rotate-[-12deg] rounded-full bg-slate-700" />

              </div>


              {/* ================================================= */}
              {/* DESK */}
              {/* ================================================= */}

              <div className="absolute bottom-20 left-24 z-40 w-[430px]">

                <div className="h-4 rounded-full bg-slate-300 shadow-sm" />

                <div className="absolute left-8 top-3 h-28 w-2 bg-slate-400" />

                <div className="absolute right-8 top-3 h-28 w-2 bg-slate-400" />


                {/* Laptop */}

                <div className="absolute left-[135px] -top-16">

                  <div className="h-16 w-28 rounded-md border-4 border-slate-500 bg-slate-800">

                    <div className="p-2 font-code text-[7px] leading-3">

                      <div className="text-purple-300">
                        const data =
                      </div>

                      <div className="text-green-300">
                        await fetch()
                      </div>

                      <div className="text-blue-300">
                        data.json()
                      </div>

                    </div>

                  </div>

                  <div className="-ml-2 h-2 w-32 rounded-b-full bg-slate-500" />

                </div>


                {/* Coffee */}

                <div className="absolute right-24 -top-10 h-8 w-7 rounded-b-md border border-slate-300 bg-white">

                  <div className="absolute -right-3 top-1.5 h-4 w-3 rounded-r-full border-2 border-slate-300" />

                </div>


                {/* Plant */}

                <div className="absolute left-5 -top-12">

                  <div className="h-8 w-8 rounded-b-lg bg-orange-200" />

                  <div className="absolute -left-1 -top-8 h-10 w-5 rotate-[-20deg] rounded-full bg-green-500" />

                  <div className="absolute left-4 -top-9 h-10 w-5 rotate-[20deg] rounded-full bg-green-600" />

                </div>

              </div>


              {/* ================================================= */}
              {/* MODERN CODE CARD */}
              {/* ================================================= */}

              <div className="animate-float-slow absolute bottom-8 right-0 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                <div className="border-b border-slate-200 px-3 py-2">

                  <div className="flex items-center justify-between">

                    <span className="font-mono text-[9px] font-semibold text-slate-700">
                      modern.js
                    </span>

                    <span className="text-[8px] font-bold text-emerald-600">
                      READY
                    </span>

                  </div>

                </div>

                <div className="bg-slate-900 p-3 font-code text-[9px] leading-5">

                  <div className="text-purple-300">
                    const user =
                  </div>

                  <div className="text-green-300">
                    await fetch(...)
                  </div>

                  <div className="text-blue-300">
                    user.json()
                  </div>

                </div>

              </div>


              {/* ================================================= */}
              {/* SMALL LABEL */}
              {/* ================================================= */}

              <div className="absolute bottom-16 left-0 z-50 rounded-lg border border-blue-100 bg-white px-3 py-2 shadow-md">

                <span className="font-mono text-[10px] font-semibold text-blue-600">
                  legacy → modern
                </span>

              </div>


              {/* ================================================= */}
              {/* BLUE BADGE */}
              {/* ================================================= */}

              <div className="animate-float-slow absolute right-0 top-28 z-50 rounded-xl bg-blue-600 px-4 py-3 text-white shadow-lg">

                <div className="font-mono text-xs font-bold">
                  &lt;/&gt;
                </div>

                <div className="mt-1 text-[9px] font-semibold">
                  Clean JavaScript
                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


/* ================================================= */
/* FEATURE */
/* ================================================= */

function Feature({ title, description }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">

      <div className="text-[11px] font-bold text-slate-700">
        {title}
      </div>

      <div className="mt-1 text-[9px] text-slate-400">
        {description}
      </div>

    </div>
  );
}


/* ================================================= */
/* CODE LINE */
/* ================================================= */

function CodeLine({ number, children }) {
  return (
    <div className="flex">

      <span className="mr-3 w-4 select-none text-right text-slate-600">
        {number}
      </span>

      <span>
        {children}
      </span>

    </div>
  );
}