"use client";

import { motion } from "framer-motion";
import { Gift, Clock, Users, Zap, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BONUSES } from "@/lib/constants";

const BADGES = [
  { icon: Users, label: "Limited Seats" },
  { icon: Clock, label: "Limited Time" },
  { icon: Zap, label: "Early Access" },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          badge="Pricing"
          title="Invest in Your Founder Journey"
          subtitle="Lock in the early bird price before seats run out."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-lg"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-xl" />

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
            <div className="mb-6 flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  <badge.icon className="h-3 w-3" />
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
              Early Bird
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-foreground">₹99</span>
              <span className="text-xl text-muted-foreground line-through">₹4,999</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Only for the first 10 students · Then ₹999
            </p>

            <div className="my-8 h-px bg-white/10" />

            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Gift className="h-4 w-4 text-accent" />
                Bonuses Worth ₹25,000+
              </div>
              <ul className="space-y-2.5">
                {BONUSES.map((bonus) => (
                  <li key={bonus} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {bonus}
                  </li>
                ))}
              </ul>
            </div>

            <MagneticButton variant="glow" className="w-full !py-4 !text-base">
              Reserve My Seat
            </MagneticButton>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Secure checkout · Instant confirmation · Limited availability
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
