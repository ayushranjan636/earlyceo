export function DottedArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80"
      height="60"
      viewBox="0 0 80 60"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 55 C 20 40, 35 25, 50 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M50 15 L 58 10 M 50 15 L 54 23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
