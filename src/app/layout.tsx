import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { JoinBootcampProvider } from "@/components/providers/JoinBootcampProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EarlyCEO | Be Early. Build Bigger. Lead the Future.",
  description:
    "Join the exclusive 9-Day EarlyCEO Bootcamp. Learn entrepreneurship, build your startup, and get the chance to become a CEO for a Day at a real company. Founding Cohort Special — ₹999 for Cohort 01.",
  icons: {
    icon: "/earlyceo-fevicon.png",
    apple: "/earlyceo-fevicon.png",
  },
  keywords: [
    "entrepreneurship bootcamp",
    "startup course",
    "student founders",
    "CEO for a day",
    "EarlyCEO",
    "startup education India",
  ],
  openGraph: {
    title: "EarlyCEO | Build Your First Startup Before Everyone Else",
    description:
      "9-Day live entrepreneurship bootcamp for students and first-time founders. Founding Cohort Special — ₹999.",
    type: "website",
    siteName: "EarlyCEO",
  },
  twitter: {
    card: "summary_large_image",
    title: "EarlyCEO | Be Early. Build Bigger. Lead the Future.",
    description: "Join the exclusive 9-Day EarlyCEO Bootcamp. Founding Cohort Special — ₹999.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <JoinBootcampProvider>{children}</JoinBootcampProvider>
      </body>
    </html>
  );
}
