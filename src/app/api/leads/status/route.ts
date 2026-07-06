import { NextResponse } from "next/server";
import { getEarlyBirdStatus } from "@/lib/google-sheets";

export async function GET() {
  try {
    const status = await getEarlyBirdStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Failed to fetch early bird status:", error);
    return NextResponse.json(
      { error: "Unable to fetch seat availability" },
      { status: 500 }
    );
  }
}
