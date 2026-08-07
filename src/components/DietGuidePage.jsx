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

export default function DietGuidePage() {
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
          Enter your metrics to generate a comprehensive, personalized diet guide tailored exclusively for your body and goals.
        </p>
      </motion.div>

      <motion.div
        className="calculator-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="calc-body">
          {/* Input Side */}
          <div className="calc-input-side">
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

            <div className="calc-field">
              <label className="calc-label" htmlFor="dg-height">Height</label>
              <div className="calc-input-wrap">
                <input
                  id="dg-height"
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
                    Enter your complete profile to receive actionable, highly personalized dietary insights based on your unique body metrics.
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
                  <PersonalizedDietGuide data={{ gender, age, weight, heightCm, bmi, activityLevelIndex: activityLevel, maintenanceCalories }} />
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
