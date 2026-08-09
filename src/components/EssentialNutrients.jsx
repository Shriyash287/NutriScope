import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NUTRIENTS = [
  {
    id: 'protein',
    name: 'Protein',
    importance: 'Muscle repair, Immunity, Hormone production, Hair, Skin',
    deficiencyRisk: 'Moderate',
    benefits: 'Essential for muscle repair, immunity, and hormone production.',
    symptoms: 'Weak muscles, fatigue, slow recovery.',
    foodSources: 'Eggs, Milk, Paneer, Chicken, Fish, Soy, Dal, Beans, Greek yogurt',
    rda: '0.83 g/kg (sedentary minimum, ICMR-NIN 2020), 1.2–2.2 g/kg (active)',
    supplement: 'Protein powder only if food intake is insufficient.',
    details: 'Important for recovery, especially with an active lifestyle.'
  },
  {
    id: 'vitD',
    name: 'Vitamin D',
    deficiencyRisk: 'Very High',
    importance: 'Bone strength, Immunity, Mood, Hormones',
    benefits: 'Crucial for bone strength, immunity, mood, and hormones.',
    symptoms: 'Bone pain, weakness, fatigue, frequent illness.',
    foodSources: 'Sunlight, Egg yolk, Fish, Fortified milk',
    rda: '800 IU/d (both sexes)',
    supplement: 'Often required after blood testing.',
    details: 'Despite abundant sunlight in India, deficiency is widespread due to indoor lifestyles, clothing, pollution, and sunscreen use.'
  },
  {
    id: 'vitB12',
    name: 'Vitamin B12',
    deficiencyRisk: 'Very High',
    importance: 'Nervous system, Brain, DNA, Red blood cells',
    benefits: 'Maintains nervous system and brain health, aids in DNA synthesis.',
    symptoms: 'Tingling, fatigue, memory issues, anemia.',
    foodSources: 'Eggs, Dairy, Meat, Fish',
    rda: '2.5 mcg/d (Adults)',
    supplement: 'Commonly needed for strict vegetarians or those with confirmed deficiency.',
    details: 'Especially lacking among vegetarians and vegans as it is primarily found in animal products.'
  },
  {
    id: 'iron',
    name: 'Iron',
    deficiencyRisk: 'High',
    importance: 'Oxygen transport, Energy, Brain function',
    benefits: 'Vital for oxygen transport, energy levels, and brain function.',
    symptoms: 'Fatigue, pale skin, hair fall, breathlessness.',
    foodSources: 'Spinach, Rajma, Chana, Meat, Jaggery, Seeds',
    rda: '19mg/d (both sexes, adult)',
    supplement: 'If prescribed by a doctor.',
    details: 'Especially lacking among women and adolescents. Consume with Vitamin C-rich foods to improve absorption.'
  },
  {
    id: 'calcium',
    name: 'Calcium',
    deficiencyRisk: 'Moderate-High',
    importance: 'Bones, Teeth, Muscles, Nerves',
    benefits: 'Builds and maintains strong bones and teeth, essential for muscle and nerve function.',
    symptoms: 'Weak bones, muscle cramps.',
    foodSources: 'Milk, Paneer, Yogurt, Sesame, Ragi',
    rda: '1000 mg/d (both sexes, adult)',
    supplement: 'If dietary intake is inadequate.',
    details: ''
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    deficiencyRisk: 'Moderate',
    importance: 'Sleep, Muscle recovery, Heart, Energy',
    benefits: 'Improves sleep quality, aids muscle recovery, supports heart health.',
    symptoms: 'Muscle cramps, poor sleep, fatigue.',
    foodSources: 'Pumpkin seeds, Almonds, Cashews, Dark chocolate, Spinach',
    rda: '340mg/d (Adult Men), 310mg/d (Adult Women)',
    supplement: 'Magnesium glycinate/citrate if deficient or for sleep issues.',
    details: ''
  },
  {
    id: 'zinc',
    name: 'Zinc',
    deficiencyRisk: 'Moderate',
    importance: 'Immunity, Skin, Testosterone, Healing',
    benefits: 'Boosts immunity, maintains skin health, supports testosterone and wound healing.',
    symptoms: 'Hair loss, slow healing, acne.',
    foodSources: 'Pumpkin seeds, Meat, Eggs, Dairy, Lentils',
    rda: 'Men 17mg/d, Women 13.2mg/d',
    supplement: 'If dietary intake is persistently low.',
    details: ''
  },
  {
    id: 'omega3',
    name: 'Omega-3',
    deficiencyRisk: 'Moderate',
    importance: 'Brain, Heart, Eyes, Reduce inflammation',
    benefits: 'Supports brain function, heart health, eye health, and reduces inflammation.',
    symptoms: 'Dry skin, poor focus, joint pain.',
    foodSources: 'Salmon, Sardines, Walnuts, Flaxseed, Chia',
    rda: '1.1-1.6 g/d',
    supplement: 'Fish oil or algae oil if dietary intake is low.',
    details: ''
  },
  {
    id: 'vitC',
    name: 'Vitamin C',
    deficiencyRisk: 'Low',
    importance: 'Immunity, Collagen, Iron absorption',
    benefits: 'Boosts immunity, aids collagen production, improves iron absorption.',
    symptoms: 'Scurvy, slow healing, frequent colds.',
    foodSources: 'Amla, Orange, Lemon, Guava, Kiwi, Bell peppers',
    rda: 'Adult Men 80mg/d, Adult Women 65mg/d',
    supplement: 'Rarely needed if eating enough fruits and vegetables.',
    details: ''
  },
  {
    id: 'folate',
    name: 'Folate (Vitamin B9)',
    deficiencyRisk: 'Moderate',
    importance: 'Cell growth, Pregnancy, DNA',
    benefits: 'Essential for cell growth, healthy pregnancy, and DNA formation.',
    symptoms: 'Fatigue, gray hair, mouth sores.',
    foodSources: 'Spinach, Lentils, Beans, Citrus fruits',
    rda: 'Adult Men 300µg/d, Adult Women 200µg/d',
    supplement: 'Crucial supplement for pregnant women.',
    details: ''
  },
  {
    id: 'vitA',
    name: 'Vitamin A',
    deficiencyRisk: 'Low',
    importance: 'Vision, Skin, Immunity',
    benefits: 'Supports healthy vision, skin, and immune system.',
    symptoms: 'Night blindness, dry skin.',
    foodSources: 'Carrots, Sweet potato, Mango, Liver, Eggs',
    rda: '1000 µg/d (Adult Men), 840 µg/d (Adult Women)',
    supplement: 'Rarely needed unless specifically recommended.',
    details: ''
  },
  {
    id: 'vitE',
    name: 'Vitamin E',
    deficiencyRisk: 'Low',
    importance: 'Skin, Antioxidant, Hair',
    benefits: 'Powerful antioxidant for skin and hair health.',
    symptoms: 'Muscle weakness, vision problems.',
    foodSources: 'Almonds, Sunflower seeds, Avocado',
    rda: '10 mg/d (Adult Men), 7.5 mg/d (Adult Women)',
    supplement: 'Rarely needed.',
    details: ''
  },
  {
    id: 'vitK',
    name: 'Vitamin K',
    deficiencyRisk: 'Low',
    importance: 'Blood clotting, Bone health',
    benefits: 'Essential for proper blood clotting and bone metabolism.',
    symptoms: 'Easy bruising, excessive bleeding.',
    foodSources: 'Spinach, Kale, Broccoli',
    rda: '55 µg/d (Adult Men, Women)',
    supplement: 'Rarely needed.',
    details: ''
  },
  {
    id: 'potassium',
    name: 'Potassium',
    deficiencyRisk: 'Moderate',
    importance: 'Heart, Blood pressure, Muscle contractions',
    benefits: 'Maintains healthy blood pressure and heart function.',
    symptoms: 'Muscle weakness, cramps, irregular heartbeat.',
    foodSources: 'Banana, Coconut water, Potato, Beans',
    rda: '3500 mg/d (Adults)',
    supplement: 'Rarely recommended without medical supervision.',
    details: ''
  },
  {
    id: 'selenium',
    name: 'Selenium',
    deficiencyRisk: 'Low',
    importance: 'Thyroid, Immunity',
    benefits: 'Supports thyroid function and acts as an antioxidant.',
    symptoms: 'Fatigue, muscle weakness, mental fog.',
    foodSources: 'Eggs, Seafood, Whole grains',
    rda: '40 µg/d (Adults)',
    supplement: 'Rarely needed.',
    details: ''
  },
  {
    id: 'iodine',
    name: 'Iodine',
    deficiencyRisk: 'Low',
    importance: 'Thyroid hormones, Metabolism',
    benefits: 'Regulates thyroid hormones and overall metabolism.',
    symptoms: 'Goiter, weight gain, fatigue.',
    foodSources: 'Iodized salt, Seafood, Dairy',
    rda: '150 mcg/d (Adults)',
    supplement: 'Rarely needed.',
    details: 'Deficiency is lower in India due to successful iodized salt programs.'
  }
];

function getRiskColor(risk) {
  if (risk === 'Very High') return '#EF4444'; // Red
  if (risk.includes('High')) return '#F97316'; // Orange
  if (risk === 'Moderate') return '#FACC15'; // Yellow
  return '#22C55E'; // Green
}

function NutrientCard({ nutrient }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div className="nutrient-card" layout>
      <div className="nc-header">
        <h4 className="nc-name">{nutrient.name}</h4>
        <span className="nc-risk-badge" style={{ backgroundColor: getRiskColor(nutrient.deficiencyRisk) + '20', color: getRiskColor(nutrient.deficiencyRisk) }}>
          {nutrient.deficiencyRisk} Risk
        </span>
      </div>
      
      <p className="nc-importance"><strong>Important for:</strong> {nutrient.importance}</p>
      
      <div className="nc-quick-facts">
        <div><strong>Sources:</strong> {nutrient.foodSources}</div>
        <div><strong>RDA:</strong> {nutrient.rda}</div>
      </div>

      <button className="nc-expand-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show Less' : 'More Information'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            className="nc-expanded-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="nc-detail-section">
              <h5>Benefits</h5>
              <p>{nutrient.benefits}</p>
            </div>
            <div className="nc-detail-section">
              <h5>Deficiency Symptoms</h5>
              <p>{nutrient.symptoms}</p>
            </div>
            <div className="nc-detail-section">
              <h5>Supplement Needed?</h5>
              <p>{nutrient.supplement}</p>
            </div>
            {nutrient.details && (
              <div className="nc-detail-section">
                <h5>Special Note</h5>
                <p>{nutrient.details}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EssentialNutrients({ data }) {
  const [dietaryPreference, setDietaryPreference] = useState('Vegetarian');
  const { gender, age, weight, heightCm, bmi, activityLevelIndex } = data || {};

  const personalizedInsights = useMemo(() => {
    let highRisk = [];
    let likelyAdequate = [];
    let considerTesting = [];
    let foodFirst = [];

    // General Indian population risks
    highRisk.push('Vitamin D');
    considerTesting.push('Vitamin D (if experiencing fatigue/bone pain)');
    
    // Diet specific
    if (dietaryPreference === 'Vegan' || dietaryPreference === 'Vegetarian') {
      highRisk.push('Vitamin B12');
      considerTesting.push('Vitamin B12');
      if (dietaryPreference === 'Vegan') {
        highRisk.push('Calcium', 'Iron', 'Omega-3');
        foodFirst.push('Fortified plant milks, green leafy veggies for Calcium.');
      } else {
        foodFirst.push('Dairy for Calcium and B12.');
      }
    } else {
      likelyAdequate.push('Vitamin B12', 'Protein');
    }

    if (gender === 'female' && age >= 13 && age <= 50) {
      highRisk.push('Iron');
      considerTesting.push('Iron/Ferritin (if experiencing fatigue/hair fall)');
      foodFirst.push('Spinach with Lemon, Jaggery, Beans.');
    }

    if (activityLevelIndex >= 3) { // Active or Very active
      foodFirst.push('Consume higher Protein sources for muscle recovery.');
      foodFirst.push('Ensure adequate Magnesium for muscle relaxation.');
    }

    return { highRisk, likelyAdequate, considerTesting, foodFirst: [...new Set(foodFirst)] };
  }, [dietaryPreference, gender, age, activityLevelIndex]);

  return (
    <div className="essential-nutrients-section">
      <div className="en-header">
        <h2>Essential Nutrients & Supplements</h2>
        <p className="en-subtitle">Educate yourself about common deficiencies, especially in Indian diets. Always prioritize food over supplements.</p>
      </div>

      <div className="en-personalization-card">
        <h3>Smart Personalized Recommendations</h3>
        <div className="en-diet-selector">
          <label>Your Dietary Preference:</label>
          <select value={dietaryPreference} onChange={(e) => setDietaryPreference(e.target.value)}>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Eggetarian">Eggetarian</option>
            <option value="Non-Veg">Non-Vegetarian</option>
          </select>
        </div>
        
        <div className="en-insights-grid">
          {personalizedInsights.highRisk.length > 0 && (
            <div className="en-insight-box high-risk">
              <h4>⚠️ Higher Risk For You</h4>
              <ul>
                {personalizedInsights.highRisk.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
          {personalizedInsights.likelyAdequate.length > 0 && (
            <div className="en-insight-box adequate">
              <h4>✅ Likely Adequate</h4>
              <ul>
                {personalizedInsights.likelyAdequate.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
          {personalizedInsights.foodFirst.length > 0 && (
            <div className="en-insight-box food-first">
              <h4>🥗 Food First strategy</h4>
              <ul>
                {personalizedInsights.foodFirst.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
          {personalizedInsights.considerTesting.length > 0 && (
            <div className="en-insight-box testing">
              <h4>🩸 Consider Testing</h4>
              <ul>
                {personalizedInsights.considerTesting.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="en-infographic">
        <h3>Common Deficiencies in India</h3>
        <div className="en-info-grid">
          <div className="en-info-item"><span className="dot red"></span> Vitamin D <strong>(Very High)</strong></div>
          <div className="en-info-item"><span className="dot red"></span> Vitamin B12 <strong>(Very High)</strong></div>
          <div className="en-info-item"><span className="dot red"></span> Iron <strong>(High)</strong></div>
          <div className="en-info-item"><span className="dot orange"></span> Calcium <strong>(Mod-High)</strong></div>
          <div className="en-info-item"><span className="dot yellow"></span> Protein <strong>(Moderate)</strong></div>
          <div className="en-info-item"><span className="dot yellow"></span> Zinc <strong>(Moderate)</strong></div>
        </div>
      </div>

      <div className="en-nutrient-grid">
        {NUTRIENTS.map(nutrient => (
          <NutrientCard key={nutrient.id} nutrient={nutrient} />
        ))}
      </div>

      <div className="en-disclaimer">
        <p><strong>Important:</strong> This analysis is for educational purposes only and does not diagnose nutrient deficiencies. Most nutrients are best obtained through a balanced diet. Supplements should ideally be taken only when recommended by a qualified healthcare professional or after appropriate medical testing.</p>
      </div>
    </div>
  );
}
