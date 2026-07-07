import { NextResponse } from "next/server";
import { findLeadByRegistration } from "@/lib/google-sheets";
import { PRICING } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { registrationNumber, fullName } = await request.json();

    if (!registrationNumber || !fullName) {
      return NextResponse.json(
        { error: "Registration number and full name are required" },
        { status: 400 }
      );
    }

    const lookup = await findLeadByRegistration(registrationNumber, fullName);

    if (!lookup.found) {
      return NextResponse.json(
        { error: "Registration not found. Check your details and try again." },
        { status: 404 }
      );
    }

    if (lookup.alreadyPaid) {
      return NextResponse.json(
        { error: "Payment already completed for this registration." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: lookup.leadId,
      amount: PRICING.price,
    });
  } catch (error) {
    console.error("Payment prepare failed:", error);
    return NextResponse.json(
      { error: "Unable to verify registration. Please try again." },
      { status: 500 }
    );
  }
}
