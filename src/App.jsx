import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import HealthCalculator from './components/HealthCalculator';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import EssentialNutrients from './components/EssentialNutrients';


const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

function TabPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: 'calc(100vh - 72px)' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <TabPage key="home">
            <HeroSection />
            <CTASection />
          </TabPage>
        );
      case 'features':
        return (
          <TabPage key="features">
            <FeaturesSection />
          </TabPage>
        );
      case 'how-it-works':
        return (
          <TabPage key="how-it-works">
            <HowItWorks />
          </TabPage>
        );
      case 'health-tools':
        return (
          <TabPage key="health-tools">
            <HealthCalculator />
          </TabPage>
        );
      case 'nutrients':
        return (
          <TabPage key="nutrients">
            <EssentialNutrients />
          </TabPage>
        );
      case 'reviews':
        return (
          <TabPage key="reviews">
            <TestimonialsSection />
          </TabPage>
        );
      case 'pricing':
        return (
          <TabPage key="pricing">
            <PricingSection />
            <CTASection />
          </TabPage>
        );
      default:
        return (
          <TabPage key="home">
            <HeroSection />
          </TabPage>
        );
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        <AnimatePresence mode="wait">
          {renderTab()}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
