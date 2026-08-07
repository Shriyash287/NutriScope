import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'features', label: 'Features', emoji: '✨' },
  { id: 'how-it-works', label: 'How It Works', emoji: '⚙️' },
  { id: 'health-tools', label: 'Health Tools', emoji: '⚡' },
  { id: 'diet-guide', label: 'Diet Guide', emoji: '🥑' },
  { id: 'nutrients', label: 'Nutrients', emoji: '🧬' },
];

export default function Navbar({ activeTab, onTabChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href="#"
        className="nav-logo"
        onClick={(e) => { e.preventDefault(); handleTabClick('home'); }}
      >
        <div className="nav-logo-icon">🥗</div>
        <span>NutriScope</span>
      </a>

      <ul className={`nav-links ${mobileOpen ? 'nav-links-open' : ''}`}>
        {tabs.filter(t => t.id !== 'home').map((tab) => (
          <li key={tab.id}>
            <a
              href="#"
              className={activeTab === tab.id ? 'nav-link-active' : ''}
              onClick={(e) => { e.preventDefault(); handleTabClick(tab.id); }}
            >
              {tab.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className="nav-cta"
            onClick={(e) => { e.preventDefault(); handleTabClick('health-tools'); }}
          >
            Get Started
          </a>
        </li>
      </ul>

      <button
        className={`mobile-menu-btn ${mobileOpen ? 'mobile-menu-open' : ''}`}
        aria-label="Menu"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </motion.nav>
  );
}
