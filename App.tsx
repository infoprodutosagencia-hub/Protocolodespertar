import React from 'react';
import StarField from './components/StarField.tsx';
import { HeroSection, StorySection, ModulesSection, BonusSection, OfferSection, ChoicesSection, FAQSection, Footer, AudioController } from './components/Sections.tsx';
import { CustomCursor } from './components/VisualEffects.tsx';

function App() {
  return (
    <div className="relative min-h-screen text-white selection:bg-[#FFD700] selection:text-black">
      {/* Background Layer */}
      <StarField />
      
      {/* Global Effects */}
      <CustomCursor />
      <AudioController />

      {/* Main Content Flow */}
      <main className="relative">
        
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Story/Video */}
        <div className="relative">
          {/* Transition Wave SVG top */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none">
             <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-black opacity-80">
                 <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
             </svg>
          </div>
          <StorySection />
        </div>

        {/* Section 3: Modules */}
        <div className="relative">
           {/* Connecting energy line */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-purple-900 via-cyan-900 to-transparent opacity-50" />
           <ModulesSection />
        </div>

        {/* Section 4: Bonus */}
        <BonusSection />

        {/* Section 5: Offer */}
        <div className="relative overflow-hidden">
           {/* Background noise texture simulated */}
           <div className="absolute inset-0 z-0 opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
           <OfferSection />
        </div>

        {/* Section 6: Choices */}
        <ChoicesSection />

        {/* Section 7: FAQ */}
        <FAQSection />

      </main>

      <Footer />
    </div>
  );
}

export default App;