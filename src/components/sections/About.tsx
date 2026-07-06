"use client";

import { motion } from "framer-motion";
import { FOUNDER, TEAM, CONTACT } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Who We Are
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            EarlyCEO is built by people who have started companies, not just
            studied them. We run live bootcamps for students who want real
            exposure to how startups work.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Founder
            </p>
            <h3 className="mt-3 text-2xl font-bold">{FOUNDER.name}</h3>
            <ul className="mt-5 space-y-3">
              {FOUNDER.roles.map((role) => (
                <li
                  key={role}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                  {role}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Team
            </p>
            <div className="mt-5 space-y-0 divide-y divide-border">
              {TEAM.map((member, i) => (
                <div key={member.name} className="py-5 first:pt-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="text-base font-semibold">{member.name}</h4>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-border pt-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-12">
            <a
              href={`tel:${CONTACT.phone}`}
              className="text-lg font-medium transition-opacity hover:opacity-60"
            >
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-lg font-medium transition-opacity hover:opacity-60"
            >
              {CONTACT.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
