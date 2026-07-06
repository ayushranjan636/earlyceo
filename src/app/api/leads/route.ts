import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  appendLead,
  getEarlyBirdStatus,
  type LeadFormData,
} from "@/lib/google-sheets";
import { PRICING } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadFormData;

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const status = await getEarlyBirdStatus();
    const leadId = randomUUID();
    const tier = status.earlyBirdFull ? "regular" : "early_bird";
    const amount = status.earlyBirdFull
      ? PRICING.regularPrice
      : PRICING.earlyBirdPrice;

    await appendLead(body, { tier, amount, leadId });

    const updatedStatus = await getEarlyBirdStatus();

    return NextResponse.json({
      success: true,
      leadId,
      tier,
      amount,
      ...updatedStatus,
    });
  } catch (error) {
    console.error("Failed to submit lead:", error);
    return NextResponse.json(
      { error: "Unable to submit application. Please try again." },
      { status: 500 }
    );
  }
}
