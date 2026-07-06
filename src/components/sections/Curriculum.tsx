"use client";

import { motion } from "framer-motion";
import { CURRICULUM } from "@/lib/constants";

export function Curriculum() {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-14 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            9 Days
          </p>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            The Program
          </h2>
        </div>

        <div className="space-y-0 divide-y divide-border">
          {CURRICULUM.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group grid gap-4 py-7 sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:gap-8"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Day {String(day.day).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold">{day.title}</h3>
              <p className="text-sm text-muted-foreground">{day.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
