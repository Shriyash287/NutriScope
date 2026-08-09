import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalizedDietGuide from './PersonalizedDietGuide';

const activityLevels = [
  { label: 'Sedentary', desc: 'Little or no exercise', factor: 1.20, emoji: '🪑' },
  { label: 'Light', desc: 'Exercise 1–3 days/week', factor: 1.375, emoji: '🚶' },
  { label: 'Moderate', desc: 'Exercise 3–5 days/week', factor: 1.55, emoji: '🏃' },
  { label: 'Active', desc: 'Exercise 6–7 days/week', factor: 1.725, emoji: '🏋️' },
  { label: 'Very Active', desc: 'Intense daily training', factor: 1.90, emoji: '⚡' },
];

const ALLERGY_OPTIONS = [
  { id: 'lactose', label: 'Lactose intolerance' },
  { id: 'gluten', label: 'Gluten / Wheat' },
  { id: 'nuts', label: 'Tree Nuts' },
  { id: 'peanut', label: 'Peanut' },
  { id: 'soy', label: 'Soy' },
];

const HEALTH_FLAG_OPTIONS = [
  { id: 'diabetes', label: 'Diabetes / Prediabetes' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'thyroid', label: 'Thyroid' },
  { id: 'pcos', label: 'PCOS / PCOD' },
  { id: 'cholesterol', label: 'High Cholesterol' },
];

export default function DietGuidePage() {
  // Tier 1 — Required
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [activityLevel, setActivityLevel] = useState(2);
  const [dietaryPattern, setDietaryPattern] = useState('vegetarian');
  const [waistInches, setWaistInches] = useState('');

  // Tier 2 — Collapsible
  const [allergies, setAllergies] = useState([]);
  const [healthFlags, setHealthFlags] = useState([]);
  const [region, setRegion] = useState('pan-indian');

  // Tier 3 — Nice-to-have
  const [mealsPerDay, setMealsPerDay] = useState('3');
  const [sleepHours, setSleepHours] = useState('');

  // UI state
  const [calculated, setCalculated] = useState(false);
  const [refineOpen, setRefineOpen] = useState(false);

  const heightCm = useMemo(() => {
    const ft = parseFloat(heightFt) || 0;
    const inc = parseFloat(heightIn) || 0;
    if (!ft && !inc) return null;
    return (ft * 30.48) + (inc * 2.54);
  }, [heightFt, heightIn]);

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = heightCm ? heightCm / 100 : null;
    if (!w || !h || h <= 0) return null;
    return w / (h * h);
  }, [weight, heightCm]);

  const maintenanceCalories = useMemo(() => {
    const w = parseFloat(weight);
    const h = heightCm;
    const a = parseInt(age);
    if (!w || !h || !a) return null;
    let bmr;
    if (gender === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }
    return bmr * activityLevels[activityLevel].factor;
  }, [weight, heightCm, age, gender, activityLevel]);

  const isValid = weight && heightCm && age;

  const handleCalculate = () => {
    if (isValid && bmi !== null && maintenanceCalories !== null) {
      setCalculated(true);
    }
  };

  const handleReset = () => {
    setCalculated(false);
  };

  const toggleAllergy = (id) => {
    setAllergies(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
    setCalculated(false);
  };

  const toggleHealthFlag = (id) => {
    setHealthFlags(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    setCalculated(false);
  };

  return (
    <section className="calculator-section" style={{ paddingTop: '100px', minHeight: 'calc(100vh - 72px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">🥑 Diet Guide</div>
        <h2 className="section-heading">
          Your Personalized,<br />
          <span className="gradient-text">Nutrition Plan.</span>
        </h2>
        <p className="section-subheading">
          Enter your metrics to generate a comprehensive, personalized diet guide tailored exclusively for your body, dietary pattern, and goals.
        </p>
        <p className="section-subheading" style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.7, marginTop: '8px' }}>
          *Reference values follow ICMR-NIN 2020 and WHO Asia-Pacific guidelines for Indian populations; this tool is for educational purposes and does not replace professional medical or dietetic advice.
        </p>
      </motion.div>

      <motion.div
        className="calculator-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="calc-body diet-guide-body">
          {/* Input Side */}
          <div className="calc-input-side">
            {/* Gender */}
            <div className="calc-field">
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
            </div>

            {/* Age */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="dg-age">Age</label>
              <div className="calc-input-wrap">
                <input
                  id="dg-age"
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
            </div>

            {/* Weight */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="dg-weight">Weight</label>
              <div className="calc-input-wrap">
                <input
                  id="dg-weight"
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

            {/* Height (ft/in) */}
            <div className="calc-field">
              <label className="calc-label">Height</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="calc-input-wrap" style={{ flex: 1 }}>
                  <input
                    type="number"
                    className="calc-input"
                    placeholder="5"
                    value={heightFt}
                    onChange={(e) => { setHeightFt(e.target.value); setCalculated(false); }}
                    min="3"
                    max="8"
                  />
                  <span className="calc-input-unit">ft</span>
                </div>
                <div className="calc-input-wrap" style={{ flex: 1 }}>
                  <input
                    type="number"
                    className="calc-input"
                    placeholder="9"
                    value={heightIn}
                    onChange={(e) => { setHeightIn(e.target.value); setCalculated(false); }}
                    min="0"
                    max="11"
                  />
                  <span className="calc-input-unit">in</span>
                </div>
              </div>
            </div>

            {/* Activity Level */}
            <div className="calc-field">
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
            </div>

            {/* TIER 1: Dietary Pattern */}
            <div className="calc-field">
              <label className="calc-label">Dietary Pattern</label>
              <div className="diet-pattern-selector">
                {[
                  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
                  { id: 'eggetarian', label: 'Eggetarian', emoji: '🥚' },
                  { id: 'vegan', label: 'Vegan', emoji: '🌱' },
                  { id: 'non-vegetarian', label: 'Non-Veg', emoji: '🍗' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    className={`activity-btn ${dietaryPattern === opt.id ? 'activity-btn-active' : ''}`}
                    onClick={() => { setDietaryPattern(opt.id); setCalculated(false); }}
                  >
                    <span className="activity-emoji">{opt.emoji}</span>
                    <span className="activity-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TIER 1: Waist (optional but prompted) */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="dg-waist">Waist Circumference <span style={{ opacity: 0.5, fontSize: '12px' }}>(optional)</span></label>
              <div className="calc-input-wrap">
                <input
                  id="dg-waist"
                  type="number"
                  className="calc-input"
                  placeholder="32"
                  value={waistInches}
                  onChange={(e) => { setWaistInches(e.target.value); setCalculated(false); }}
                  min="15"
                  max="80"
                />
                <span className="calc-input-unit">in</span>
              </div>
            </div>

            {/* TIER 2/3: Collapsible "Refine your plan" panel */}
            <div className="refine-panel">
              <button
                className="refine-toggle"
                onClick={() => setRefineOpen(!refineOpen)}
                type="button"
              >
                <span>⚙️ Refine your plan</span>
                <span style={{ transform: refineOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
              </button>

              <AnimatePresence>
                {refineOpen && (
                  <motion.div
                    className="refine-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Allergies */}
                    <div className="calc-field" style={{ marginTop: '16px' }}>
                      <label className="calc-label">Allergies / Intolerances</label>
                      <div className="chip-selector">
                        {ALLERGY_OPTIONS.map(opt => (
                          <button
                            key={opt.id}
                            className={`chip-btn ${allergies.includes(opt.id) ? 'chip-btn-active' : ''}`}
                            onClick={() => toggleAllergy(opt.id)}
                            type="button"
                          >
                            {allergies.includes(opt.id) ? '✕ ' : '+ '}{opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Health Flags */}
                    <div className="calc-field">
                      <label className="calc-label">Health Conditions <span style={{ opacity: 0.5, fontSize: '12px' }}>(general guidance only)</span></label>
                      <div className="chip-selector">
                        {HEALTH_FLAG_OPTIONS.map(opt => (
                          <button
                            key={opt.id}
                            className={`chip-btn ${healthFlags.includes(opt.id) ? 'chip-btn-active' : ''}`}
                            onClick={() => toggleHealthFlag(opt.id)}
                            type="button"
                          >
                            {healthFlags.includes(opt.id) ? '✕ ' : '+ '}{opt.label}
                          </button>
                        ))}
                      </div>
                      {healthFlags.length > 0 && (
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '6px', lineHeight: '1.4' }}>
                          This is not a diagnostic tool. Notes based on health conditions are general lifestyle guidance only — consult your doctor or dietitian for personalized medical advice.
                        </p>
                      )}
                    </div>

                    {/* Region */}
                    <div className="calc-field">
                      <label className="calc-label">Your Region</label>
                      <div className="diet-pattern-selector">
                        {[
                          { id: 'north', label: 'North', emoji: '🏔️' },
                          { id: 'south', label: 'South', emoji: '🌴' },
                          { id: 'east', label: 'East', emoji: '🌊' },
                          { id: 'west', label: 'West', emoji: '🏜️' },
                          { id: 'pan-indian', label: 'Mixed', emoji: '🇮🇳' },
                        ].map(opt => (
                          <button
                            key={opt.id}
                            className={`activity-btn ${region === opt.id ? 'activity-btn-active' : ''}`}
                            onClick={() => { setRegion(opt.id); setCalculated(false); }}
                          >
                            <span className="activity-emoji">{opt.emoji}</span>
                            <span className="activity-label">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meals per day */}
                    <div className="calc-field">
                      <label className="calc-label">Meal Frequency</label>
                      <div className="gender-selector">
                        <button
                          className={`gender-btn ${mealsPerDay === '3' ? 'gender-btn-active' : ''}`}
                          onClick={() => { setMealsPerDay('3'); setCalculated(false); }}
                        >
                          3 Meals
                        </button>
                        <button
                          className={`gender-btn ${mealsPerDay === '5-6' ? 'gender-btn-active' : ''}`}
                          onClick={() => { setMealsPerDay('5-6'); setCalculated(false); }}
                        >
                          5–6 Small Meals
                        </button>
                      </div>
                    </div>

                    {/* Sleep hours */}
                    <div className="calc-field">
                      <label className="calc-label" htmlFor="dg-sleep">Sleep Hours <span style={{ opacity: 0.5, fontSize: '12px' }}>(optional)</span></label>
                      <div className="calc-input-wrap">
                        <input
                          id="dg-sleep"
                          type="number"
                          className="calc-input"
                          placeholder="7"
                          value={sleepHours}
                          onChange={(e) => { setSleepHours(e.target.value); setCalculated(false); }}
                          min="3"
                          max="14"
                        />
                        <span className="calc-input-unit">hrs</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="btn-primary calc-btn"
              onClick={handleCalculate}
              disabled={!isValid}
              style={{ opacity: isValid ? 1 : 0.4, cursor: isValid ? 'pointer' : 'not-allowed' }}
            >
              {calculated ? '✓ Update Plan' : 'Generate Guide'}
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
                  <div className="calc-placeholder-icon">🥑</div>
                  <h3 className="calc-placeholder-title">Diet Guide</h3>
                  <p className="calc-placeholder-desc">
                    Enter your complete profile to receive actionable, highly personalized dietary insights based on your unique body metrics and dietary pattern.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="diet-result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ width: '100%' }}
                >
                  <PersonalizedDietGuide data={{
                    gender,
                    age,
                    weight,
                    heightCm,
                    bmi,
                    activityLevelIndex: activityLevel,
                    maintenanceCalories,
                    dietaryPattern,
                    waistCm: waistInches ? parseFloat(waistInches) * 2.54 : null,
                    allergies,
                    healthFlags,
                    region,
                    mealsPerDay,
                    sleepHours: sleepHours ? parseFloat(sleepHours) : null,
                  }} />
                  <motion.button
                    className="calc-reset-btn"
                    onClick={handleReset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    ← Edit my profile
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
