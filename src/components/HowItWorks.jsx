import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    icon: '📸',
    title: 'Snap Your Meal',
    desc: 'Take a photo of your plate or search from our database of 500,000+ foods. Our AI recognizes meals instantly.',
  },
  {
    num: '02',
    icon: '🧪',
    title: 'Get Analysis',
    desc: 'NutriScope breaks down calories, macros, vitamins, and minerals — showing you exactly what you\'re eating.',
  },
  {
    num: '03',
    icon: '🎯',
    title: 'Set Your Goals',
    desc: 'Tell us your health targets — weight loss, muscle gain, maintenance, or specific dietary needs.',
  },
  {
    num: '04',
    icon: '📋',
    title: 'Follow Your Plan',
    desc: 'Receive a personalized meal plan with daily recommendations, grocery lists, and progress tracking.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="how-section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">🚀 How It Works</div>
        <h2 className="section-heading">
          From plate to plan<br />
          <span className="gradient-text">in four simple steps.</span>
        </h2>
        <p className="section-subheading">
          NutriScope makes nutrition effortless. No calorie counting spreadsheets,
          no guesswork — just smart, automated insights.
        </p>
      </motion.div>

      <div className="steps-container">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="step-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="step-number">{s.num}</div>
            <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{s.icon}</div>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-desc">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
