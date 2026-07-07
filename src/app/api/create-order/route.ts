import { NextResponse } from "next/server";
import {
  createRazorpayOrder,
  RazorpayHandlerError,
} from "@/lib/razorpay-handlers";

/** Standard Razorpay checkout alias — POST /api/create-order */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await createRazorpayOrder(body);
    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof RazorpayHandlerError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Unable to create payment order" },
      { status: 500 }
    );
  }
}
