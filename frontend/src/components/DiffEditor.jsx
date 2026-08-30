import React, { useState, useRef } from 'react';
import { Copy, Download, Check, FileText, CheckCircle2, Columns, Eye } from 'lucide-react';
import * as Diff from 'diff';
import { useTheme } from '../context/ThemeContext';

export default function DiffEditor({
  inputCode,
  setInputCode,
  modernizedCode,
  explanation,
  keyImprovements
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('clean'); // 'clean' or 'diff'

  const inputLineNumRef = useRef(null);
  const outputLineNumRef = useRef(null);

  const handleCopy = () => {
    if (!modernizedCode) return;
    navigator.clipboard.writeText(modernizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!modernizedCode) return;
    const blob = new Blob([modernizedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modernized.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleInputScroll = (e) => {
    if (inputLineNumRef.current) {
      inputLineNumRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleOutputScroll = (e) => {
    if (outputLineNumRef.current) {
      outputLineNumRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const diffChunks = modernizedCode ? Diff.diffLines(inputCode, modernizedCode) : [];
  const inputLines = inputCode.split('\n');
  const outputLines = modernizedCode ? modernizedCode.split('\n') : [];

  const defaultImprovements = [
    "Replaced jQuery AJAX with Fetch API",
    "Used async/await for better flow",
    "Template literals for HTML",
    "Modern DOM API usage",
    "Better error handling structure"
  ];

  const improvementsList = (keyImprovements && keyImprovements.length > 0)
    ? keyImprovements
    : defaultImprovements;

  // Panel wrapper classes
  const panelClass = `rounded-xl border shadow-xs overflow-hidden flex flex-col h-[580px] ${
    isDark ? 'border-slate-700 bg-[#1a1f2e]' : 'border-slate-200 bg-white'
  }`;
  const headerClass = `flex items-center justify-between border-b px-4 py-2.5 shrink-0 ${
    isDark ? 'border-slate-700 bg-[#1a1f2e]' : 'border-slate-200 bg-white'
  }`;
  const titleClass = `text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`;
  const lineNumClass = `w-11 select-none border-r py-3 pr-2.5 text-right font-mono text-xs text-slate-500 leading-6 overflow-hidden shrink-0 ${
    isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-slate-50/70'
  }`;
  const controlBtnClass = `inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition shadow-xs disabled:opacity-40 ${
    isDark
      ? 'border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700'
      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
  }`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start w-full">
      
      {/* ================= LEFT PANE: LEGACY CODE (INPUT) ================= */}
      <div className={`xl:col-span-4 min-w-0 ${panelClass}`}>
        {/* Header */}
        <div className={headerClass}>
          <span className={titleClass}>Legacy Code (Input)</span>
          <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {inputLines.length} lines
          </span>
        </div>

        {/* Editor Body */}
        <div className={`flex flex-1 overflow-hidden font-mono text-xs ${isDark ? 'bg-[#1a1f2e]' : 'bg-white'}`}>
          {/* Line Numbers */}
          <div ref={inputLineNumRef} className={lineNumClass}>
            {inputLines.map((_, i) => (
              <div key={i} className="h-6">{i + 1}</div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            onScroll={handleInputScroll}
            wrap="off"
            spellCheck={false}
            placeholder="// Paste your legacy JavaScript code here..."
            className={`flex-1 resize-none py-3 px-3.5 font-mono text-xs leading-6 focus:outline-none overflow-x-auto overflow-y-auto whitespace-pre ${
              isDark
                ? 'bg-[#1a1f2e] text-slate-200 placeholder:text-slate-600 caret-blue-400'
                : 'bg-white text-slate-800 placeholder:text-slate-400'
            }`}
            style={{ tabSize: 2 }}
          />
        </div>
      </div>

      {/* ================= MIDDLE PANE: MODERNIZED CODE (OUTPUT) ================= */}
      <div className={`xl:col-span-5 min-w-0 ${panelClass}`}>
        {/* Header with Mode Switcher and Actions */}
        <div className={`flex flex-wrap items-center justify-between border-b px-4 py-2 gap-2 shrink-0 ${
          isDark ? 'border-slate-700 bg-[#1a1f2e]' : 'border-slate-200 bg-white'
        }`}>
          <span className={titleClass}>Modernized Code (Output)</span>

          <div className="flex items-center gap-1.5">
            {/* View Mode Switcher */}
            <div className={`flex items-center rounded-lg border p-0.5 ${isDark ? 'border-slate-600 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
              <button
                type="button"
                onClick={() => setViewMode('diff')}
                className={`rounded-md px-2 py-1 text-[11px] font-medium transition flex items-center gap-1 ${
                  viewMode === 'diff'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns className="h-3 w-3" />
                <span>Diff View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('clean')}
                className={`rounded-md px-2 py-1 text-[11px] font-medium transition flex items-center gap-1 ${
                  viewMode === 'clean'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="h-3 w-3" />
                <span>Clean Code</span>
              </button>
            </div>

            {/* Copy */}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!modernizedCode}
              className={controlBtnClass}
              title="Copy modernized code"
            >
              {copied
                ? <Check className="h-3 w-3 text-emerald-500" />
                : <Copy className={`h-3 w-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Download */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={!modernizedCode}
              className={controlBtnClass}
              title="Download as .js file"
            >
              <Download className={`h-3 w-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Editor Output Body */}
        <div className={`flex flex-1 overflow-hidden font-mono text-xs ${isDark ? 'bg-[#1a1f2e]' : 'bg-white'}`}>
          {!modernizedCode ? (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
              <FileText className={`mb-2 h-8 w-8 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
              <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>No Modernized Output Yet</p>
              <p className={`mt-1 text-[11px] max-w-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Click <strong>"Modernize JS"</strong> to transform your legacy code.
              </p>
            </div>
          ) : viewMode === 'clean' ? (
            /* Clean Code View */
            <div className="flex w-full h-full overflow-hidden">
              <div ref={outputLineNumRef} className={lineNumClass}>
                {outputLines.map((_, i) => (
                  <div key={i} className="h-6">{i + 1}</div>
                ))}
              </div>
              <pre
                onScroll={handleOutputScroll}
                className={`flex-1 py-3 px-3.5 font-mono text-xs leading-6 overflow-x-auto overflow-y-auto whitespace-pre m-0 ${
                  isDark ? 'text-slate-200 bg-[#1a1f2e]' : 'text-slate-800 bg-white'
                }`}
                style={{ tabSize: 2 }}
              >
                {modernizedCode}
              </pre>
            </div>
          ) : (
            /* Diff Mode */
            <div className="flex-1 overflow-x-auto overflow-y-auto p-3 font-mono text-xs leading-6 w-full">
              <div className="min-w-fit">
                {diffChunks.map((chunk, index) => {
                  const lines = chunk.value.replace(/\n$/, '').split('\n');
                  return lines.map((line, lIdx) => {
                    let lineClass = isDark ? 'text-slate-400 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-50/50';
                    let prefix = ' ';
                    let bgClass = '';
                    if (chunk.added) {
                      lineClass = 'text-emerald-400 font-medium';
                      bgClass = 'bg-emerald-900/20 border-l-2 border-emerald-500';
                      prefix = '+';
                    } else if (chunk.removed) {
                      lineClass = isDark ? 'text-red-400 line-through opacity-60' : 'text-red-700 line-through opacity-70';
                      bgClass = isDark ? 'bg-red-900/20 border-l-2 border-red-600' : 'bg-red-50/80 border-l-2 border-red-500';
                      prefix = '-';
                    }
                    return (
                      <div
                        key={`${index}-${lIdx}`}
                        className={`flex items-center px-2 py-0.5 rounded-xs transition-colors ${bgClass} ${lineClass}`}
                      >
                        <span className="w-5 select-none font-mono text-xs opacity-60 shrink-0 font-bold">
                          {prefix}
                        </span>
                        <span className="whitespace-pre">{line}</span>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= RIGHT PANE: EXPLANATION & IMPROVEMENTS ================= */}
      <div className={`xl:col-span-3 min-w-0 rounded-xl border p-5 shadow-xs flex flex-col h-[580px] overflow-y-auto ${
        isDark ? 'border-slate-700 bg-[#1a1f2e]' : 'border-slate-200 bg-white'
      }`}>
        
        {/* Explanation Section */}
        <div className="mb-5">
          <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
            Explanation
          </h2>
          <p className={`text-xs leading-relaxed whitespace-pre-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {explanation ||
              "The legacy code used jQuery AJAX and callbacks. It has been modernized using the Fetch API with async/await, template literals for cleaner string handling, and destructuring for better readability."}
          </p>
        </div>

        {/* Divider */}
        <div className={`border-t my-1 shrink-0 ${isDark ? 'border-slate-700' : 'border-slate-100'}`}></div>

        {/* Key Improvements Section */}
        <div className="mt-4 flex-1">
          <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
            Key Improvements
          </h2>

          <div className="space-y-2.5">
            {improvementsList.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                <span className={`leading-snug ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
