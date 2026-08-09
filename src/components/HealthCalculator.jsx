import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
const activityLevels = [
  { label: 'Sedentary', desc: 'Little or no exercise', factor: 1.20, emoji: '🪑' },
  { label: 'Light', desc: 'Exercise 1–3 days/week', factor: 1.375, emoji: '🚶' },
  { label: 'Moderate', desc: 'Exercise 3–5 days/week', factor: 1.55, emoji: '🏃' },
  { label: 'Active', desc: 'Exercise 6–7 days/week', factor: 1.725, emoji: '🏋️' },
  { label: 'Very Active', desc: 'Intense daily training', factor: 1.90, emoji: '⚡' },
];

function getBmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: '#38BDF8', emoji: '🔹', advice: 'Consider a calorie surplus with nutrient-dense foods to reach a healthy weight.' };
  if (bmi < 23) return { label: 'Normal', color: '#22C55E', emoji: '✅', advice: 'Great job! Maintain your current habits with a balanced diet and regular activity.' };
  if (bmi < 25) return { label: 'Overweight', color: '#FACC15', emoji: '⚠️', advice: 'A slight calorie deficit with regular exercise can help you reach a healthier range.' };
  return { label: 'Obese', color: '#F97316', emoji: '🔴', advice: 'Consult a healthcare provider for a personalized plan combining diet and exercise.' };
}

function getBmiBarPercent(bmi) {
  // Maps BMI 10–45 to 0–100% for the gauge
  return Math.min(100, Math.max(0, ((bmi - 10) / 35) * 100));
}

// SVG Radial Gauge for BMI
function BmiGauge({ bmi }) {
  const category = getBmiCategory(bmi);
  const radius = 80;
  const circumference = Math.PI * radius; // half circle
  const percent = getBmiBarPercent(bmi);
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="bmi-gauge-container">
      <svg width="220" height="130" viewBox="0 0 220 130">
        {/* Background arc */}
        <path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Colored arc */}
        <motion.path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none"
          stroke={category.color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 8px ${category.color}50)` }}
        />
        {/* Tick marks */}
        {[18.5, 23, 25].map((val) => {
          const angle = Math.PI - ((getBmiBarPercent(val) / 100) * Math.PI);
          const x = 110 + 90 * Math.cos(angle);
          const y = 120 - 90 * Math.sin(angle);
          return (
            <g key={val}>
              <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.3)" />
              <text x={x} y={y - 8} fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle">{val}</text>
            </g>
          );
        })}
      </svg>
      <div className="bmi-gauge-value">
        <motion.span
          className="bmi-number"
          style={{ color: category.color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          {bmi.toFixed(1)}
        </motion.span>
        <span className="bmi-category-label" style={{ color: category.color }}>
          {category.emoji} {category.label}
        </span>
      </div>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '16px', maxWidth: '280px', lineHeight: '1.4' }}>
        Categories use WHO Asia-Pacific / ICMR-recommended cutoffs for Indian populations, which are lower than global WHO standards.
      </p>
    </div>
  );
}

// Animated calorie display
function CalorieResult({ calories, macros }) {
  return (
    <motion.div
      className="calorie-result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="calorie-main">
        <span className="calorie-label">Daily Maintenance</span>
        <div className="calorie-value-row">
          <motion.span
            className="calorie-number"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            {Math.round(calories).toLocaleString()}
          </motion.span>
          <span className="calorie-unit">kcal/day</span>
        </div>
      </div>

      <div className="macro-breakdown">
        {macros.map((m, i) => (
          <motion.div
            key={m.name}
            className="macro-pill"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="macro-pill-dot" style={{ background: m.color }} />
            <div className="macro-pill-info">
              <span className="macro-pill-name">{m.name}</span>
              <span className="macro-pill-grams">{m.grams}g</span>
            </div>
            <span className="macro-pill-kcal">{m.kcal} kcal</span>
          </motion.div>
        ))}
      </div>

      <div className="calorie-goals">
        <div className="calorie-goal-card calorie-goal-loss">
          <span className="calorie-goal-emoji">📉</span>
          <span className="calorie-goal-label">Weight Loss</span>
          <span className="calorie-goal-value">{Math.round(calories * 0.8).toLocaleString()} kcal</span>
        </div>
        <div className="calorie-goal-card calorie-goal-maintain">
          <span className="calorie-goal-emoji">⚖️</span>
          <span className="calorie-goal-label">Maintain</span>
          <span className="calorie-goal-value">{Math.round(calories).toLocaleString()} kcal</span>
        </div>
        <div className="calorie-goal-card calorie-goal-gain">
          <span className="calorie-goal-emoji">📈</span>
          <span className="calorie-goal-label">Muscle Gain</span>
          <span className="calorie-goal-value">{Math.round(calories * 1.15).toLocaleString()} kcal</span>
        </div>
      </div>
    </motion.div>
  );
}



export default function HealthCalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [activeTab, setActiveTab] = useState('bmi');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [activityLevel, setActivityLevel] = useState(2);
  const [calculated, setCalculated] = useState(false);

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(heightCm) / 100;
    if (!w || !h || h <= 0) return null;
    return w / (h * h);
  }, [weight, heightCm]);

  const maintenanceCalories = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(heightCm);
    const a = parseInt(age);
    if (!w || !h || !a) return null;
    // Mifflin-St Jeor Equation for BMR
    let bmr;
    if (gender === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }
    // TDEE = BMR × Activity Factor
    return bmr * activityLevels[activityLevel].factor;
  }, [weight, heightCm, age, gender, activityLevel]);

  const macros = useMemo(() => {
    if (!maintenanceCalories) return [];
    const w = parseFloat(weight);
    if (!w) return [];
    // Protein: 1.6 g per kg body weight
    const proteinGrams = Math.round(1.6 * w);
    const proteinKcal = proteinGrams * 4;
    // Fat: 0.8 g per kg body weight
    const fatGrams = Math.round(0.8 * w);
    const fatKcal = fatGrams * 9;
    // Carbs: remaining calories from TDEE
    const remainingKcal = Math.max(0, Math.round(maintenanceCalories) - proteinKcal - fatKcal);
    const carbGrams = Math.round(remainingKcal / 4);
    const carbKcal = carbGrams * 4;
    return [
      { name: 'Protein', grams: proteinGrams, kcal: proteinKcal, color: '#38BDF8' },
      { name: 'Carbs', grams: carbGrams, kcal: carbKcal, color: '#22C55E' },
      { name: 'Fats', grams: fatGrams, kcal: fatKcal, color: '#FACC15' },
    ];
  }, [maintenanceCalories, weight]);

  const handleCalculate = () => {
    if (activeTab === 'bmi' && bmi !== null) setCalculated(true);
    if (activeTab === 'calories' && maintenanceCalories !== null) setCalculated(true);
  };

  const handleReset = () => {
    setCalculated(false);
  };

  const isValid = activeTab === 'calories'
    ? weight && heightCm && age
    : weight && heightCm;

  return (
    <section id="health-calculator" className="calculator-section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">⚡ Health Tools</div>
        <h2 className="section-heading">
          Know your numbers,<br />
          <span className="gradient-text">own your health.</span>
        </h2>
        <p className="section-subheading">
          Calculate your BMI and daily maintenance calories using scientifically
          validated formulas. Get personalized macro splits and actionable goals.
        </p>
        <p className="section-subheading" style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.7, marginTop: '8px' }}>
          *Reference values follow ICMR-NIN 2020 and WHO Asia-Pacific guidelines for Indian populations; this tool is for educational purposes and does not replace professional medical or dietetic advice.
        </p>
      </motion.div>

      <motion.div
        className="calculator-container"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Tab Switcher */}
        <div className="calc-tabs">
          <button
            className={`calc-tab ${activeTab === 'bmi' ? 'calc-tab-active' : ''}`}
            onClick={() => { setActiveTab('bmi'); setCalculated(false); }}
          >
            <span className="calc-tab-icon">📏</span>
            BMI
          </button>
          <button
            className={`calc-tab ${activeTab === 'calories' ? 'calc-tab-active' : ''}`}
            onClick={() => { setActiveTab('calories'); setCalculated(false); }}
          >
            <span className="calc-tab-icon">🔥</span>
            Calories
          </button>
        </div>

        <div className="calc-body">
          {/* Input Side */}
          <div className="calc-input-side">
            {/* Gender Selector (for calorie calculator) */}
            {activeTab === 'calories' && (
              <motion.div
                className="calc-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="calc-label">Gender</label>
                <div className="gender-selector">
                  <button
                    className={`gender-btn ${gender === 'male' ? 'gender-btn-active' : ''}`}
                    onClick={() => { setGender('male'); setCalculated(false); }}
                  >
                    <span>♂️</span> Male
                  </button>
                  <button
                    className={`gender-btn ${gender === 'female' ? 'gender-btn-active' : ''}`}
                    onClick={() => { setGender('female'); setCalculated(false); }}
                  >
                    <span>♀️</span> Female
                  </button>
                </div>
              </motion.div>
            )}

            {/* Age (calorie only) */}
            {activeTab === 'calories' && (
              <motion.div
                className="calc-field"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="calc-label" htmlFor="calc-age">Age</label>
                <div className="calc-input-wrap">
                  <input
                    id="calc-age"
                    type="number"
                    className="calc-input"
                    placeholder="25"
                    value={age}
                    onChange={(e) => { setAge(e.target.value); setCalculated(false); }}
                    min="10"
                    max="120"
                  />
                  <span className="calc-input-unit">years</span>
                </div>
              </motion.div>
            )}

            {/* Weight */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-weight">Weight</label>
              <div className="calc-input-wrap">
                <input
                  id="calc-weight"
                  type="number"
                  className="calc-input"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); setCalculated(false); }}
                  min="20"
                  max="300"
                />
                <span className="calc-input-unit">kg</span>
              </div>
            </div>

            {/* Height */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-height">Height</label>
              <div className="calc-input-wrap">
                <input
                  id="calc-height"
                  type="number"
                  className="calc-input"
                  placeholder="175"
                  value={heightCm}
                  onChange={(e) => { setHeightCm(e.target.value); setCalculated(false); }}
                  min="100"
                  max="250"
                />
                <span className="calc-input-unit">cm</span>
              </div>
            </div>

            {/* Activity Level (calorie only) */}
            {activeTab === 'calories' && (
              <motion.div
                className="calc-field"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <label className="calc-label">Activity Level</label>
                <div className="activity-selector">
                  {activityLevels.map((level, i) => (
                    <button
                      key={i}
                      className={`activity-btn ${activityLevel === i ? 'activity-btn-active' : ''}`}
                      onClick={() => { setActivityLevel(i); setCalculated(false); }}
                      title={level.desc}
                    >
                      <span className="activity-emoji">{level.emoji}</span>
                      <span className="activity-label">{level.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Calculate Button */}
            <button
              className="btn-primary calc-btn"
              onClick={handleCalculate}
              disabled={!isValid}
              style={{ opacity: isValid ? 1 : 0.4, cursor: isValid ? 'pointer' : 'not-allowed' }}
            >
              {calculated ? '✓ Recalculate' : 'Calculate Now'}
              <span className="btn-arrow">→</span>
            </button>
          </div>

          {/* Result Side */}
          <div className="calc-result-side">
            <AnimatePresence mode="wait">
              {!calculated ? (
                <motion.div
                  className="calc-placeholder"
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="calc-placeholder-icon">
                    {activeTab === 'bmi' ? '📏' : '🔥'}
                  </div>
                  <h3 className="calc-placeholder-title">
                    {activeTab === 'bmi' ? 'BMI Calculator' : 'Calorie Calculator'}
                  </h3>
                  <p className="calc-placeholder-desc">
                    {activeTab === 'bmi'
                      ? 'Enter your weight and height to see your Body Mass Index with a visual health gauge.'
                      : 'Fill in your details to get your daily maintenance calories and personalized macro breakdown.'}
                  </p>
                </motion.div>
              ) : activeTab === 'bmi' && bmi !== null ? (
                <motion.div
                  key="bmi-result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BmiGauge bmi={bmi} />
                  <motion.div
                    className="bmi-advice"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p>{getBmiCategory(bmi).advice}</p>
                  </motion.div>
                  <motion.button
                    className="calc-reset-btn"
                    onClick={handleReset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    ← Try different values
                  </motion.button>
                </motion.div>
              ) : activeTab === 'calories' && maintenanceCalories !== null ? (
                <motion.div
                  key="calorie-result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CalorieResult calories={maintenanceCalories} macros={macros} />
                  <motion.button
                    className="calc-reset-btn"
                    onClick={handleReset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    ← Try different values
                  </motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
