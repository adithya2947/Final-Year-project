import { NextResponse } from "next/server";
import { generateSoilReadings } from "@/lib/fertilizer-data";

export async function GET() {
  // Simulate base soil values that would come from historical average
  const baseN = 45;
  const baseP = 35;
  const baseK = 40;

  const readings = generateSoilReadings(baseN, baseP, baseK);

  return NextResponse.json({
    success: true,
    data: readings,
  });
}
