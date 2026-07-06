"use client";

import { motion } from "framer-motion";
import { COMPARISON } from "@/lib/constants";

export function Comparison() {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-14 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            The Difference
          </p>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Not like the rest
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid border border-border sm:grid-cols-2"
        >
          <div className="border-b border-border p-10 sm:border-b-0 sm:border-r">
            <h3 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Typical Courses
            </h3>
            <ul className="space-y-4">
              {COMPARISON.others.map((item) => (
                <li key={item} className="text-sm text-muted-foreground line-through decoration-foreground/20">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-foreground p-10 text-background">
            <h3 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-background/50">
              EarlyCEO
            </h3>
            <ul className="space-y-4">
              {COMPARISON.earlyceo.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="text-sm font-medium"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
