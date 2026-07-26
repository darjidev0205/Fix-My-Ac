import React from 'react'

const brandLogos = [
  { name: 'Daikin', tag: 'Official Partner' },
  { name: 'Voltas', tag: 'Authorized' },
  { name: 'LG', tag: 'Certified Repair' },
  { name: 'Mitsubishi', tag: 'HVAC Tech' },
  { name: 'Blue Star', tag: 'Cooling' },
  { name: 'Carrier', tag: 'Installation' },
  { name: 'Hitachi', tag: 'Inverter' },
  { name: 'Samsung', tag: 'Smart AC' },
]

export function TrustLogosSection() {
  return (
    <section className="py-8 border-y border-slate-200/60 bg-slate-50/50 overflow-clip">
      <div className="site-container">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          Certified Engineers Servicing All Top HVAC Brands
        </p>

        {/* 4 logos per row on mobile */}
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-6 items-center justify-items-center">
          {brandLogos.map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-1.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-50/80 grayscale hover:grayscale-0 cursor-default group"
            >
              <span className="text-xs sm:text-base font-black tracking-tight text-slate-700 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 font-medium group-hover:text-slate-600">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
