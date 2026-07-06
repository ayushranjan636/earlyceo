"use client";

import { useCallback, useEffect, useState } from "react";
import type { CohortStatus } from "@/lib/google-sheets";
import { PRICING } from "@/lib/constants";

const DEFAULT_STATUS: CohortStatus = {
  count: 0,
  seatsLeft: PRICING.seatLimit,
  cohortFull: false,
  seatLimit: PRICING.seatLimit,
  price: PRICING.price,
};

export function useCohortStatus(refreshKey = 0) {
  const [status, setStatus] = useState<CohortStatus>(DEFAULT_STATUS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/leads/status", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as CohortStatus;
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
