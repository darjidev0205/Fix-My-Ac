import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

const tiers = [
  {
    id: 'basic-jet',
    name: 'Basic Jet Cleaning',
    price: '₹699',
    unit: 'per AC unit',
    desc: 'Deep pressure foam cleaning & filter wash for existing AC units.',
    ctaLabel: 'Choose Basic Plan',
    features: [
      'High-Pressure Water Jet Wash',
      'Anti-Bacterial Chemical Spray',
      'Drain Pipe & Tray Flushing',
      '32-Point Performance Check',
      '30-Day Service Guarantee',
    ],
    highlight: false,
  },
  {
    id: 'full-split',
    name: 'Full Split AC Install',
    price: '₹1,499',
    unit: 'starting base',
    desc: 'Complete wall mounting, outdoor unit setup & vacuum purging.',
    ctaLabel: 'Book Installation',
    features: [
      'Indoor & Outdoor Unit Mounting',
      'Vacuum Leak Test & Purging',
      'Core Wall Hole Drilling Included',
      'Live Itemized Pipe Breakdown',
      '90-Day Unconditional Warranty',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'gas-repair',
    name: 'Gas Refill & Repair',
    price: '₹1,299',
    unit: 'per unit',
    desc: 'Complete gas top-up with nitrogen pressure leakage testing.',
    ctaLabel: 'Select Gas Plan',
    features: [
      'Genuine R32 / R410A Gas',
      'Electronic Leak Detection',
      'Capillary & Valve Inspection',
      'Current Draw & Amperage Test',
      '90-Day Gas Warranty',
    ],
    highlight: false,
  },
]

export function PricingTableSection() {
  const navigate = useNavigate()
  const carouselRef = useRef(null)

  // Track expanded features per card for mobile
  const [expandedCards, setExpandedCards] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)

  function toggleExpand(idx) {
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  function handleScroll(e) {
    const container = e.target
    const cardWidth = container.offsetWidth * 0.86
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < tiers.length) {
      setActiveIndex(newIndex)
    }
  }

  function handleSelectPackage(tier) {
    navigate('/booking', { state: { selectedPackage: tier } })
  }

  return (
    <section className="py-12 sm:py-20 bg-[#FAFBFF] relative overflow-clip">
      <div className="site-container">
        
        <SectionHeading
          eyebrow="Transparent Service Packages"
          title="Fixed Pricing with Zero Hidden Costs"
          subtitle="Select a package or customize your quote using our live calculator above."
        />

        {/* Mobile Swipe Helper Text */}
        <div className="flex md:hidden items-center justify-between mt-6 text-xs text-slate-500">
          <span>👈 Swipe to compare plans</span>
          <div className="flex items-center gap-1.5">
            {tiers.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === i ? 'w-5 bg-blue-600' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Touch Swipe Track & Desktop Grid */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="mt-4 sm:mt-14 flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-4 md:gap-8 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-3 items-stretch"
        >
          {tiers.map((t, idx) => {
            const isExpanded = !!expandedCards[idx]
            const visibleFeatures = isExpanded ? t.features : t.features.slice(0, 3)

            return (
              <div
                key={t.id}
                className={`pricing-card flex-none w-[86%] min-w-[280px] max-w-[340px] md:w-auto md:max-w-none snap-start relative rounded-3xl p-5 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                  t.highlight
                    ? 'bg-slate-900 text-white shadow-xl shadow-blue-500/15 border-2 border-blue-500'
                    : 'bg-white text-slate-900 border border-slate-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Header Row: Title & Integrated Most Popular Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`text-lg sm:text-xl font-bold ${t.highlight ? 'text-white' : 'text-slate-900'}`}>
                      {t.name}
                    </h3>
                    {t.badge && (
                      <span className="inline-block shrink-0 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {t.badge}
                      </span>
                    )}
                  </div>

                  <p className={`text-xs ${t.highlight ? 'text-slate-400' : 'text-slate-500'} line-clamp-2 mb-4`}>
                    {t.desc}
                  </p>

                  {/* Clean Baseline Price Display */}
                  <div className="my-4 flex items-baseline gap-2">
                    <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${t.highlight ? 'text-white' : 'text-slate-900'}`}>
                      {t.price}
                    </span>
                    <span className={`text-xs font-semibold ${t.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t.unit}
                    </span>
                  </div>

                  {/* Features List (Top 3 default + Accordion Toggle) */}
                  <div className="my-4">
                    <ul className="space-y-2 text-xs">
                      {visibleFeatures.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            t.highlight ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                          }`}>
                            ✓
                          </span>
                          <span className={t.highlight ? 'text-slate-300' : 'text-slate-700'}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Accordion Button if >3 features */}
                    {t.features.length > 3 && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(idx)}
                        aria-expanded={isExpanded}
                        className={`mt-3 inline-flex items-center gap-1 text-[11px] font-bold transition-colors ${
                          t.highlight ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        <span>{isExpanded ? 'Hide details' : `View all ${t.features.length} features`}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary High-Contrast CTA Button */}
                <div className="mt-6 pt-4 border-t border-slate-200/20">
                  <Button
                    size="lg"
                    className={`w-full font-bold h-12 text-xs sm:text-sm rounded-xl sm:rounded-2xl ${
                      t.highlight
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/30'
                        : 'bg-[#3563F6] hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    }`}
                    onClick={() => handleSelectPackage(t)}
                  >
                    {t.ctaLabel}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
