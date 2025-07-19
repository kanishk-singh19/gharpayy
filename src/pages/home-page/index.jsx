import React, { useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';

import HeroSection from './components/HeroSection';
import FeaturedPGsSection from './components/FeaturedPGsSection';
import TestimonialsSection from './components/TestimonialsSection';
import PopularCitiesSection from './components/PopularCitiesSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import FooterSection from './components/FooterSection';

const HomePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'GharPayy - Feel at Home, Anywhere | PG Booking Platform';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader />
      
      {/* Main Content */}
      <main className="content-offset">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured PGs Section */}
        <FeaturedPGsSection />
        
        {/* Popular Cities Section */}
        <PopularCitiesSection />
        
        {/* Trust Signals Section */}
        <TrustSignalsSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default HomePage;