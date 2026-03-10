import { NextResponse } from "next/server";
import { predictFertilizer, type SoilInput } from "@/lib/fertilizer-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const input: SoilInput = {
      stage: body.stage || "vegetative",
      soil_N: Number(body.soil_N) || 40,
      soil_P: Number(body.soil_P) || 30,
      soil_K: Number(body.soil_K) || 35,
      pH: Number(body.pH) || 6.5,
      moisture: Number(body.moisture) || 45,
      temperature: Number(body.temperature) || 25,
    };

    const prediction = predictFertilizer(input);

    return NextResponse.json({
      success: true,
      input,
      prediction,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process prediction" },
      { status: 500 }
    );
  }
}
