import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const { amount, leadId, email, phone, name } = await request.json();

    if (!amount || !leadId) {
      return NextResponse.json(
        { error: "Amount and lead ID are required" },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `lead_${leadId.slice(0, 8)}`,
      notes: {
        leadId,
        email: email ?? "",
        phone: phone ?? "",
        name: name ?? "",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    return NextResponse.json(
      { error: "Unable to start payment. Please try again." },
      { status: 500 }
    );
  }
}
