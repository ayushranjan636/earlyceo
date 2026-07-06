"use client";

import { useCallback, useEffect, useState } from "react";
import type { EarlyBirdStatus } from "@/lib/google-sheets";
import { PRICING } from "@/lib/constants";

const DEFAULT_STATUS: EarlyBirdStatus = {
  count: 0,
  seatsLeft: PRICING.earlyBirdLimit,
  earlyBirdFull: false,
  earlyBirdLimit: PRICING.earlyBirdLimit,
  currentPrice: PRICING.earlyBirdPrice,
  regularPrice: PRICING.regularPrice,
};

export function useEarlyBirdStatus(refreshKey = 0) {
  const [status, setStatus] = useState<EarlyBirdStatus>(DEFAULT_STATUS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/leads/status", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as EarlyBirdStatus;
        setStatus(data);
      }
    } catch {
      // keep last known status
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh, refreshKey]);

  return { status, loading, refresh };
}
