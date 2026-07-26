import React from 'react'

const features = [
  {
    title: '100% Upfront Quotes',
    description: 'Never worry about surprise charges. Your price is locked in before technician arrives.',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badge: 'Fixed Price',
  },
  {
    title: 'Verified Engineers',
    description: 'Every engineer is police-verified, manufacturer certified, and fully insured.',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    badge: 'Certified',
  },
  {
    title: '90-Day Warranty',
    description: 'Free priority repair protection if anything breaks within 90 days after service.',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Zero Cost',
  },
  {
    title: '60-Min Emergency',
    description: 'Sweltering heat? Our hyper-local fleet guarantees arrival in under an hour.',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    badge: 'Rapid Arrival',
  },
  {
    title: '32-Point Diagnostics',
    description: 'Receive an automated digital health score of your AC covering pressure and airflow.',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    badge: 'Digital Report',
  },
  {
    title: 'Eco R32 Refrigerant',
    description: 'We use non-ozone depleting refrigerants that increase energy efficiency by 22%.',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2v1a2 2 0 002 2h2.5a2.5 2.5 0 002.5-2.5V8.5a.5.5 0 01.5-.5h.5" />
      </svg>
    ),
    badge: 'Green Energy',
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-clip">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-blue-700 uppercase tracking-wider">
            Unmatched Quality Standard
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why 15,000+ Homeowners Trust <br className="hidden sm:inline" />
            <span className="text-gradient-blue hand-drawn-underline">Climate Clarity</span>
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Eliminating unverified mechanics, hidden charges, and poor workmanship forever.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between min-w-0 w-full"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-2">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    {React.cloneElement(item.icon, {
                      className: 'w-6 h-6 sm:w-7 sm:h-7 group-hover:text-white transition-colors',
                    })}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
