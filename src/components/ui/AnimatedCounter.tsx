"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  text?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  text,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (text) return;

    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    let frame: number;

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, text]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {text ?? count}
      {suffix}
    </motion.span>
  );
}
