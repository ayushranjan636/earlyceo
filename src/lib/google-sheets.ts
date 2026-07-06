import { PRICING } from "@/lib/constants";

export interface LeadFormData {
  fullName: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  city: string;
  collegeOrSchool: string;
  whyBootcamp: string;
  hasIdea: string;
  ideaDetails: string;
}

export interface CohortStatus {
  count: number;
  seatsLeft: number;
  cohortFull: boolean;
  seatLimit: number;
  price: number;
}

export interface LeadSubmissionResult extends CohortStatus {
  success: boolean;
  leadId: string;
  tier: "founding_cohort";
  amount: number;
}

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

async function callScript<T>(payload: Record<string, unknown>): Promise<T> {
  if (!SCRIPT_URL) {
    throw new Error("GOOGLE_SCRIPT_URL is not configured");
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
    redirect: "follow",
  });

  const text = await response.text();

  try {
    const data = JSON.parse(text) as T & { error?: string };
    if (!response.ok || data.error) {
      throw new Error(data.error ?? "Google Sheets request failed");
    }
    return data;
  } catch {
    if (text.includes("Access denied") || text.includes("You need access")) {
      throw new Error(
        "Google Script access denied. Redeploy with Who has access: Anyone"
      );
    }
    throw new Error("Invalid response from Google Sheets");
  }
}

function defaultCohortStatus(): CohortStatus {
  return {
    count: 0,
    seatsLeft: PRICING.seatLimit,
    cohortFull: false,
    seatLimit: PRICING.seatLimit,
    price: PRICING.price,
  };
}

export async function getCohortStatus(): Promise<CohortStatus> {
  if (!SCRIPT_URL) {
    return defaultCohortStatus();
  }

  const response = await fetch(SCRIPT_URL, {
    method: "GET",
    cache: "no-store",
    redirect: "follow",
  });

  const text = await response.text();

  try {
    return JSON.parse(text) as CohortStatus;
  } catch {
    if (text.includes("Access denied") || text.includes("You need access")) {
      throw new Error(
        "Google Script access denied. Redeploy with Who has access: Anyone"
      );
    }
    throw new Error("Invalid response from Google Sheets");
  }
}

export async function appendLead(
  form: LeadFormData,
  meta: {
    tier: string;
    amount: number;
    leadId: string;
    paymentStatus: "paid" | "cancelled" | "failed" | "pending";
    paymentId?: string;
    orderId?: string;
  }
): Promise<{ success: boolean }> {
  return callScript<{ success: boolean }>({
    action: "append",
    leadId: meta.leadId,
    tier: meta.tier,
    amount: meta.amount,
    paymentStatus: meta.paymentStatus,
    paymentId: meta.paymentId ?? "",
    orderId: meta.orderId ?? "",
    submittedAt: new Date().toISOString(),
    ...form,
  });
}

export async function updateLeadPayment(
  leadId: string,
  payment: {
    paymentId?: string;
    orderId?: string;
    status: "paid" | "cancelled" | "failed" | "pending";
  }
): Promise<{ success: boolean }> {
  return callScript<{ success: boolean }>({
    action: "updatePayment",
    leadId,
    paymentId: payment.paymentId ?? "",
    orderId: payment.orderId ?? "",
    paymentStatus: payment.status,
    paidAt: payment.status === "paid" ? new Date().toISOString() : "",
  });
}
