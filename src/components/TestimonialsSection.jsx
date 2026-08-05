import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    name: 'Aanya Sharma',
    initials: 'AS',
    role: 'Fitness Enthusiast',
    text: '"NutriScope completely changed how I think about food. The AI analysis is shockingly accurate and the meal plans feel like they were made just for me."',
    stars: 5,
  },
  {
    name: 'Marcus Chen',
    initials: 'MC',
    role: 'Marathon Runner',
    text: '"I\'ve tried dozens of nutrition apps. NutriScope is the only one that understands my training schedule and adjusts my macros automatically. Game changer."',
    stars: 5,
  },
  {
    name: 'Dr. Priya Patel',
    initials: 'PP',
    role: 'Nutritionist',
    text: '"I recommend NutriScope to all my patients. The precision of the calorie and macro estimations rivals professional dietetic software, yet it\'s so easy to use."',
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="testimonials-section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">💬 Testimonials</div>
        <h2 className="section-heading">
          Loved by <span className="gradient-text">thousands</span><br />
          worldwide.
        </h2>
        <p className="section-subheading">
          See why health-conscious individuals, athletes, and nutritionists
          trust NutriScope for their daily nutrition needs.
        </p>
      </motion.div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="testimonial-stars">
              {'★'.repeat(t.stars)}
            </div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initials}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
