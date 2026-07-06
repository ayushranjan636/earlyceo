"use client";

import { motion } from "framer-motion";
import { RotatingText } from "@/components/ui/RotatingText";
import { DottedArrow } from "@/components/ui/DottedArrow";
import { Countdown } from "@/components/ui/Countdown";
import { JoinBootcampButton } from "@/components/ui/JoinBootcampButton";

const SEATS_TOTAL = 10;
const SEATS_LEFT = 7;

export function Hero() {
  return (
    <section className="px-4 pb-8 pt-2 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-hero-bg sm:rounded-[2.5rem]"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 60%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />

        <div className="relative flex min-h-[78vh] flex-col justify-between px-8 py-12 sm:px-12 sm:py-16 lg:min-h-[85vh] lg:px-16 lg:py-20">
          <DottedArrow className="absolute left-8 top-28 text-hero-fg/40 sm:left-16 sm:top-32" />
          <DottedArrow className="absolute right-12 top-20 rotate-180 text-hero-fg/30 sm:right-20" />

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-hero-fg/50"
            >
              9-Day Entrepreneurship Bootcamp
            </motion.p>

            <h1 className="max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight text-hero-fg sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="block"
              >
                Building
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="block text-hero-fg/90"
              >
                Founders
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-8 text-2xl font-bold uppercase tracking-wide text-hero-fg sm:text-3xl md:text-4xl"
              style={{ perspective: 600 }}
            >
              <RotatingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 max-w-md text-sm leading-relaxed text-hero-fg/55 sm:text-base"
            >
              One real day inside a registered company.
              One CEO selected per cohort. Not a simulation.
            </motion.p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-xs"
            >
              <p className="text-sm leading-relaxed text-hero-fg/50">
                A practical bootcamp for students who want to build startups —
                not watch videos about them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <JoinBootcampButton variant="hero" />

              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-hero-fg/40">
                  First {SEATS_TOTAL} seats
                </p>
                <div className="mt-1 flex items-baseline justify-center gap-2">
                  <span className="text-2xl font-bold text-hero-fg">₹499</span>
                  <span className="text-sm text-hero-fg/40 line-through">₹4,999</span>
                </div>
                <p className="mt-1 text-xs text-hero-fg/40">
                  {SEATS_LEFT} of {SEATS_TOTAL} remaining
                </p>
                <div className="mx-auto mt-2 h-px w-32 overflow-hidden rounded-full bg-hero-fg/10">
                  <motion.div
                    className="h-full bg-hero-fg/60"
                    initial={{ width: 0 }}
                    animate={{ width: `${((SEATS_TOTAL - SEATS_LEFT) / SEATS_TOTAL) * 100}%` }}
                    transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-end gap-3 lg:text-right"
            >
              <p className="max-w-xs text-sm leading-relaxed text-hero-fg/50">
                Not an online course.
                <br />
                Not theory.
              </p>
              <Countdown variant="hero" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
