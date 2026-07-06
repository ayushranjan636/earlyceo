"use client";

import { motion } from "framer-motion";
import { WHO_SHOULD_JOIN } from "@/lib/constants";

export function WhoShouldJoin() {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-14 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Who It&apos;s For
          </p>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Built for people
            <br />
            who start things
          </h2>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {WHO_SHOULD_JOIN.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-background px-8 py-7 transition-colors hover:bg-foreground/[0.02]"
            >
              <span className="text-sm font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
