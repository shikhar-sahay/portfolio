'use client';

import { useState } from 'react';

/**
 * Copy-to-clipboard row for values with no public URL (Discord username).
 * Falls back gracefully when the clipboard API is unavailable.
 */
export function CopyText({
  text,
  label,
  className,
}: {
  text: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={copied ? 'Copied' : `Copy ${label}`}
      aria-label={copied ? `${label} copied` : `Copy ${label} ${text}`}
      className={`group inline-flex cursor-pointer items-baseline gap-2 text-sm transition-colors duration-300 ${
        className ?? 'text-muted hover:text-ink'
      }`}
    >
      <span aria-hidden="true" className="inline-block text-accent">
        ◎
      </span>
      {label}
      <span aria-hidden="true" className="text-muted/60 text-micro uppercase tracking-[0.12em]">
        {copied ? 'copied' : text}
      </span>
    </button>
  );
}
