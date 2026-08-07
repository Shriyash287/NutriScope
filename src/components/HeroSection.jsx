import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const floatingItems = [
  { emoji: '🍎', label: 'Vitamin C', top: '12%', left: '5%', delay: 0 },
  { emoji: '🥦', label: 'High Fiber', top: '25%', right: '3%', delay: 0.5 },
  { emoji: '💧', label: 'Hydration', bottom: '30%', left: '8%', delay: 1 },
  { emoji: '❤️', label: 'Heart Health', top: '8%', right: '12%', delay: 1.5 },
  { emoji: '🧬', label: 'DNA Health', bottom: '20%', right: '6%', delay: 2 },
  { emoji: '💊', label: 'Vitamins', bottom: '35%', right: '15%', delay: 0.8 },
  { emoji: '🥜', label: 'Healthy Fats', top: '40%', left: '2%', delay: 1.2 },
  { emoji: '🍃', label: 'Antioxidants', bottom: '15%', left: '15%', delay: 1.8 },
  { emoji: '🏃', label: 'Active Life', top: '55%', right: '2%', delay: 2.2 },
  { emoji: '🫐', label: 'Superfoods', top: '70%', left: '4%', delay: 0.3 },
];

function FloatingItem({ emoji, label, style, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="floating-object"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + delay, duration: 0.6, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="floating-object-inner"
        animate={{
          y: [0, -12, 0, 8, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.15,
          rotate: 10,
        }}
      >
        {emoji}
        <div
          className="floating-tooltip"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? 'translateX(-50%) translateY(0)'
              : 'translateX(-50%) translateY(5px)',
          }}
        >
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Steam particles
function SteamParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60 + '%',
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    })), []);

  return (
    <div className="steam-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="steam-particle"
          style={{
            left: p.left,
            bottom: 0,
            animationDelay: p.delay + 's',
            animationDuration: p.duration + 's',
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection({ onTabChange }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
    <section className="hero" ref={containerRef}>
      <div className="hero-content">
        {/* Text Side */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >


          <h1 className="hero-heading">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ display: 'block' }}
            >
              Analyze Your Food.
            </motion.span>
            <motion.span
              className="gradient-text hero-heading-cursive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Transform Your Health.
            </motion.span>
          </h1>

          <motion.p
            className="hero-subheading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Discover personalized nutrition insights, diet analysis, BMI tracking,
            calorie estimation, and healthier eating habits — all powered by
            advanced AI, in just a few minutes.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <button
              id="start-analysis-btn"
              className="btn-primary food-bg-button"
              onClick={(e) => {
                handleRipple(e);
                onTabChange?.('diet-guide');
              }}
            >
              <span>Start Diet Analysis</span>
              <span className="btn-arrow">→</span>
            </button>
            <button
              className="btn-secondary"
              onClick={() => onTabChange?.('features')}
            >
              Explore Features
              <span className="btn-arrow">↓</span>
            </button>
          </motion.div>


        </motion.div>

        {/* Visual Side - 3D Bowl */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 100 }}
        >
          <div className="bowl-container">
            <div className="bowl-glow" />
            <motion.img
              src="/food-bowl.png"
              alt="Bowl of healthy foods including broccoli, avocado, tomato, and more"
              className="bowl-image"
              style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
              }}
              animate={{ rotate: [0, 1, 0, -1, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              draggable={false}
            />
            <SteamParticles />
          </div>

          {/* Floating Objects */}
          {floatingItems.map((item, i) => {
            const style = {};
            if (item.top) style.top = item.top;
            if (item.bottom) style.bottom = item.bottom;
            if (item.left) style.left = item.left;
            if (item.right) style.right = item.right;
            return (
              <FloatingItem
                key={i}
                emoji={item.emoji}
                label={item.label}
                style={style}
                delay={item.delay}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
