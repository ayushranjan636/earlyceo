"use client";

import { motion } from "framer-motion";
import {
  Lightbulb, Rocket, Sparkles, Users, Brain, Crown, Mic,
  LayoutGrid, ClipboardCheck, Award, MessageCircle, Handshake,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_CARDS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb, Rocket, Sparkles, Users, Brain, Crown, Mic,
  LayoutGrid, ClipboardCheck, Award, MessageCircle, Handshake,
};

export function WhyEarlyCEO() {
  return (
    <section id="why" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          badge="Why EarlyCEO"
          title="Everything You Need to Become a Founder"
          subtitle="This is not just another online course. It's a practical entrepreneurship bootcamp where you understand how startups actually work."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICON_MAP[card.icon];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 4) * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
