import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { COHORT } from "@/lib/constants";
import { appendLead, type LeadFormData } from "@/lib/google-sheets";

function generateRegistrationNumber() {
  return `EC01-${randomBytes(3).toString("hex").toUpperCase()}`;
}

/** Submit a selective cohort application — no payment at this stage */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadFormData;

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    if (
      !body.whyBootcamp ||
      !body.willingToPay ||
      !body.whySelectYou ||
      !body.commitmentLevel ||
      !body.ceoDayApproach
    ) {
      return NextResponse.json(
        { error: "Please complete all required application questions" },
        { status: 400 }
      );
    }

    const registrationNumber = generateRegistrationNumber();

    await appendLead(body, {
      leadId: registrationNumber,
      cohort: COHORT.name,
      amount: 0,
      paymentStatus: "applied",
      reviewStatus: "pending",
    });

    return NextResponse.json({
      success: true,
      registrationNumber,
    });
  } catch (error) {
    console.error("Failed to submit application:", error);
    return NextResponse.json(
      { error: "Unable to submit application. Please try again." },
      { status: 500 }
    );
  }
}
