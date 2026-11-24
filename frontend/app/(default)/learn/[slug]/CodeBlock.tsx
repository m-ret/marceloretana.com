"use client";

import { useState } from "react";

interface Props {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: Props) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-secondary border-b border-border">
        <div className="flex items-center gap-3">
          {filename && <span className="text-xs text-fg-secondary">{filename}</span>}
          <span className="text-[10px] text-fg-muted uppercase tracking-wider">{language}</span>
        </div>
        <button
          onClick={copyCode}
          className="text-[10px] text-fg-secondary hover:text-accent-fg transition-colors uppercase tracking-wider cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}
      {/* Scrolls sideways when a line is long, so keyboard users must be able to focus it. */}
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region has to be focusable */}
      <pre className="p-4 overflow-x-auto" tabIndex={0}>
        <code className="text-sm text-fg-secondary leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
