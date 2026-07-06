"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[0] }) {
  return (
    <div className="w-[320px] shrink-0 border border-border px-7 py-8">
      <p className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-medium">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="overflow-hidden border-t border-border py-24">
      <div className="mx-auto mb-14 max-w-[1400px] px-6 lg:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          From Participants
        </p>
        <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          What they said
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
