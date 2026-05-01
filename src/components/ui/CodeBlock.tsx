"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "plaintext" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-surface-border bg-surface-inverse">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-surface-border/20 px-4 py-2.5">
        <span className="font-mono text-xs text-surface-foreground-subtle/60">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-surface-foreground-subtle/60 transition-colors hover:bg-surface-border/20 hover:text-surface-foreground-subtle"
        >
          {copied ? (
            <>
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 8l4 4 8-8"
                />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <rect x="5" y="5" width="9" height="9" rx="1.5" />
                <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <pre className="overflow-x-auto px-5 py-5 text-sm leading-relaxed">
        <code className="font-mono text-surface-foreground-subtle">{code}</code>
      </pre>
    </div>
  );
}
