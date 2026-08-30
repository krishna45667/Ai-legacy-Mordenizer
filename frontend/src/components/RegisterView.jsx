import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function RegisterView({
  onGoToLogin,
  onRegisterSuccess
}) {
  const { register } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);

      if (onRegisterSuccess) {
        onRegisterSuccess();
      } else {
        navigate("/workbench");
      }
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    if (onGoToLogin) {
      onGoToLogin();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDark ? "bg-[#0f1117] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <header className={`border-b ${isDark ? "border-slate-700 bg-[#1a1f2e]" : "border-slate-200 bg-white"}`}>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-mono text-blue-600">&lt;/&gt;</span>
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
              Already have an account?{" "}
              <button
                onClick={handleLoginClick}
                className="font-semibold text-blue-500 transition-colors hover:text-blue-400"
              >
                Login
              </button>
            </div>
          </div>

        </div>

      </header>


      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <main className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">


          {/* ================================================= */}
          {/* LEFT — REGISTER FORM */}
          {/* ================================================= */}

          <section className="order-2 lg:order-1 lg:col-span-5">

            <div className="mx-auto w-full max-w-[440px] lg:mx-0">

              {/* Heading */}

              <div className="mb-7">

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                  Create your account
                </p>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Start modernizing your code.
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Create your AI-Legacy account and turn outdated
                  JavaScript into cleaner, modern code.
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


              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Full Name */}

                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


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
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* Password */}

                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* Confirm Password */}

                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="text-base">→</span>
                    </>
                  )}

                </button>

              </form>


              {/* Terms */}

              <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">

                By creating an account, you agree to our{" "}

                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Terms of Service
                </a>

                {" "}and{" "}

                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>.

              </p>


              {/* Login */}

              <div className="mt-6 border-t border-slate-200 pt-5 text-center">

                <p className="text-xs text-slate-500">

                  Already have an account?{" "}

                  <button
                    onClick={handleLoginClick}
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Log in
                  </button>

                </p>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* RIGHT — DEVELOPER ILLUSTRATION */}
          {/* ================================================= */}

          <section className="order-1 hidden lg:order-2 lg:col-span-7 lg:block">

            <div className="relative mx-auto h-[540px] w-[560px] max-w-full">


              {/* --------------------------------------------- */}
              {/* BACKGROUND */}
              {/* --------------------------------------------- */}

              <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50" />

              <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100" />

              <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100/70" />


              {/* --------------------------------------------- */}
              {/* DOT PATTERN */}
              {/* --------------------------------------------- */}

              <div className="dot-pattern absolute right-2 top-2 h-28 w-40 rounded-xl" />


              {/* --------------------------------------------- */}
              {/* FLOATING CODE CARD — LEFT */}
              {/* --------------------------------------------- */}

              <div className="animate-float-gentle absolute left-0 top-28 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                <div className="flex h-8 items-center gap-1.5 border-b border-slate-200 px-3">

                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />

                  <span className="ml-1 font-mono text-[8px] text-slate-400">
                    modern.js
                  </span>

                </div>


                <div className="bg-slate-900 p-3 font-code text-[9px] leading-5">

                  <div>
                    <span className="text-purple-300">
                      const
                    </span>{" "}
                    loadUser =
                  </div>

                  <div className="text-blue-300">
                    async (id) =&gt; {"{"}
                  </div>

                  <div className="pl-3 text-green-300">
                    await fetch(...)
                  </div>

                  <div className="text-blue-300">
                    {"}"}
                  </div>

                </div>

                <div className="border-t border-slate-200 bg-white px-3 py-2">

                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                    Modernized
                  </span>

                </div>

              </div>


              {/* --------------------------------------------- */}
              {/* MAIN MONITOR */}
              {/* --------------------------------------------- */}

              <div className="absolute right-12 top-12 z-20 w-[350px]">

                <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

                  {/* Monitor header */}

                  <div className="flex h-9 items-center gap-1.5 border-b border-slate-700 bg-slate-800 px-3">

                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                    <span className="ml-2 font-mono text-[9px] text-slate-400">
                      legacy.js
                    </span>

                  </div>


                  {/* Monitor code */}

                  <div className="p-5 font-code text-[10px] leading-6">

                    <CodeLine number="01">
                      <span className="text-blue-300">
                        function
                      </span>{" "}
                      <span className="text-slate-200">
                        loadUserData
                      </span>
                      <span className="text-slate-300">
                        (userId) {"{"}
                      </span>
                    </CodeLine>

                    <CodeLine number="02">
                      <span className="text-purple-300">
                        var
                      </span>{" "}
                      <span className="text-slate-300">
                        self = this;
                      </span>
                    </CodeLine>

                    <CodeLine number="03">
                      <span className="text-green-300">
                        $.ajax
                      </span>
                      <span className="text-slate-300">
                        ({"{"}
                      </span>
                    </CodeLine>

                    <CodeLine number="04">
                      <span className="text-slate-300">
                        url:
                      </span>{" "}
                      <span className="text-green-300">
                        '/api/users/'
                      </span>
                    </CodeLine>

                    <CodeLine number="05">
                      <span className="text-slate-300">
                        success:
                      </span>{" "}
                      <span className="text-blue-300">
                        function
                      </span>
                      <span className="text-slate-300">
                        (response) {"{"}
                      </span>
                    </CodeLine>

                    <CodeLine number="06">
                      <span className="text-slate-500">
                        ...
                      </span>
                    </CodeLine>

                    <CodeLine number="07">
                      <span className="text-slate-300">
                        {"}"}
                      </span>
                    </CodeLine>

                  </div>

                </div>


                {/* Monitor stand */}

                <div className="mx-auto h-8 w-12 border-x-8 border-slate-400" />

                <div className="mx-auto h-2 w-28 rounded-full bg-slate-300" />

              </div>


              {/* --------------------------------------------- */}
              {/* DEVELOPER */}
              {/* --------------------------------------------- */}

              <div className="absolute bottom-24 left-[235px] z-30">


                {/* Chair */}

                <div className="absolute -left-3 top-16 h-36 w-28">

                  <div className="absolute left-5 top-0 h-24 w-20 rounded-xl bg-slate-300" />

                  <div className="absolute left-0 top-20 h-7 w-28 rounded-lg bg-slate-400" />

                  <div className="absolute left-[58px] top-24 h-20 w-2 bg-slate-500" />

                  <div className="absolute left-8 top-40 h-2 w-20 bg-slate-500" />

                </div>


                {/* Head */}

                <div className="relative ml-14 h-14 w-14 rounded-full bg-orange-200">

                  {/* Hair */}

                  <div className="absolute -top-1 left-1 h-8 w-12 rounded-t-full bg-slate-800" />

                  {/* Ear */}

                  <div className="absolute right-0 top-6 h-5 w-3 rounded-r-full bg-orange-200" />

                </div>


                {/* Body */}

                <div className="relative ml-10 mt-1 h-32 w-24">

                  <div className="absolute left-3 top-0 h-28 w-20 rounded-t-[28px] bg-blue-600" />


                  {/* Left arm */}

                  <div className="absolute left-[-16px] top-8 h-4 w-20 rotate-[18deg] rounded-full bg-blue-600" />

                  {/* Right arm */}

                  <div className="absolute right-[-25px] top-8 h-4 w-20 rotate-[-18deg] rounded-full bg-blue-600" />

                  {/* Hands */}

                  <div className="absolute left-[-22px] top-12 h-5 w-6 rounded-full bg-orange-200" />

                  <div className="absolute right-[-28px] top-12 h-5 w-6 rounded-full bg-orange-200" />

                </div>


                {/* Legs */}

                <div className="absolute left-14 top-40 h-24 w-5 rotate-[12deg] rounded-full bg-slate-700" />

                <div className="absolute left-28 top-40 h-24 w-5 rotate-[-12deg] rounded-full bg-slate-700" />

              </div>


              {/* --------------------------------------------- */}
              {/* DESK */}
              {/* --------------------------------------------- */}

              <div className="absolute bottom-20 left-24 z-40 w-[430px]">

                {/* Desk top */}

                <div className="h-4 rounded-full bg-slate-300 shadow-sm" />

                {/* Desk legs */}

                <div className="absolute left-8 top-3 h-28 w-2 bg-slate-400" />

                <div className="absolute right-8 top-3 h-28 w-2 bg-slate-400" />


                {/* Laptop */}

                <div className="absolute left-[135px] -top-16">

                  <div className="h-16 w-28 rounded-md border-4 border-slate-500 bg-slate-800">

                    <div className="p-2 font-code text-[7px] leading-3">

                      <div className="text-purple-300">
                        const user =
                      </div>

                      <div className="text-green-300">
                        await fetch()
                      </div>

                      <div className="text-blue-300">
                        response.json()
                      </div>

                    </div>

                  </div>

                  <div className="-ml-2 h-2 w-32 rounded-b-full bg-slate-500" />

                </div>


                {/* Coffee cup */}

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


              {/* --------------------------------------------- */}
              {/* FLOATING BLUE CODE BADGE */}
              {/* --------------------------------------------- */}

              <div className="animate-float-slow absolute right-0 top-24 z-40 rounded-xl bg-blue-600 px-4 py-3 text-white shadow-lg">

                <div className="font-code text-xs font-bold">
                  &lt;/&gt;
                </div>

                <div className="mt-1 text-[9px] font-semibold">
                  Modern Code
                </div>

              </div>


              {/* --------------------------------------------- */}
              {/* FLOATING CHECK CARD */}
              {/* --------------------------------------------- */}

              <div className="animate-float-gentle absolute bottom-4 right-0 z-50 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">

                <div className="text-xs font-bold text-slate-700">
                  Modern JavaScript
                </div>

                <div className="mt-2 space-y-1.5">

                  <MiniCheck text="Clean syntax" />

                  <MiniCheck text="Async / await" />

                  <MiniCheck text="ES6+ features" />

                </div>

              </div>


              {/* --------------------------------------------- */}
              {/* SMALL LABEL */}
              {/* --------------------------------------------- */}

              <div className="absolute bottom-20 left-0 z-50 rounded-lg border border-blue-100 bg-white px-3 py-2 shadow-md">

                <span className="font-code text-[10px] font-semibold text-blue-600">
                  legacy → modern
                </span>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


/* ========================================================= */
/* CODE LINE */
/* ========================================================= */

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


/* ========================================================= */
/* SMALL CHECK */
/* ========================================================= */

function MiniCheck({ text }) {
  return (
    <div className="flex items-center gap-2">

      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-[9px] text-emerald-600">
        ✓
      </span>

      <span className="text-[10px] text-slate-500">
        {text}
      </span>

    </div>
  );
}