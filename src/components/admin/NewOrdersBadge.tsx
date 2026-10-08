"use client";

import { useEffect, useState } from "react";
import { useLive } from "./LiveProvider";

export default function NewOrdersBadge() {
  // const { now, pending, checkedAt } = useLive();

  const { pending, checkedAt } = useLive();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (pending === null) return null;
  const seconds = now && checkedAt ? Math.max(0, Math.round((now - checkedAt) / 1000)) : 0;
  return (
    <div className="mx-3 mt-4 rounded-lg bg-white/10 px-3 py-2 text-xs" data-testid="new-orders-badge">
      <span className="font-semibold text-white">{pending} order menunggu</span>
      <span className="block text-white/60">dicek {seconds} dtk lalu</span>
    </div>
  );
}
