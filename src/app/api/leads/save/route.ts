import { NextResponse } from "next/server";
import { appendLead, type LeadFormData } from "@/lib/google-sheets";

type PaymentStatus = "paid" | "cancelled" | "failed";

/** Non-paid rows use a tier suffix so legacy sheet scripts do not count them as occupied seats */
function tierForSheet(tier: string, status: PaymentStatus): string {
  if (status === "paid") return tier;
  return `${tier}_${status}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      leadId,
      tier,
      amount,
      status,
      paymentId,
      orderId,
      ...form
    } = body as LeadFormData & {
      leadId: string;
      tier: string;
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
      tier: tierForSheet(tier, status),
      amount,
      paymentStatus: status,
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
