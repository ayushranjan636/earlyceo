import { NextResponse } from "next/server";
import { COHORT } from "@/lib/constants";
import { appendLead, type LeadFormData } from "@/lib/google-sheets";

type PaymentStatus = "paid" | "cancelled" | "failed";

/** Legacy route — prefer /api/payment/verify for the hidden payment page flow */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      leadId,
      amount,
      status,
      paymentId,
      orderId,
      ...form
    } = body as LeadFormData & {
      leadId: string;
      amount: number;
      status: PaymentStatus;
      paymentId?: string;
      orderId?: string;
    };

    if (!leadId || !form.fullName || !form.email || !form.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["paid", "cancelled", "failed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await appendLead(form, {
      leadId,
      cohort: COHORT.name,
      amount,
      paymentStatus: status,
      reviewStatus: status === "paid" ? "selected" : "pending",
      paymentId,
      orderId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json(
      { error: "Unable to save lead" },
      { status: 500 }
    );
  }
}
