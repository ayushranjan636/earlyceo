"use client";

import { ArrowUpRight } from "lucide-react";
import { useJoinBootcamp } from "@/components/providers/JoinBootcampProvider";
import { cn } from "@/lib/utils";

interface JoinBootcampButtonProps {
  variant?: "header" | "hero" | "footer";
  className?: string;
}

export function JoinBootcampButton({ variant = "header", className }: JoinBootcampButtonProps) {
  const { openForm } = useJoinBootcamp();

  const styles = {
    header:
      "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-80",
    hero: "inline-flex items-center gap-2 rounded-full bg-hero-fg px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-hero-bg transition-opacity hover:opacity-90",
    footer:
      "inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80",
  };

  return (
    <button type="button" onClick={openForm} className={cn(styles[variant], className)}>
      Join Bootcamp
      <ArrowUpRight className={variant === "hero" ? "h-3.5 w-3.5" : "h-3.5 w-3.5"} />
    </button>
  );
}
