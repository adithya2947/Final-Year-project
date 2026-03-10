// Simulated ML prediction based on tomato crop stage and soil conditions
// This emulates what a trained model would output

export interface SoilInput {
  stage: string;
  soil_N: number;
  soil_P: number;
  soil_K: number;
  pH: number;
  moisture: number;
  temperature: number;
}

export interface FertilizerOutput {
  recommended_N: number;
  recommended_P: number;
  recommended_K: number;
  zeolite: number;
  humic_acid: number;
  confidence: number;
}

// Base nutrient requirements per growth stage
const stageRequirements: Record<string, { N: number; P: number; K: number; zeolite: number; humic: number }> = {
  seedling: { N: 30, P: 45, K: 25, zeolite: 5, humic: 2 },
  vegetative: { N: 80, P: 50, K: 60, zeolite: 10, humic: 3 },
  flowering: { N: 60, P: 80, K: 90, zeolite: 12, humic: 4 },
  fruiting: { N: 50, P: 70, K: 120, zeolite: 15, humic: 5 },
  ripening: { N: 30, P: 40, K: 100, zeolite: 8, humic: 3 },
};

export function predictFertilizer(input: SoilInput): FertilizerOutput {
  const stage = input.stage.toLowerCase();
  const requirements = stageRequirements[stage] || stageRequirements.vegetative;

  // Calculate deficits based on soil levels
  const nDeficit = Math.max(0, requirements.N - input.soil_N * 0.5);
  const pDeficit = Math.max(0, requirements.P - input.soil_P * 0.6);
  const kDeficit = Math.max(0, requirements.K - input.soil_K * 0.4);

  // Adjust for pH (optimal range 6.0-6.8)
  const pHFactor = input.pH >= 6.0 && input.pH <= 6.8 ? 1 : 1.15;

  // Adjust for moisture (optimal range 40-60%)
  const moistureFactor = input.moisture >= 40 && input.moisture <= 60 ? 1 : 1.1;

  // Adjust for temperature (optimal range 20-30°C)
  const tempFactor = input.temperature >= 20 && input.temperature <= 30 ? 1 : 1.1;

  // Calculate final recommendations
  const recommended_N = Math.round(nDeficit * pHFactor * moistureFactor * tempFactor);
  const recommended_P = Math.round(pDeficit * pHFactor * moistureFactor);
  const recommended_K = Math.round(kDeficit * pHFactor * tempFactor);
  
  // Zeolite helps with nutrient retention
  const zeolite = Math.round(requirements.zeolite * (input.moisture < 40 ? 1.2 : 1));
  
  // Humic acid for soil health
  const humic_acid = Math.round(requirements.humic * (input.pH < 6.0 || input.pH > 7.0 ? 1.3 : 1));

  // Calculate confidence based on input quality
  const confidence = calculateConfidence(input);

  return {
    recommended_N: Math.max(0, recommended_N),
    recommended_P: Math.max(0, recommended_P),
    recommended_K: Math.max(0, recommended_K),
    zeolite,
    humic_acid,
    confidence,
  };
}

function calculateConfidence(input: SoilInput): number {
  let confidence = 95;

  // Reduce confidence for extreme values
  if (input.pH < 5.5 || input.pH > 7.5) confidence -= 5;
  if (input.moisture < 20 || input.moisture > 80) confidence -= 5;
  if (input.temperature < 15 || input.temperature > 35) confidence -= 5;
  if (input.soil_N < 10 || input.soil_N > 100) confidence -= 3;
  if (input.soil_P < 10 || input.soil_P > 100) confidence -= 3;
  if (input.soil_K < 10 || input.soil_K > 100) confidence -= 3;

  return Math.max(70, Math.round(confidence));
}

// Simulated real-time soil fluctuation
export function generateSoilReadings(baseN: number, baseP: number, baseK: number) {
  const fluctuation = () => (Math.random() - 0.5) * 10;
  
  return {
    nitrogen: Math.max(0, Math.round(baseN + fluctuation())),
    phosphorus: Math.max(0, Math.round(baseP + fluctuation())),
    potassium: Math.max(0, Math.round(baseK + fluctuation())),
    pH: Math.round((6.5 + (Math.random() - 0.5) * 0.5) * 10) / 10,
    moisture: Math.round(45 + (Math.random() - 0.5) * 20),
    temperature: Math.round((25 + (Math.random() - 0.5) * 8) * 10) / 10,
    ec: Math.round((1.5 + (Math.random() - 0.5) * 0.6) * 10) / 10,
    timestamp: new Date().toISOString(),
  };
}

// Growth stage data for timeline
export const growthStages = [
  { name: "Seedling", days: "1-14", dayRange: [1, 14] },
  { name: "Vegetative", days: "15-35", dayRange: [15, 35] },
  { name: "Flowering", days: "36-55", dayRange: [36, 55] },
  { name: "Fruiting", days: "56-85", dayRange: [56, 85] },
  { name: "Ripening", days: "86-120", dayRange: [86, 120] },
];

export function getStageFromDay(day: number): string {
  for (const stage of growthStages) {
    if (day >= stage.dayRange[0] && day <= stage.dayRange[1]) {
      return stage.name;
    }
  }
  return "Ripening";
}

// Historical data for charts
export function generateHistoricalData(days: number = 30) {
  const data = [];
  let n = 50, p = 40, k = 35;

  for (let i = 0; i < days; i++) {
    // Simulate plant uptake and fertilizer applications
    n = Math.max(20, Math.min(80, n + (Math.random() - 0.45) * 8));
    p = Math.max(15, Math.min(70, p + (Math.random() - 0.45) * 6));
    k = Math.max(25, Math.min(90, k + (Math.random() - 0.45) * 7));

    data.push({
      day: i + 1,
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      nitrogen: Math.round(n),
      phosphorus: Math.round(p),
      potassium: Math.round(k),
      stage: getStageFromDay(i + 1),
    });
  }

  return data;
}
