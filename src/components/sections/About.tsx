"use client";

import { motion } from "framer-motion";
import { FOUNDER, TEAM, CONTACT } from "@/lib/constants";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
            <div className="mt-3 flex items-center gap-3">
              <h3 className="text-2xl font-bold">{FOUNDER.name}</h3>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ayush Ranjan on LinkedIn"
                className="text-muted-foreground transition-opacity hover:opacity-60"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
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
