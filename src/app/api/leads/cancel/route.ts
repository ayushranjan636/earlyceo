import { NextResponse } from "next/server";
import { updateLeadPayment } from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    await updateLeadPayment(leadId, { status: "cancelled" });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to mark lead as cancelled:", error);
    return NextResponse.json(
      { error: "Unable to update lead status" },
      { status: 500 }
    );
  }
}
