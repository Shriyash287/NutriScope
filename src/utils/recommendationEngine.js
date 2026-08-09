/**
 * NutriScope Recommendation Engine
 * 
 * Personalized food recommendation, waist-risk assessment, and regional meals.
 * All health-flag content stays at general lifestyle framing — never prescriptive.
 */

import { NUTRIENT_DB, REGIONAL_MEALS, HEALTH_FLAG_NOTES } from '../data/nutrientDB';

// ─────────────────────────────────────────────
// Waist-to-Height Ratio & Abdominal Obesity
// ─────────────────────────────────────────────
export function getWaistRisk(waistCm, heightCm, gender) {
  if (!waistCm || !heightCm) return null;
  const whtr = waistCm / heightCm;
  const actionLevel2 = gender === 'male' ? 90 : 80; // high risk
  const actionLevel1 = gender === 'male' ? 78 : 72; // increased risk

  if (waistCm >= actionLevel2 || whtr >= 0.5) {
    return {
      level: 'high',
      color: '#F97316',
      label: 'Elevated Risk',
      message: 'Waist measurement indicates elevated metabolic risk, independent of BMI. Consider consulting a healthcare provider.'
    };
  }
  if (waistCm >= actionLevel1) {
    return {
      level: 'increased',
      color: '#FACC15',
      label: 'Increased Risk',
      message: 'Waist measurement is in the increased-risk range. Watch for visceral fat, even if BMI is normal.'
    };
  }
  return {
    level: 'normal',
    color: '#22C55E',
    label: 'Normal',
    message: null
  };
}

// ─────────────────────────────────────────────
// Nutrient Gap → Personalized Food Additions
// ─────────────────────────────────────────────

const SEVERITY_ORDER = { severe: 4, high: 3, moderate: 2, low: 1 };

/**
 * Scans the full nutrient DB, ranks by severity for the user's dietary pattern,
 * and returns the top 4 risk nutrients with practical, allergen-filtered food recommendations.
 * 
 * @param {Object} user - { dietaryPattern, allergies: string[], gender, age }
 * @returns {Array<{ nutrient, riskLevel, foods, reason, pairingTip }>}
 */
export function getPersonalizedFoodAdditions(user) {
  const { dietaryPattern = 'vegetarian', allergies = [] } = user;
  const allergySet = new Set(allergies.map(a => a.toLowerCase()));

  // Scan & rank
  const risks = NUTRIENT_DB
    .map(nutrient => {
      const riskLevel = nutrient.dietaryRiskMultiplier[dietaryPattern] || 'low';
      return { nutrient, riskLevel, severity: SEVERITY_ORDER[riskLevel] || 1 };
    })
    .filter(r => r.severity >= 2) // moderate or higher
    .sort((a, b) => b.severity - a.severity);

  const topRisks = risks.slice(0, 4);

  return topRisks.map(({ nutrient, riskLevel }) => {
    let sources = nutrient.foodSourcesByPreference[dietaryPattern] || [];

    // Filter out allergens
    if (allergySet.size > 0) {
      sources = sources.filter(source => {
        const sourceLower = source.toLowerCase();
        for (const tag of nutrient.allergyTags || []) {
          if (allergySet.has(tag)) {
            // Check if this specific food matches the allergy tag
            if (tag === 'lactose' && /dairy|milk|curd|paneer|yogurt|cheese/i.test(sourceLower)) return false;
            if (tag === 'gluten' && /wheat|roti|bread|cereal|oats/i.test(sourceLower)) return false;
            if (tag === 'nuts' && /almond|walnut|cashew|pistachio|brazil nut/i.test(sourceLower)) return false;
            if (tag === 'peanut' && /peanut/i.test(sourceLower)) return false;
            if (tag === 'soy' && /soy|tofu/i.test(sourceLower)) return false;
          }
        }
        return true;
      });
    }

    // Build pairing tip string
    const tips = nutrient.pairingRules?.enhances || [];
    const warnings = nutrient.pairingRules?.inhibits || [];
    const pairingTip = [
      ...tips.map(t => `✅ ${t}`),
      ...warnings.slice(0, 2).map(w => `⚠️ ${w}`)
    ].join(' • ');

    return {
      id: nutrient.id,
      nutrientName: nutrient.name,
      riskLevel,
      rda: nutrient.rda,
      foods: sources.slice(0, 5),
      reason: nutrient.whyRiskyForThisPattern,
      pairingTip
    };
  });
}

// ─────────────────────────────────────────────
// Regional Meal Suggestions
// ─────────────────────────────────────────────
export function getRegionalMeals(region) {
  return REGIONAL_MEALS[region] || REGIONAL_MEALS['pan-indian'];
}

// ─────────────────────────────────────────────
// Health-Flag Notes
// ─────────────────────────────────────────────
export function getHealthFlagNotes(healthFlags = []) {
  return healthFlags
    .filter(flag => HEALTH_FLAG_NOTES[flag])
    .map(flag => HEALTH_FLAG_NOTES[flag]);
}

// ─────────────────────────────────────────────
// Get risk-highlighted nutrients for Micronutrient Checklist
// ─────────────────────────────────────────────
export function getUserRiskNutrients(dietaryPattern) {
  return NUTRIENT_DB
    .filter(n => {
      const risk = n.dietaryRiskMultiplier[dietaryPattern] || 'low';
      return SEVERITY_ORDER[risk] >= 3; // 'high' or 'severe'
    })
    .map(n => n.id);
}
