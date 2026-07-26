import React, { useState } from 'react'

const steps = [
  {
    step: '01',
    title: 'Select Service & AC Type',
    description: 'Choose your AC unit type (Split, Window) and required service.',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    badge: '30 sec',
  },
  {
    step: '02',
    title: 'Instant Transparent Price',
    description: 'See live itemized cost breakdowns with zero hidden fees.',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Fixed Quote',
  },
  {
    step: '03',
    title: 'Pick Date & Slot',
    description: 'Choose your preferred arrival window. 60-min dispatch available.',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Same-Day',
  },
  {
    step: '04',
    title: 'Tech Assigned',
    description: 'Track background-verified engineer in real-time with live GPS.',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    badge: 'Verified',
  },
  {
    step: '05',
    title: 'Job Done & Warranty',
    description: 'Thorough 32-point testing and clean workspace guarantee.',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    badge: '90-Day Warranty',
  },
]

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-[#FAFBFF] via-blue-50/40 to-[#FAFBFF] overflow-clip">
      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-blue-700 uppercase tracking-wider">
            Seamless Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Climate Clarity Works in <br className="hidden sm:inline" />
            <span className="text-gradient-blue">5 Simple Steps</span>
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 leading-relaxed">
            From quote to cool air in under an hour.
          </p>
        </div>

        {/* Timeline Grid: 2 per row on mobile down to 360px */}
        <div className="mt-8 sm:mt-16 relative">
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 relative z-10">
            {steps.map((item, idx) => {
              const isActive = activeStep === idx
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-white border-blue-500 shadow-md shadow-blue-500/10'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className={`text-lg sm:text-2xl font-black ${isActive ? 'text-blue-600' : 'text-slate-300'}`}>
                      {item.step}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      {item.badge}
                    </span>
                  </div>

                  <div className={`flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl mb-2 sm:mb-4 transition-transform ${
                    isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {React.cloneElement(item.icon, {
                      className: `w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-white' : 'text-blue-600'}`
                    })}
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-slate-900 mb-1 leading-snug line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
