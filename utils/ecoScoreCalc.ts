// utils/ecoScoreCalc.ts
export const calculateEcoScore = (transport: string, diet: string, plasticLevel: number) => {
  // Score baseline 0..15 (higher = better)
  let score = 0;

  // transport
  if (transport === "walk" || transport === "bike") score += 5;
  else if (transport === "public") score += 3;
  else if (transport === "car") score += 0;

  // diet
  if (diet === "vegan") score += 5;
  else if (diet === "vegetarian") score += 3;
  else if (diet === "meat") score += 1;

  // plastic: plasticLevel 0..5, lower is better
  // give (5 - plasticLevel)
  score += Math.max(0, 5 - plasticLevel);

  // normalize 0..15
  if (score < 0) score = 0;
  if (score > 15) score = 15;
  return score;
};
