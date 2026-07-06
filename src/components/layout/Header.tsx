"use client";

import Image from "next/image";
import Link from "next/link";
import { JoinBootcampButton } from "@/components/ui/JoinBootcampButton";

const NAV_LEFT = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="relative z-50">
      <div className="relative mx-auto flex h-20 max-w-[1400px] items-center justify-center px-6 md:justify-between lg:px-10">
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LEFT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href="/"
          className="md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <Image
            src="/early-ceo-black-logo.png"
            alt="EarlyCEO"
            width={160}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:ml-auto md:block">
          <JoinBootcampButton variant="header" />
        </div>
      </div>
    </header>
  );
}
