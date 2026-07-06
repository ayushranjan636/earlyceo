import Image from "next/image";
import Link from "next/link";
import { Camera, Network, Play, MessageCircle } from "lucide-react";
import { BRAND, CONTACT } from "@/lib/constants";

const SOCIAL = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Network, href: "#", label: "LinkedIn" },
  { icon: Play, href: "#", label: "YouTube" },
  { icon: MessageCircle, href: "#", label: "Discord" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <Image
              src="/early-ceo-black-logo.png"
              alt="EarlyCEO"
              width={140}
              height={36}
              className="mx-auto h-8 w-auto sm:mx-0"
            />
            <p className="mt-3 text-sm text-muted-foreground">{BRAND.tagline}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-muted-foreground transition-opacity hover:opacity-60"
              >
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-muted-foreground transition-opacity hover:opacity-60"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-muted-foreground transition-opacity hover:opacity-60"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} EarlyCEO
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              This initiative is run by SlateMate Private Limited
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
