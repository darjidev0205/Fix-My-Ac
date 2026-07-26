import { ShieldCheck, Zap, Award } from 'lucide-react'
import { PriceCalculatorSection } from '../sections/PriceCalculatorSection'
import { PricingTableSection } from '../sections/PricingTableSection'

export function PricingPage() {
  return (
    <div className="bg-[#FAFBFF] min-h-screen">
      {/* 1. Premium SaaS Pricing Hero */}
      <header className="pricing-hero">
        <div className="site-container relative z-10 text-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">
            100% Upfront Pricing
          </div>

          {/* Main Hero Title */}
          <h1 className="pricing-hero-title font-extrabold">
            Transparent Pricing.{' '}
            <span className="text-gradient-blue">Zero Hidden Surprises.</span>
          </h1>

          {/* Supporting Text */}
          <p className="pricing-hero-description">
            Calculate your exact AC service cost instantly or choose a trusted package designed for your needs.
          </p>

          {/* Trust Indicators Row */}
          <div className="pricing-trust-row">
            <div className="pricing-trust-pill">
              <div className="h-6 w-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={14} />
              </div>
              <span>No Hidden Charges</span>
            </div>

            <div className="pricing-trust-pill">
              <div className="h-6 w-6 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Zap size={14} />
              </div>
              <span>Instant Live Estimate</span>
            </div>

            <div className="pricing-trust-pill">
              <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award size={14} />
              </div>
              <span>90-Day Service Warranty</span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Interactive Calculator Section */}
      <PriceCalculatorSection />

      {/* 3. Fixed Pricing Packages */}
      <PricingTableSection />
    </div>
  )
}
