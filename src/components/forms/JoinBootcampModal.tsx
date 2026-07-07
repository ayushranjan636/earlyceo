"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { startRazorpayPayment } from "@/lib/razorpay-client";
import { COHORT, PRICING } from "@/lib/constants";
import type { LeadFormData } from "@/lib/google-sheets";

interface JoinBootcampModalProps {
  open: boolean;
  onClose: () => void;
}

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const initialForm: LeadFormData = {
  fullName: "",
  age: "",
  gender: "",
  email: "",
  phone: "",
  city: "",
  collegeOrSchool: "",
  whyBootcamp: "",
  hasIdea: "",
  ideaDetails: "",
};

export function JoinBootcampModal({ open, onClose }: JoinBootcampModalProps) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setForm(initialForm);
      setError("");
      setSubmitting(false);
    }
  }, [open]);

  const update = (field: keyof LeadFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const currentPrice = PRICING.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const leadData = await leadRes.json();

      if (!leadRes.ok) {
        throw new Error(leadData.error ?? "Failed to submit application");
      }

      const paymentDescription = "EarlyCEO Bootcamp — Founding Cohort Special";

      await startRazorpayPayment({
        amount: leadData.amount,
        leadId: leadData.leadId,
        tier: leadData.tier,
        form,
        description: paymentDescription,
        onSuccess: () => {
          setSubmitted(true);
        },
        onDismiss: () => {
          setError(
            "Payment was not completed. Your details are saved — our team will reach out to you shortly."
          );
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

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-60"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="px-8 py-16 text-center sm:px-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Payment Successful
                </p>
                <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                  Thank You
                </h2>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your seat is confirmed. Join the {COHORT.name} community to get
                  updates, resources, and connect with fellow founders.
                </p>

                <div className="mx-auto mt-8 max-w-sm rounded-xl border border-border px-5 py-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Community
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Join our WhatsApp group for {COHORT.name}
                  </p>
                  <a
                    href={COHORT.whatsappCommunityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Join Group Now
                  </a>
                  <p className="mt-3 text-xs text-muted-foreground">Join us now</p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 rounded-full border border-border px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Join Bootcamp
                </p>
                <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight">
                  Application Form
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill in your details. Payment is required to confirm your seat.
                </p>

                <div className="mt-4 rounded-lg border border-border px-4 py-3 text-sm">
                  <p>
                    <span className="font-semibold text-foreground">
                      {COHORT.offerLabel}: ₹{PRICING.price.toLocaleString("en-IN")}
                    </span>
                    <br />
                    <span className="text-muted-foreground">
                      Available only for {COHORT.name}. Only {PRICING.seatLimit} founders
                      will be accepted into {COHORT.name}.
                    </span>
                  </p>
                  <p className="mt-3 text-muted-foreground">
                    {COHORT.valueProps.perSession}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {COHORT.valueProps.guestLecture}
                  </p>
                </div>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Age *
                      </label>
                      <input
                        required
                        type="number"
                        min="13"
                        max="99"
                        value={form.age}
                        onChange={(e) => update("age", e.target.value)}
                        className={inputClass}
                        placeholder="Your age"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Gender *
                      </label>
                      <select
                        required
                        value={form.gender}
                        onChange={(e) => update("gender", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select</option>
                        {GENDERS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputClass}
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        City
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className={inputClass}
                        placeholder="Where are you based?"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        School / College
                      </label>
                      <input
                        type="text"
                        value={form.collegeOrSchool}
                        onChange={(e) => update("collegeOrSchool", e.target.value)}
                        className={inputClass}
                        placeholder="Institution name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Why do you want to join this bootcamp? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.whyBootcamp}
                      onChange={(e) => update("whyBootcamp", e.target.value)}
                      className={inputClass}
                      placeholder="Tell us what brought you here and what you hope to gain"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Do you have a startup idea? *
                    </label>
                    <div className="flex gap-4">
                      {["yes", "no"].map((val) => (
                        <label key={val} className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="hasIdea"
                            required
                            value={val}
                            checked={form.hasIdea === val}
                            onChange={(e) => update("hasIdea", e.target.value)}
                            className="accent-foreground"
                          />
                          {val === "yes" ? "Yes" : "No"}
                        </label>
                      ))}
                    </div>
                  </div>

                  {form.hasIdea === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Tell us about your idea *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.ideaDetails}
                        onChange={(e) => update("ideaDetails", e.target.value)}
                        className={inputClass}
                        placeholder="What problem are you solving? What stage are you at?"
                      />
                    </motion.div>
                  )}

                </div>

                {error && (
                  <p className="mt-4 text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 w-full rounded-full bg-foreground py-3.5 text-sm font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {submitting
                    ? "Processing..."
                    : `Submit & Pay ₹${currentPrice.toLocaleString("en-IN")}`}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
