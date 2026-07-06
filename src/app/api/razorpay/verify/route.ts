import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import { appendLead, type LeadFormData } from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      leadId,
      tier,
      amount,
      ...form
    } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Payment verification is not configured" },
        { status: 500 }
      );
    }

    const expected = createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await appendLead(form as LeadFormData, {
      leadId,
      tier,
      amount,
      paymentStatus: "paid",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
