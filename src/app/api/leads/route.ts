import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getCohortStatus, type LeadFormData } from "@/lib/google-sheets";
import { PRICING } from "@/lib/constants";

/** Prepare a lead for checkout — does NOT write to the sheet yet */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadFormData;

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const status = await getCohortStatus();

    if (status.cohortFull) {
      return NextResponse.json(
        { error: "Cohort 01 is full. Registration is closed." },
        { status: 403 }
      );
    }

    const leadId = randomUUID();
    const tier = "founding_cohort";
    const amount = PRICING.price;

    return NextResponse.json({
      success: true,
      leadId,
      tier,
      amount,
      ...status,
    });
  } catch (error) {
    console.error("Failed to prepare lead:", error);
    return NextResponse.json(
      { error: "Unable to process application. Please try again." },
      { status: 500 }
    );
  }
}
