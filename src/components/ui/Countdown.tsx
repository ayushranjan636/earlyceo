"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate?: Date;
  variant?: "default" | "hero";
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

export function Countdown({ targetDate, variant = "default" }: CountdownProps) {
  const target = targetDate ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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
    <div className="flex gap-2">
      {units.map((unit) => (
        <div
          key={unit.label}
          className={
            isHero
              ? "flex flex-col items-center min-w-[36px]"
              : "flex flex-col items-center rounded-lg border border-border px-2.5 py-1.5 min-w-[44px]"
          }
        >
          <span
            className={
              isHero
                ? "text-sm font-semibold tabular-nums text-hero-fg/70"
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
  );
}
