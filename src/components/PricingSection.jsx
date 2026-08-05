import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for getting started with basic nutrition tracking.',
    features: [
      'Basic food analysis',
      'BMI calculator',
      'Daily calorie estimate',
      '5 meal scans / day',
      'Community access',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    desc: 'For individuals serious about their health and fitness goals.',
    features: [
      'Unlimited meal scans',
      'AI diet plan generation',
      'Macro & micro tracking',
      'Progress analytics',
      'Custom meal suggestions',
      'Export reports (PDF)',
      'Priority support',
    ],
    cta: 'Start 14-Day Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    desc: 'For trainers, nutritionists, and health professionals.',
    features: [
      'Everything in Pro',
      'Up to 25 client profiles',
      'Client progress dashboards',
      'White-label reports',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section id="pricing" className="pricing-section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">💎 Pricing</div>
        <h2 className="section-heading">
          Simple, transparent<br />
          <span className="gradient-text">pricing for everyone.</span>
        </h2>
        <p className="section-subheading">
          Start free and upgrade as your nutrition journey grows.
          No hidden fees, cancel anytime.
        </p>
      </motion.div>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            className={`pricing-card ${plan.popular ? 'pricing-popular' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <div className="pricing-name">{plan.name}</div>
            <div className="pricing-price">
              {plan.price}
              <span className="pricing-period">{plan.period}</span>
            </div>
            <p className="pricing-desc">{plan.desc}</p>
            <ul className="pricing-features">
              {plan.features.map((f, j) => (
                <li key={j}>
                  <span className="check-icon">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={plan.popular ? 'btn-primary pricing-btn' : 'btn-secondary pricing-btn'}
              onClick={plan.popular ? handleRipple : undefined}
            >
              {plan.cta}
              <span className="btn-arrow">→</span>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
