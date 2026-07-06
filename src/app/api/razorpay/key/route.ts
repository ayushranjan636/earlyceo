import { NextResponse } from "next/server";
import { getRazorpayKeyId } from "@/lib/razorpay";

export async function GET() {
  const keyId = getRazorpayKeyId();
  if (!keyId) {
    return NextResponse.json({ error: "Razorpay is not configured" }, { status: 500 });
  }
  return NextResponse.json({ keyId });
}
