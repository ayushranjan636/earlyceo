"use client";

import { useState } from "react";
import Image from "next/image";
import { COHORT, PRICING } from "@/lib/constants";
import { startRegistrationPayment } from "@/lib/razorpay-client";

export function PaymentPageClient() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30";

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const prepareRes = await fetch("/api/payment/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber, fullName }),
      });

      const prepareData = await prepareRes.json();

      if (!prepareRes.ok) {
        throw new Error(prepareData.error ?? "Could not verify registration");
      }

      await startRegistrationPayment({
        registrationNumber: registrationNumber.trim().toUpperCase(),
        fullName: fullName.trim(),
        leadId: prepareData.leadId,
        amount: prepareData.amount,
        onSuccess: () => setPaid(true),
        onDismiss: () => {
          setError("Payment was not completed.");
          setSubmitting(false);
        },
        onFailed: (message) => {
          setError(message);
          setSubmitting(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (paid) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <Image
            src="/early-ceo-black-logo.png"
            alt="EarlyCEO"
            width={140}
            height={36}
            className="mx-auto h-8 w-auto"
          />
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Enrollment Confirmed
          </p>
          <h1 className="mt-4 text-3xl font-bold uppercase tracking-tight">
            Welcome to Cohort 1
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Your payment is confirmed. Join our WhatsApp group to get updates,
            resources, and connect with fellow founders.
          </p>
          <a
            href={COHORT.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join WhatsApp Group
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Image
          src="/early-ceo-black-logo.png"
          alt="EarlyCEO"
          width={140}
          height={36}
          className="mx-auto h-8 w-auto"
        />

        <h1 className="mt-10 text-center text-2xl font-bold uppercase tracking-tight">
          Complete Enrollment
        </h1>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Enter the registration number shared with you after selection.
        </p>

        <form onSubmit={handlePay} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Registration Number *
            </label>
            <input
              required
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
              className={inputClass}
              placeholder="EC01-XXXXXX"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Full Name *
            </label>
            <input
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
              placeholder="As submitted in your application"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {submitting
              ? "Processing..."
              : `Pay ₹${PRICING.price.toLocaleString("en-IN")}`}
          </button>
        </form>
      </div>
    </div>
  );
}
