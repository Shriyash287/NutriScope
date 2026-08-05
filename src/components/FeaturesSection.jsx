import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: '🔬',
    title: 'AI Food Analysis',
    desc: 'Snap a photo of your meal and our AI instantly identifies ingredients, portions, and nutritional breakdown with lab-grade accuracy.',
  },
  {
    icon: '📊',
    title: 'BMI & Body Metrics',
    desc: 'Track your BMI, body fat percentage, and lean mass with interactive charts and personalized health benchmarks.',
  },
  {
    icon: '🔥',
    title: 'Calorie Estimation',
    desc: 'Get precise daily calorie needs based on your activity level, metabolism, age, and fitness goals — updated in real-time.',
  },
  {
    icon: '🥩',
    title: 'Protein & Macro Tracking',
    desc: 'Monitor protein, carb, and fat intake with smart recommendations tailored to your body composition and training routine.',
  },
  {
    icon: '🧠',
    title: 'Personalized Diet Plans',
    desc: 'Receive AI-generated meal plans that adapt to your preferences, allergies, cultural cuisine, and nutritional gaps.',
  },
  {
    icon: '📈',
    title: 'Progress Dashboard',
    desc: 'Visualize your wellness journey with beautiful graphs, streak tracking, and milestone celebrations to keep you motivated.',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="features-section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">✨ Features</div>
        <h2 className="section-heading">
          Everything you need for<br />
          <span className="gradient-text">smarter nutrition.</span>
        </h2>
        <p className="section-subheading">
          From instant food scanning to AI-driven diet plans, NutriScope gives you
          the tools to understand your body and eat better every day.
        </p>
      </motion.div>

      <motion.div
        className="features-grid"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {features.map((f, i) => (
          <motion.div key={i} className="feature-card" variants={item}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
