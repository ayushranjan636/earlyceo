"use client";

import { motion } from "framer-motion";
import { COHORT } from "@/lib/constants";

export function HeroHighlights() {
  return (
    <section className="pb-8 pt-6 sm:pb-10 sm:pt-8">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium text-foreground">
            {COHORT.valueProps.perSession}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {COHORT.valueProps.guestLecture}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A practical bootcamp for students who want to build startups — not
            watch videos about them. Not an online course. Not theory.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
