import { NextResponse } from "next/server";
import { getCohortStatus } from "@/lib/google-sheets";

export async function GET() {
  try {
    const status = await getCohortStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Failed to fetch cohort status:", error);
    return NextResponse.json(
      { error: "Unable to fetch seat availability" },
      { status: 500 }
    );
  }
}
