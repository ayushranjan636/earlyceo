"use client";

import { useEffect, useState } from "react";
import { COHORT } from "@/lib/constants";

interface CountdownProps {
  targetDate?: Date | string;
  variant?: "default" | "hero";
  label?: string;
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({
  targetDate,
  variant = "default",
  label,
}: CountdownProps) {
  const target = new Date(targetDate ?? COHORT.registrationCloseDate);
  const [time, setTime] = useState(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(target)), 1000);
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
    <div className="flex flex-col items-center gap-2">
      {label && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-hero-fg/40">
          {label}
        </p>
      )}
      <div className="flex justify-center gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={
              isHero
                ? "flex min-w-[40px] flex-col items-center sm:min-w-[44px]"
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
    </div>
  );
}
