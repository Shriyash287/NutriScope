import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
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
    <section id="start" className="cta-section" ref={ref}>
      <motion.div
        className="cta-box"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🥗</div>
        <h2 className="cta-heading">
          Ready to transform<br />
          <span className="gradient-text">your nutrition?</span>
        </h2>
        <p className="cta-desc">
          Join 50,000+ users who are already eating smarter, living healthier,
          and feeling their best with NutriScope.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            id="cta-start-btn"
            className="btn-primary"
            onClick={handleRipple}
          >
            Start Free Analysis
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-secondary">
            View Demo
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
