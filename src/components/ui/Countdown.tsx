"use client";

import { useEffect, useMemo, useState } from "react";
import { COHORT } from "@/lib/constants";
import { getTimeLeftIST, IST_LABEL, toISTDate } from "@/lib/ist";

interface CountdownProps {
  targetDate?: Date | string;
  variant?: "default" | "hero";
  label?: string;
}

export function Countdown({
  targetDate,
  variant = "default",
  label,
}: CountdownProps) {
  const target = useMemo(() => {
    if (targetDate instanceof Date) return targetDate;
    return toISTDate(targetDate ?? COHORT.registrationCloseDate);
  }, [targetDate]);
  const [time, setTime] = useState(() => getTimeLeftIST(target));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeftIST(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: "D", value: time.days },
    { label: "H", value: time.hours },
    { label: "M", value: time.minutes },
    { label: "S", value: time.seconds },
  ];

  const isHero = variant === "hero";

  return (
    <div className="flex w-full flex-col items-center gap-2 text-center">
      {label && (
        <p
          className={
            isHero
              ? "w-full text-[10px] font-semibold uppercase tracking-[0.15em] text-hero-fg/40"
              : "w-full text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground"
          }
        >
          {label}
        </p>
      )}
      <div className="inline-flex justify-center gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={
              isHero
                ? "flex w-10 flex-col items-center sm:w-11"
                : "flex min-w-[44px] flex-col items-center rounded-lg border border-border px-2.5 py-1.5"
            }
          >
            <span
              className={
                isHero
                  ? "text-sm font-semibold tabular-nums text-hero-fg/70 sm:text-base"
                  : "text-lg font-bold tabular-nums text-foreground"
              }
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span
              className={
                isHero
                  ? "text-[9px] uppercase tracking-wider text-hero-fg/30"
                  : "text-[10px] uppercase tracking-wider text-muted-foreground"
              }
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      <p
        className={
          isHero
            ? "text-[9px] uppercase tracking-wider text-hero-fg/30"
            : "text-[10px] uppercase tracking-wider text-muted-foreground"
        }
      >
        {IST_LABEL}
      </p>
    </div>
  );
}
