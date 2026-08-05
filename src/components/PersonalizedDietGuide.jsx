import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
const MICRONUTRIENTS = [
  { name: 'Protein', amount: 'Varies', importance: 'Muscle repair, hormones, enzymes', sources: 'Meat, dairy, legumes' },
  { name: 'Calcium', amount: '1000mg', importance: 'Bone health, muscle function', sources: 'Dairy, leafy greens, fortified foods' },
  { name: 'Iron', amount: '8-18mg', importance: 'Oxygen transport in blood', sources: 'Spinach, red meat, lentils' },
  { name: 'Vitamin D', amount: '15-20mcg', importance: 'Calcium absorption, immunity', sources: 'Sunlight, fatty fish, egg yolks' },
  { name: 'Vitamin B12', amount: '2.4mcg', importance: 'Nerve function, DNA synthesis', sources: 'Meat, dairy, fortified cereals' },
  { name: 'Vitamin C', amount: '75-90mg', importance: 'Immunity, collagen production', sources: 'Citrus, berries, bell peppers' },
  { name: 'Vitamin A', amount: '700-900mcg', importance: 'Vision, immune system', sources: 'Carrots, sweet potatoes, spinach' },
  { name: 'Magnesium', amount: '310-420mg', importance: 'Muscle/nerve function, energy', sources: 'Nuts, seeds, whole grains' },
  { name: 'Potassium', amount: '2600-3400mg', importance: 'Blood pressure, fluid balance', sources: 'Bananas, potatoes, avocados' },
  { name: 'Omega-3', amount: '1.1-1.6g', importance: 'Brain health, inflammation', sources: 'Fatty fish, flax seeds, walnuts' },
  { name: 'Zinc', amount: '8-11mg', importance: 'Immunity, wound healing', sources: 'Meat, shellfish, legumes, seeds' }
];

export default function PersonalizedDietGuide({ data }) {
  const { gender, age: ageStr, weight: weightStr, heightCm: heightStr, bmi, maintenanceCalories, activityLevelIndex } = data;
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
    
    // Adjust total to exactly match sum due to rounding
    const totalKcal = proteinKcal + fatKcal + carbKcal;
    
    const waterMin = (35 * w) / 1000;
    const waterMax = (40 * w) / 1000;
    
    const fiber = gender === 'male' ? 38 : 25;

    let bmiCat = 'Normal';
    if (bmi < 18.5) bmiCat = 'Underweight';
    else if (bmi >= 25 && bmi < 30) bmiCat = 'Overweight';
    else if (bmi >= 30) bmiCat = 'Obese';

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

  if (!calc) {
    return (
      <div className="diet-guide-error">
        Missing information. Please complete your profile in the Calorie Calculator tab first.
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
          <strong>3 Meals + 1–2 Snacks</strong>
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
            <li><strong>Dairy:</strong> 2 servings</li>
            <li><strong>Healthy Fats:</strong> 2 servings</li>
          </ul>
        </div>
        
        {/* SECTION 9: Warnings */}
        <div className="diet-section warning-section">
          <h3>⚠️ BMI Health Insight</h3>
          <p>Your BMI is {bmi.toFixed(1)}.</p>
          {bmi < 18.5 && <p><strong>Recommendation:</strong> Healthy weight gain is advised. Focus on nutrient-dense, higher-calorie foods.</p>}
          {bmi >= 18.5 && bmi <= 24.9 && <p><strong>Status:</strong> Healthy weight. Keep up the good work and maintain a balanced lifestyle.</p>}
          {bmi >= 25 && bmi <= 29.9 && <p><strong>Recommendation:</strong> A moderate calorie deficit and increased daily steps are advised.</p>}
          {bmi >= 30 && <p><strong>Recommendation:</strong> Consider consulting a healthcare professional for a personalized health plan.</p>}
        </div>
      </div>

      {/* SECTION 2: Foods You Should Eat More */}
      <div className="diet-section">
        <h3>✅ Foods You Should Eat More</h3>
        <div className="foods-to-add-grid">
          <div className="food-group">
            <h4>🥩 Protein Sources</h4>
            <p className="sub">Vegetarian:</p>
            <p>Paneer, Greek yogurt, Milk, Curd, Tofu, Soy chunks, Dal, Rajma, Chickpeas, Moong, Black chana, Sprouts, Peanuts</p>
            <p className="sub mt-2">Non-Vegetarian:</p>
            <p>Eggs, Chicken breast, Fish, Lean meat</p>
          </div>
          <div className="food-group">
            <h4>🍚 Healthy Carbs</h4>
            <p>Brown rice, Oats, Whole wheat roti, Sweet potato, Poha, Millets, Quinoa, Fruits</p>
          </div>
          <div className="food-group">
            <h4>🥑 Healthy Fats</h4>
            <p>Almonds, Walnuts, Flax seeds, Pumpkin seeds, Sunflower seeds, Peanut butter, Olive oil, Avocado</p>
          </div>
          <div className="food-group">
            <h4>🥦 Vegetables & Fruits</h4>
            <p><strong>Veg:</strong> Spinach, Broccoli, Carrot, Beetroot, Tomato, Capsicum, Cucumber, Bottle gourd, Beans, Cauliflower</p>
            <p><strong>Fruit:</strong> Banana, Apple, Orange, Guava, Papaya, Pomegranate, Watermelon, Kiwi, Berries</p>
          </div>
        </div>
      </div>

      {/* SECTION 11: Foods Based on BMI */}
      <div className="diet-section">
        <h3>🍔 Tailored For Your Body Type ({bmiCat})</h3>
        {bmiCat === 'Underweight' && (
          <div className="bmi-foods">
            <p><strong>Increase:</strong> Milk, Paneer, Eggs, Rice, Potatoes, Nuts, Healthy oils, Bananas, Peanut butter.</p>
          </div>
        )}
        {bmiCat === 'Normal' && (
          <div className="bmi-foods">
            <p>Maintain balanced diet, maintain calories, and ensure protein in every meal.</p>
          </div>
        )}
        {bmiCat === 'Overweight' && (
          <div className="bmi-foods">
            <p><strong>Increase:</strong> Vegetables, Lean protein, Fruits, Whole grains.</p>
            <p><strong>Reduce:</strong> Sugar, Refined flour, Sugary drinks, Fried foods.</p>
          </div>
        )}
        {bmiCat === 'Obese' && (
          <div className="bmi-foods">
            <p><strong>Increase:</strong> High-fiber foods, Lean protein, Water.</p>
            <p><strong>Reduce:</strong> Ultra-processed food, Sugary drinks, Alcohol.</p>
          </div>
        )}
      </div>

      {/* SECTION 3: Foods To Limit */}
      <div className="diet-section warning-section">
        <h3>🚫 Foods To Limit</h3>
        <p>Soft drinks, Sugary beverages, Energy drinks, Excess sweets, Candy, White bread, Deep fried food, Fast food, Processed meat, Packaged chips, Bakery products, Alcohol, Smoking, High sodium packaged foods, Instant noodles, Highly processed snacks.</p>
      </div>

      {/* SECTION 7: Goal Specific Recommendations */}
      <div className="diet-section accent-section">
        <h3>🎯 Goal Blueprint: {goal}</h3>
        {goal === 'Weight Loss' && (
          <ul>
            <li>Maintain a calorie deficit</li>
            <li>High protein, moderate carbs, healthy fats</li>
            <li>Eat more volume via vegetables</li>
            <li>Walk after meals</li>
            <li>Limit sugar and avoid liquid calories completely</li>
          </ul>
        )}
        {goal === 'Maintain' && (
          <ul>
            <li>Balanced diet at maintenance calories</li>
            <li>Maintain sufficient protein intake</li>
            <li>Maintain consistent physical activity</li>
            <li>Eat enough fruits and vegetables daily</li>
          </ul>
        )}
        {goal === 'Muscle Gain' && (
          <ul>
            <li>Maintain a calorie surplus</li>
            <li>Protein intake around 1.6–2.0 g/kg body weight</li>
            <li>Prioritize strength training</li>
            <li>Consume carbs around workouts for energy/recovery</li>
            <li>Get 8 hours of sleep for recovery</li>
          </ul>
        )}
      </div>

      {/* SECTION 6: Meal Timing */}
      <div className="diet-section">
        <h3>⏱️ Meal Timing & Macros</h3>
        <div className="meal-timing-grid">
          <div className="meal-box">
            <h4>Breakfast</h4>
            <span>20–25% calories</span>
            <p className="mt-1 text-sm text-gray-400">Prefer protein-rich options like eggs, greek yogurt, or paneer.</p>
          </div>
          <div className="meal-box">
            <h4>Lunch</h4>
            <span>30–35% calories</span>
          </div>
          <div className="meal-box">
            <h4>Dinner</h4>
            <span>25–30% calories</span>
          </div>
          <div className="meal-box">
            <h4>Snacks</h4>
            <span>10–20% calories</span>
          </div>
        </div>
      </div>

      {/* SECTION 10: Indian Diet Suggestions */}
      <div className="diet-section">
        <h3>🍛 Indian Diet Suggestions</h3>
        <div className="indian-diet-grid">
          <div>
            <h4>Breakfast</h4>
            <p>Poha, Upma, Oats, Idli, Dosa, Eggs, Milk</p>
          </div>
          <div>
            <h4>Lunch</h4>
            <p>Dal, Rice, Roti, Paneer, Chicken, Vegetables, Curd</p>
          </div>
          <div>
            <h4>Dinner</h4>
            <p>Khichdi, Chapati, Dal, Paneer, Soup, Vegetables</p>
          </div>
          <div>
            <h4>Healthy Snacks</h4>
            <p>Fruit, Roasted chana, Makhana, Sprouts, Nuts, Buttermilk, Greek yogurt</p>
          </div>
        </div>
      </div>

      {/* SECTION 5: Healthy Eating Habits */}
      <div className="diet-section habit-list">
        <h3>🧠 Healthy Core Habits</h3>
        <ul>
          <li>Eat protein in every meal</li>
          <li>Eat vegetables with lunch and dinner</li>
          <li>Drink enough water</li>
          <li>Limit added sugar</li>
          <li>Avoid skipping breakfast</li>
          <li>Prefer whole grains</li>
          <li>Reduce processed foods</li>
          <li>Choose healthy cooking methods</li>
          <li>Eat slowly</li>
          <li>Maintain portion control</li>
          <li>Sleep 7–9 hours</li>
          <li>Exercise regularly</li>
        </ul>
      </div>

      {/* SECTION 8: Lifestyle Tips */}
      <div className="diet-section habit-list">
        <h3>🌟 Lifestyle Tips</h3>
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

      {/* SECTION 4: Daily Micronutrient Checklist */}
      <div className="diet-section p-0 overflow-hidden">
        <h3 className="p-4 m-0 border-b border-[rgba(255,255,255,0.06)]">🧬 Daily Micronutrient Checklist</h3>
        <div className="micro-table-wrap">
          <table className="micro-table">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Amount</th>
                <th>Importance</th>
                <th>Best Sources</th>
              </tr>
            </thead>
            <tbody>
              {MICRONUTRIENTS.map((m, i) => (
                <tr key={i}>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.amount}</td>
                  <td>{m.importance}</td>
                  <td>{m.sources}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </motion.div>
  );
}
