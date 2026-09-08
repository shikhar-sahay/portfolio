'use client';

import { useEffect, useState } from 'react';

function formatBangalore(): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  }).format(new Date());
}

/**
 * Footer clock: a small living detail below the Email action, not a
 * dashboard module. Minute precision, 24-hour IST, Bangalore identity.
 * Hydration-safe: server and first client paint agree on a placeholder,
 * live time swaps in after mount. Refreshes every 20 seconds so minute
 * rollover lands promptly without per-second busyness. Time content
 * changing is content, not decorative motion, so reduced motion keeps it.
 */
export function FooterClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatBangalore());
    const id = window.setInterval(() => setTime(formatBangalore()), 20000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p aria-label={time ? `Local time ${time} IST, Bangalore` : 'Local time, Bangalore'}>
      <span className="mt-6 block text-sm font-medium tabular-nums tracking-tight text-ink">
        {time ?? '--:--'} IST
      </span>
      <span className="mt-1 block text-micro uppercase tracking-[0.16em] text-muted">
        Bangalore
      </span>
    </p>
  );
}
