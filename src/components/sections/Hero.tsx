"use client";

import { motion } from "framer-motion";
import { RotatingText } from "@/components/ui/RotatingText";
import { DottedArrow } from "@/components/ui/DottedArrow";
import { Countdown } from "@/components/ui/Countdown";
import { JoinBootcampButton } from "@/components/ui/JoinBootcampButton";
import { COHORT, PRICING } from "@/lib/constants";

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

        <div className="relative flex min-h-[78vh] flex-col px-6 py-10 sm:px-12 sm:py-16 lg:min-h-[85vh] lg:px-16 lg:py-20">
          <DottedArrow className="absolute left-6 top-24 hidden text-hero-fg/40 sm:left-16 sm:top-32 sm:block" />
          <DottedArrow className="absolute right-8 top-16 hidden rotate-180 text-hero-fg/30 sm:right-20 sm:top-20 sm:block" />

          {/* Top content */}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-hero-fg/50 sm:mb-6 sm:text-[11px] sm:tracking-[0.25em]"
            >
              9-Day Entrepreneurship Bootcamp
            </motion.p>

            <h1 className="max-w-4xl text-3xl font-bold uppercase leading-[1.08] tracking-tight text-hero-fg sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
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
              className="mt-6 text-xl font-bold uppercase tracking-wide text-hero-fg sm:mt-8 sm:text-3xl md:text-4xl"
              style={{ perspective: 600 }}
            >
              <RotatingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-5 max-w-sm text-sm leading-relaxed text-hero-fg/55 sm:mt-6 sm:max-w-md sm:text-base"
            >
              One real day inside a registered company. One CEO selected per
              cohort. Not a simulation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="mt-3 max-w-sm text-sm leading-relaxed text-hero-fg/45 sm:hidden"
            >
              A practical bootcamp for students who want to build startups —
              not watch videos about them.
            </motion.p>
          </div>

          {/* Bottom section — stacked & centered on mobile */}
          <div className="mt-8 flex flex-col items-center gap-8 sm:mt-10 lg:grid lg:grid-cols-3 lg:items-end lg:gap-8">
            {/* Left — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="hidden max-w-xs lg:block"
            >
              <p className="text-sm leading-relaxed text-hero-fg/50">
                A practical bootcamp for students who want to build startups —
                not watch videos about them.
              </p>
            </motion.div>

            {/* Center — CTA + pricing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex w-full max-w-xs flex-col items-center gap-5"
            >
              <JoinBootcampButton variant="hero" />

              <div className="w-full text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-hero-fg/40">
                  {COHORT.offerLabel}
                </p>
                <div className="mt-1 flex items-baseline justify-center gap-2">
                  <span className="text-2xl font-bold text-hero-fg">
                    ₹{PRICING.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-hero-fg/40">
                  Available only for {COHORT.name}
                </p>
                <p className="mt-1 text-xs text-hero-fg/40">
                  Only {PRICING.seatLimit} founders will be accepted into {COHORT.name}
                </p>
              </div>
            </motion.div>

            {/* Right — countdown + cohort dates */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex w-full max-w-xs flex-col items-center gap-4 text-center lg:items-end lg:text-right"
            >
              <p className="hidden max-w-xs text-sm leading-relaxed text-hero-fg/50 lg:block">
                Not an online course.
                <br />
                Not theory.
              </p>

              <div className="w-full rounded-xl border border-hero-fg/10 px-4 py-4 sm:px-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-hero-fg/50">
                  1st Cohort starts {COHORT.startLabel}
                </p>
                <p className="mt-1 text-xs text-hero-fg/40">
                  Registration closes {COHORT.registrationCloseLabel}
                </p>
                <div className="mt-4 flex justify-center lg:justify-end">
                  <Countdown
                    variant="hero"
                    label="Registration closes in"
                  />
                </div>
              </div>

              <p className="text-xs text-hero-fg/40 lg:hidden">
                Not an online course. Not theory.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
