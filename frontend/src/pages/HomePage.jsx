import { useRef } from 'react'
import { HeroSection } from '../sections/HeroSection'
import { TrustLogosSection } from '../sections/TrustLogosSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { PriceCalculatorSection } from '../sections/PriceCalculatorSection'
import { GallerySection } from '../sections/GallerySection'
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection'
import { TechnicianCardsSection } from '../sections/TechnicianCardsSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import { FaqSection } from '../sections/FaqSection'
import { CtaSection } from '../sections/CtaSection'

export function HomePage() {
  const calculatorRef = useRef(null)

  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <HeroSection
        onGetPrice={() =>
          calculatorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      {/* 2. Trust Logos */}
      <TrustLogosSection />

      {/* 3. How It Works Timeline */}
      <HowItWorksSection />

      {/* 4. Live Pricing Calculator */}
      <div ref={calculatorRef}>
        <PriceCalculatorSection />
      </div>

      {/* 5. Real Installation Gallery */}
      <GallerySection />

      {/* 6. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 7. Technician Showcase */}
      <TechnicianCardsSection />

      {/* 8. Customer Reviews */}
      <TestimonialsSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. CTA */}
      <CtaSection />
    </div>
  )
}
