"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SOCIAL_PROOF, STATS } from "@/lib/constants";

export function SocialProof() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Students from
        </motion.p>

        <div className="mb-16 flex flex-wrap justify-center gap-x-10 gap-y-3">
          {SOCIAL_PROOF.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-foreground/60"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  text={stat.text}
                />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
