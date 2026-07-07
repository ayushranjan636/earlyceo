"use client";

import type { LeadFormData } from "@/lib/google-sheets";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: RazorpayFailedResponse) => void) => void;
}

interface RazorpayFailedResponse {
  error: {
    code: string;
    description: string;
    reason?: string;
  };
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface StartPaymentParams {
  amount: number;
  leadId: string;
  tier: string;
  form: LeadFormData;
  description: string;
  onSuccess: () => void;
  onDismiss?: () => void;
  onFailed?: (message: string) => void;
}

async function saveLead(
  form: LeadFormData,
  meta: {
    leadId: string;
    tier: string;
    amount: number;
    status: "paid" | "cancelled" | "failed";
    paymentId?: string;
    orderId?: string;
  }
) {
  const res = await fetch("/api/leads/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...form, ...meta }),
  });

  if (!res.ok) {
    throw new Error("Could not save lead");
  }
}

export async function startRazorpayPayment({
  amount,
  leadId,
  tier,
  form,
  description,
  onSuccess,
  onDismiss,
  onFailed,
}: StartPaymentParams) {
  const keyRes = await fetch("/api/razorpay/key");
  const keyData = await keyRes.json();
  const key = keyData.keyId as string;

  if (!key) {
    throw new Error("Payment is not configured yet");
  }

  const orderRes = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      leadId,
      name: form.fullName,
      email: form.email,
      phone: form.phone,
    }),
  });

  if (!orderRes.ok) {
    const err = await orderRes.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? "Could not create payment order"
    );
  }

  const order = await orderRes.json();
  const orderId = order.order_id ?? order.orderId;
  const loaded = await loadRazorpayScript();

  if (!loaded) {
    throw new Error("Could not load payment gateway");
  }

  const rzp = new window.Razorpay({
    key,
    amount: order.amount,
    currency: order.currency,
    name: "EarlyCEO",
    description,
    order_id: orderId,
    prefill: { name: form.fullName, email: form.email, contact: form.phone },
    theme: { color: "#000000" },
    handler: async (response) => {
      try {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            ...form,
            leadId,
            tier,
            amount,
          }),
        });

        if (!verifyRes.ok) {
          const err = await verifyRes.json().catch(() => ({}));
          await saveLead(form, { leadId, tier, amount, status: "failed" });
          throw new Error(
            (err as { error?: string }).error ?? "Payment verification failed"
          );
        }

        onSuccess();
      } catch (error) {
        onFailed?.(
          error instanceof Error ? error.message : "Payment verification failed"
        );
      }
    },
    modal: {
      ondismiss: async () => {
        try {
          await saveLead(form, { leadId, tier, amount, status: "cancelled" });
        } catch {
          // still show dismiss message even if save fails
        }
        onDismiss?.();
      },
    },
  });

  rzp.on("payment.failed", async (response) => {
    try {
      await saveLead(form, { leadId, tier, amount, status: "failed" });
    } catch {
      // ignore save errors
    }
    onFailed?.(response.error.description ?? "Payment failed. Please try again.");
  });

  rzp.open();
}

interface RegistrationPaymentParams {
  registrationNumber: string;
  fullName: string;
  leadId: string;
  amount: number;
  onSuccess: () => void;
  onDismiss?: () => void;
  onFailed?: (message: string) => void;
}

export async function startRegistrationPayment({
  registrationNumber,
  fullName,
  leadId,
  amount,
  onSuccess,
  onDismiss,
  onFailed,
}: RegistrationPaymentParams) {
  const keyRes = await fetch("/api/razorpay/key");
  const keyData = await keyRes.json();
  const key = keyData.keyId as string;

  if (!key) {
    throw new Error("Payment is not configured yet");
  }

  const orderRes = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      leadId,
      name: fullName,
    }),
  });

  if (!orderRes.ok) {
    const err = await orderRes.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? "Could not create payment order"
    );
  }

  const order = await orderRes.json();
  const orderId = order.order_id ?? order.orderId;
  const loaded = await loadRazorpayScript();

  if (!loaded) {
    throw new Error("Could not load payment gateway");
  }

  const rzp = new window.Razorpay({
    key,
    amount: order.amount,
    currency: order.currency,
    name: "EarlyCEO",
    description: `Cohort 01 enrollment — ${registrationNumber}`,
    order_id: orderId,
    prefill: { name: fullName },
    theme: { color: "#000000" },
    handler: async (response) => {
      try {
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            leadId,
          }),
        });

        if (!verifyRes.ok) {
          const err = await verifyRes.json().catch(() => ({}));
          throw new Error(
            (err as { error?: string }).error ?? "Payment verification failed"
          );
        }

        onSuccess();
      } catch (error) {
        onFailed?.(
          error instanceof Error ? error.message : "Payment verification failed"
        );
      }
    },
    modal: {
      ondismiss: () => onDismiss?.(),
    },
  });

  rzp.on("payment.failed", (response) => {
    onFailed?.(response.error.description ?? "Payment failed. Please try again.");
  });

  rzp.open();
}
