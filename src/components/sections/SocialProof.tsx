"use client";

import { motion } from "framer-motion";
import { SOCIAL_PROOF } from "@/lib/constants";

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

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {SOCIAL_PROOF.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-foreground/60"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
