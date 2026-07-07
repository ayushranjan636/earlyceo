import { NextResponse } from "next/server";
import {
  RazorpayHandlerError,
  verifyRazorpayPaymentSignature,
} from "@/lib/razorpay-handlers";
import { updateLeadPayment } from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      leadId,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !leadId) {
      return NextResponse.json(
        { error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const valid = verifyRazorpayPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!valid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await updateLeadPayment(leadId, {
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof RazorpayHandlerError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
