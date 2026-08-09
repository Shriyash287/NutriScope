import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  getWaistRisk,
  getPersonalizedFoodAdditions,
  getRegionalMeals,
  getHealthFlagNotes,
  getUserRiskNutrients
} from '../utils/recommendationEngine';
import { NUTRIENT_DB } from '../data/nutrientDB';

export default function PersonalizedDietGuide({ data }) {
  const {
    gender,
    age: ageStr,
    weight: weightStr,
    heightCm: heightStr,
    bmi,
    maintenanceCalories,
    activityLevelIndex,
    dietaryPattern,
    waistCm,
    allergies,
    healthFlags,
    region,
    mealsPerDay,
    sleepHours
  } = data;

  const w = parseFloat(weightStr);
  const h = parseFloat(heightStr);
  const a = parseInt(ageStr, 10);

  const [goal, setGoal] = useState('Maintain');

  const calc = useMemo(() => {
    if (!w || !h || !a || !maintenanceCalories) return null;

    let targetCalories = maintenanceCalories;
    let proteinFactor = 1.6;

    if (goal === 'Weight Loss') {
      targetCalories = maintenanceCalories * 0.8;
      proteinFactor = 1.8; // higher protein for loss
    } else if (goal === 'Muscle Gain') {
      targetCalories = maintenanceCalories * 1.15;
      proteinFactor = 2.0; // max protein
    }

    targetCalories = Math.round(targetCalories);

    const proteinGrams = Math.round(proteinFactor * w);
    const fatGrams = Math.round(0.8 * w);
    const proteinKcal = proteinGrams * 4;
    const fatKcal = fatGrams * 9;
    const remainingKcal = Math.max(0, targetCalories - proteinKcal - fatKcal);
    const carbGrams = Math.round(remainingKcal / 4);
    const carbKcal = carbGrams * 4;

    const totalKcal = proteinKcal + fatKcal + carbKcal;

    const waterMin = (35 * w) / 1000;
    const waterMax = (40 * w) / 1000;

    // Fiber: 30g per 2000 kcal (ICMR-NIN 2020)
    const fiber = Math.round((totalKcal / 2000) * 30);

    // WHO Asia-Pacific / Indian Cutoffs
    let bmiCat = 'Normal';
    if (bmi < 18.5) bmiCat = 'Underweight';
    else if (bmi >= 23 && bmi < 25) bmiCat = 'Overweight';
    else if (bmi >= 25) bmiCat = 'Obese';

    return {
      targetCalories: totalKcal,
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
      water: `${waterMin.toFixed(1)} – ${waterMax.toFixed(1)} L`,
      fiber,
      bmiCat
    };
  }, [w, h, a, maintenanceCalories, goal, gender, bmi]);

  const waistRisk = useMemo(() => {
    return getWaistRisk(waistCm, h, gender);
  }, [waistCm, h, gender]);

  const foodAdditions = useMemo(() => {
    return getPersonalizedFoodAdditions({ dietaryPattern, allergies, gender, age: a });
  }, [dietaryPattern, allergies, gender, a]);

  const regionalMeals = useMemo(() => {
    return getRegionalMeals(region);
  }, [region]);

  const healthNotes = useMemo(() => {
    return getHealthFlagNotes(healthFlags);
  }, [healthFlags]);

  const userRiskNutrients = useMemo(() => {
    return getUserRiskNutrients(dietaryPattern);
  }, [dietaryPattern]);

  if (!calc) {
    return (
      <div className="diet-guide-error">
        Missing information. Please complete your profile first.
      </div>
    );
  }

  const { targetCalories, protein, carbs, fat, water, fiber, bmiCat } = calc;

  return (
    <motion.div
      className="personalized-diet-guide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="diet-goal-selector">
        <label>Your Goal:</label>
        <div className="goal-btn-group">
          <button className={goal === 'Weight Loss' ? 'active' : ''} onClick={() => setGoal('Weight Loss')}>Weight Loss</button>
          <button className={goal === 'Maintain' ? 'active' : ''} onClick={() => setGoal('Maintain')}>Maintain</button>
          <button className={goal === 'Muscle Gain' ? 'active' : ''} onClick={() => setGoal('Muscle Gain')}>Muscle Gain</button>
        </div>
      </div>

      {/* SECTION 1: Your Nutrition Summary */}
      <div className="diet-section summary-grid">
        <div className="summary-card main-cal">
          <span>🎯 Daily Calories</span>
          <strong>{targetCalories} <span>kcal</span></strong>
        </div>
        <div className="summary-card">
          <span>🥗 BMI Category</span>
          <strong>{bmiCat}</strong>
        </div>
        {waistRisk && waistRisk.level !== 'normal' && (
          <div className="summary-card" style={{ borderColor: waistRisk.color }}>
            <span style={{ color: waistRisk.color }}>⚠️ Waist Risk</span>
            <strong style={{ color: waistRisk.color }}>{waistRisk.label}</strong>
          </div>
        )}
        <div className="summary-card">
          <span>🥩 Protein Goal</span>
          <strong>{protein}g</strong>
        </div>
        <div className="summary-card">
          <span>🍚 Carbs Goal</span>
          <strong>{carbs}g</strong>
        </div>
        <div className="summary-card">
          <span>🥑 Fat Goal</span>
          <strong>{fat}g</strong>
        </div>
        <div className="summary-card">
          <span>💧 Daily Water</span>
          <strong>{water}</strong>
        </div>
        <div className="summary-card">
          <span>🌾 Daily Fiber</span>
          <strong>{fiber}g</strong>
        </div>
        <div className="summary-card">
          <span>🍽️ Meal Frequency</span>
          <strong>{mealsPerDay === '3' ? '3 Meals + 1–2 Snacks' : '5–6 Small Meals'}</strong>
        </div>
      </div>

      <div className="diet-grid-2">
        {/* SECTION 12: Personalized Daily Targets */}
        <div className="diet-section">
          <h3>📊 Personalized Daily Targets</h3>
          <ul className="target-list">
            <li><strong>Protein:</strong> {protein} g</li>
            <li><strong>Carbohydrates:</strong> {carbs} g</li>
            <li><strong>Fat:</strong> {fat} g</li>
            <li><strong>Water:</strong> {water}</li>
            <li><strong>Fiber:</strong> {fiber} g</li>
            <li><strong>Fruits:</strong> 2–3 servings</li>
            <li><strong>Vegetables:</strong> 4–5 servings</li>
            <li><strong>Dairy:</strong> {['vegan', 'lactose'].some(a => allergies.includes(a) || dietaryPattern === 'vegan') ? '2 servings (plant-based)' : '2 servings'}</li>
            <li><strong>Healthy Fats:</strong> 2 servings</li>
          </ul>
        </div>

        {/* SECTION 3: BMI & Waist Health Insight */}
        <div className="diet-section warning-section">
          <h3>⚠️ Metabolic Health Insight</h3>
          <p>Your BMI is <strong>{bmi.toFixed(1)}</strong>.</p>
          {bmi < 18.5 && <p><strong>Recommendation:</strong> Healthy weight gain is advised. Focus on nutrient-dense, higher-calorie foods.</p>}
          {bmi >= 18.5 && bmi < 23 && <p><strong>Status:</strong> Healthy weight range by Asian standards. Keep up the good work.</p>}
          {bmi >= 23 && bmi < 25 && <p><strong>Recommendation:</strong> Approaching overweight for Indian populations. A moderate calorie deficit and increased daily steps are advised.</p>}
          {bmi >= 25 && <p><strong>Recommendation:</strong> Above recommended cutoffs for metabolic health. Consider consulting a healthcare professional for a personalized health plan.</p>}

          {waistRisk && waistRisk.level !== 'normal' && (
            <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: `4px solid ${waistRisk.color}` }}>
              <p style={{ margin: 0 }}><strong>Waist Circumference Flag:</strong> {waistRisk.message}</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: Foods You Should Eat More (Dynamic Engine Output) */}
      <div className="diet-section">
        <h3>✅ Personalized Food Recommendations</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
          Based on your {dietaryPattern} diet {allergies.length > 0 && `(and marked allergies)`}, you are statistically more likely to be short on these nutrients. Focus on adding these to your meals:
        </p>

        <div className="recommendation-cards">
          {foodAdditions.map(rec => (
            <div key={rec.id} className="rec-card">
              <div className="rec-header">
                <h4>{rec.nutrientName}</h4>
                <span className={`risk-badge risk-${rec.riskLevel}`}>{rec.riskLevel} risk</span>
              </div>
              <p className="rec-reason">{rec.reason}</p>
              
              <div className="rec-foods">
                <strong>Best Sources For You:</strong>
                <p>{rec.foods.length > 0 ? rec.foods.join(', ') : 'No direct whole-food sources available for your dietary pattern. Consider supplementation.'}</p>
              </div>

              {rec.pairingTip && (
                <div className="rec-pairing">
                  <p>{rec.pairingTip}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* SECTION 8: Meal Timing & Macros */}
      <div className="diet-section">
        <h3>⏱️ Meal Timing & Macros</h3>
        <div className="meal-timing-grid">
          {mealsPerDay === '3' ? (
            <>
              <div className="meal-box">
                <h4>Breakfast</h4>
                <span>20–25% calories</span>
                <p className="mt-1 text-sm text-gray-400">Prefer protein-rich options to stabilize blood sugar all day.</p>
              </div>
              <div className="meal-box">
                <h4>Lunch</h4>
                <span>35–40% calories</span>
              </div>
              <div className="meal-box">
                <h4>Dinner</h4>
                <span>25–30% calories</span>
              </div>
              <div className="meal-box">
                <h4>Snacks</h4>
                <span>10–15% calories</span>
              </div>
            </>
          ) : (
            <>
              <div className="meal-box">
                <h4>Early Meal</h4>
                <span>15% calories</span>
              </div>
              <div className="meal-box">
                <h4>Mid-Meal</h4>
                <span>20% calories</span>
              </div>
              <div className="meal-box">
                <h4>Meal 3</h4>
                <span>20% calories</span>
              </div>
              <div className="meal-box">
                <h4>Pre/Post Workout</h4>
                <span>15% calories</span>
              </div>
              <div className="meal-box">
                <h4>Last Meal</h4>
                <span>20% calories</span>
              </div>
              <div className="meal-box">
                <h4>Snack</h4>
                <span>10% calories</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SECTION 10: Indian Diet Suggestions (Regional) */}
      <div className="diet-section">
        <h3>🍛 Meal Suggestions: {regionalMeals.label}</h3>
        <div className="indian-diet-grid">
          <div>
            <h4>Breakfast</h4>
            <p>{regionalMeals.breakfast.join(', ')}</p>
          </div>
          <div>
            <h4>Lunch</h4>
            <p>{regionalMeals.lunch.join(', ')}</p>
          </div>
          <div>
            <h4>Dinner</h4>
            <p>{regionalMeals.dinner.join(', ')}</p>
          </div>
          <div>
            <h4>Healthy Snacks</h4>
            <p>{regionalMeals.snacks.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* SECTION 11: Healthy Core Habits */}
      <div className="diet-section habit-list">
        <h3>🧠 Healthy Core Habits</h3>
        <ul>
          <li>Eat a variety of protein sources across the day</li>
          <li>Eat vegetables with lunch and dinner</li>
          <li>Drink enough water</li>
          <li>Limit added sugar</li>
          <li>Avoid skipping breakfast</li>
          <li>Prefer whole grains over refined grains</li>
          <li>Reduce processed foods</li>
          <li>Choose healthy cooking methods</li>
          <li>Eat slowly</li>
          <li>Maintain portion control</li>
          <li>Sleep 7–9 hours</li>
          <li>Exercise regularly</li>
        </ul>
      </div>

      {/* SECTION 11.5: Lifestyle Tips */}
      <div className="diet-section habit-list">
        <h3>🌟 Lifestyle Tips</h3>
        {sleepHours && sleepHours < 7 && (
          <p style={{ color: '#FACC15', padding: '12px', background: 'rgba(250,204,21,0.1)', borderRadius: '8px', marginBottom: '16px' }}>
            <strong>Note:</strong> You indicated you sleep {sleepHours} hours a night. Adults generally need 7-9 hours for optimal metabolic health and muscle recovery. Consider prioritizing sleep hygiene.
          </p>
        )}
        <ul className="lifestyle-badges">
          <li>Hydration</li>
          <li>Stress management</li>
          <li>Sleep hygiene</li>
          <li>Daily Walking</li>
          <li>Strength training</li>
          <li>Stretching</li>
          <li>Posture correction</li>
          <li>Screen time reduction</li>
        </ul>
      </div>

      {/* SECTION 4 (Updated): Daily Micronutrient Checklist */}
      <div className="diet-section p-0 overflow-hidden">
        <h3 className="p-4 m-0 border-b border-[rgba(255,255,255,0.06)]">
          🧬 Micronutrient Checklist
          <span style={{ fontSize: '14px', marginLeft: '12px', color: '#ff79c6', fontWeight: 'normal' }}>
            Highlighted rows are higher risk for {dietaryPattern}s
          </span>
        </h3>
        <div className="micro-table-wrap">
          <table className="micro-table">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>RDA (ICMR-NIN 2020)</th>
                <th>Importance</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {NUTRIENT_DB.map((m, i) => {
                const isRisk = userRiskNutrients.includes(m.id);
                return (
                  <tr key={i} className={isRisk ? 'risk-row' : ''}>
                    <td>
                      <strong>{m.name}</strong>
                      {isRisk && <span title="Elevated risk based on your dietary pattern" style={{ marginLeft: '6px', color: '#ff79c6' }}>⚠️</span>}
                    </td>
                    <td>{m.rda}</td>
                    <td>{m.importance}</td>
                    <td>
                      {m.foodSourcesByPreference[dietaryPattern]?.slice(0, 3).join(', ') || 'Supplementation may be required.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </motion.div>
  );
}
