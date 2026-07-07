import { createHmac } from "crypto";
import { getRazorpayClient } from "@/lib/razorpay";

const MIN_AMOUNT_PAISE = 100;

export interface CreateOrderInput {
  amount: number;
  leadId?: string;
  receipt?: string;
  email?: string;
  phone?: string;
  name?: string;
}

export interface CreateOrderResult {
  order_id: string;
  orderId: string;
  amount: number;
  currency: string;
}

export class RazorpayHandlerError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

export async function createRazorpayOrder(
  input: CreateOrderInput
): Promise<CreateOrderResult> {
  const { amount, leadId, receipt, email, phone, name } = input;

  if (!amount || Number.isNaN(amount)) {
    throw new RazorpayHandlerError("Amount is required", 400);
  }

  const amountPaise = Math.round(amount * 100);

  if (amountPaise < MIN_AMOUNT_PAISE) {
    throw new RazorpayHandlerError("Minimum amount is 100 paise (₹1)", 400);
  }

  try {
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: receipt ?? (leadId ? `lead_${leadId.slice(0, 8)}` : `order_${Date.now()}`),
      notes: {
        leadId: leadId ?? "",
        email: email ?? "",
        phone: phone ?? "",
        name: name ?? "",
      },
    });

    return {
      order_id: order.id,
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
    };
  } catch (error) {
    const err = error as { statusCode?: number; error?: { description?: string } };
    if (err.statusCode === 401) {
      throw new RazorpayHandlerError("Razorpay authentication failed", 401);
    }
    console.error("Razorpay create order failed:", error);
    throw new RazorpayHandlerError("Unable to create payment order", 500);
  }
}

export function verifyRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new RazorpayHandlerError("Payment verification is not configured", 500);
  }

  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expected === signature;
}
