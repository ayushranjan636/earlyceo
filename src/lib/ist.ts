const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

/** Parse a date or datetime string as Indian Standard Time (UTC+5:30). */
export function toISTDate(value: string): Date {
  if (/([zZ]|[+-]\d{2}:\d{2})$/.test(value)) {
    return new Date(value);
  }

  const normalized = value.includes("T")
    ? `${value}+05:30`
    : `${value}T23:59:59+05:30`;

  return new Date(normalized);
}

/** Milliseconds from now until an IST deadline (0 if passed). */
export function getTimeLeftIST(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export const IST_LABEL = "IST (UTC+5:30)";

/** Format a UTC timestamp for display in IST. */
export function formatIST(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    ...options,
  }).format(date);
}

export { IST_OFFSET_MS };
