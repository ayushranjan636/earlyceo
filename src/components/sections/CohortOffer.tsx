"use client";

import { motion } from "framer-motion";
import { Countdown } from "@/components/ui/Countdown";
import { JoinBootcampButton } from "@/components/ui/JoinBootcampButton";
import { COHORT, PRICING } from "@/lib/constants";

export function CohortOffer() {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {COHORT.offerLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              ₹{PRICING.price.toLocaleString("en-IN")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Available only for {COHORT.name}. Only {PRICING.seatLimit} founders
              will be accepted.
            </p>

            <ul className="mt-8 space-y-3 border-t border-border pt-8">
              <li className="text-sm font-medium text-foreground">
                {COHORT.valueProps.perSession}
              </li>
              <li className="text-sm font-medium text-foreground">
                {COHORT.valueProps.guestLecture}
              </li>
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              A practical bootcamp for students who want to build startups — not
              watch videos about them. Not an online course. Not theory.
            </p>

            <div className="mt-8">
              <JoinBootcampButton variant="footer" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-2xl border border-border px-6 py-8 sm:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {COHORT.name} starts {COHORT.startLabel}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Registration closes {COHORT.registrationCloseLabel}
              </p>
              <div className="mt-6">
                <Countdown label="Registration closes in" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
