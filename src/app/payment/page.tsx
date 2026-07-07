import type { Metadata } from "next";
import { PaymentPageClient } from "@/components/payment/PaymentPageClient";

export const metadata: Metadata = {
  title: "Enrollment | EarlyCEO",
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return <PaymentPageClient />;
}
