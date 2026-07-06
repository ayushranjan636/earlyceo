"use client";

import { motion } from "framer-motion";
import { CEO_FOR_A_DAY } from "@/lib/constants";

export function CEODay() {
  return (
    <section id="experience" className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The Experience
            </p>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              One Day.
              <br />
              Real CEO.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              One participant per cohort spends a full day inside a registered
              Private Limited company — shadowing the founder, sitting in on
              decisions, and seeing how a business actually runs.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              This is not a workshop. It is a real office, real meetings,
              real operations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-0 divide-y divide-border"
          >
            {CEO_FOR_A_DAY.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 py-5"
              >
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
