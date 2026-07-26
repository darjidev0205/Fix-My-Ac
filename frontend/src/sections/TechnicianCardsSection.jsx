import { useEffect, useState } from 'react'
import { SectionHeading } from '../ui/SectionHeading'
import { http } from '../services/http'

const fallbackTechnicians = [
  {
    _id: 't1',
    name: 'Amit Sharma',
    city: 'South City Metro',
    experienceYears: 8,
    rating: 4.98,
    jobsCompleted: 420,
    onTimeRate: 99,
    specialties: ['Daikin Certified', 'Inverter Split AC', 'Multi-VRF Systems'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    _id: 't2',
    name: 'Rajesh Kumar',
    city: 'Central District',
    experienceYears: 10,
    rating: 4.95,
    jobsCompleted: 680,
    onTimeRate: 98,
    specialties: ['Voltas & LG Master', 'Deep Foam Wash', 'Gas Leak Check'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    _id: 't3',
    name: 'Vikram Singh',
    city: 'North Suburbs',
    experienceYears: 6,
    rating: 4.92,
    jobsCompleted: 310,
    onTimeRate: 97,
    specialties: ['Carrier Commercial', 'Core Wall Drill', 'PCB Diagnostics'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    available: true,
  },
]

export function TechnicianCardsSection() {
  const [techs, setTechs] = useState(fallbackTechnicians)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await http.get('/api/technicians')
        if (mounted && data?.items?.length) {
          setTechs(data.items)
        }
      } catch {
        // Fallback technicians used smoothly
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="py-12 sm:py-20 bg-white relative overflow-clip">
      <div className="site-container">
        
        <SectionHeading
          eyebrow="Certified Master Engineers"
          title="Meet Our Elite Local Technicians"
          subtitle="Background-checked, police-verified, and certified by top HVAC manufacturers."
        />

        {/* Mobile Horizontal Carousel & Desktop Grid */}
        <div className="mt-8 sm:mt-14 flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-4 sm:gap-8 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-3">
          {techs.map((t, idx) => (
            <div
              key={t._id || idx}
              className="flex-none w-[84%] min-w-[275px] sm:w-auto snap-start group relative rounded-2xl sm:rounded-3xl bg-[#FAFBFF] border border-slate-200/80 p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Avatar & Status */}
                <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={t.name}
                        loading="lazy"
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl object-cover ring-2 ring-blue-500/20"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 ring-2 ring-white" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-lg font-bold text-slate-900 line-clamp-1">
                        {t.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-500 line-clamp-1">
                        {t.city} • {t.experienceYears} Yrs Exp
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-amber-700 ring-1 ring-amber-200 shrink-0">
                    ★ {t.rating}
                  </span>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3 border border-slate-200/60 text-center">
                    <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Jobs Done</div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">{t.jobsCompleted}+</div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3 border border-slate-200/60 text-center">
                    <div className="text-[10px] sm:text-xs text-slate-400 font-medium">On-Time</div>
                    <div className="text-sm sm:text-base font-extrabold text-blue-600 mt-0.5">{t.onTimeRate}%</div>
                  </div>
                </div>

                {/* Compact Specialties */}
                <div className="flex flex-wrap gap-1 pt-1.5 sm:pt-2 border-t border-slate-200/60">
                  {(t.specialties || ['Split AC', 'Jet Cleaning']).slice(0, 2).map((spec, i) => (
                    <span
                      key={i}
                      className="inline-block rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-blue-700"
                    >
                      {spec}
                    </span>
                  ))}
                  {(t.specialties?.length || 0) > 2 && (
                    <span className="inline-block rounded-lg bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                      +{t.specialties.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Tag */}
              <div className="mt-3 text-[10px] sm:text-[11px] text-slate-400 pt-2 border-t border-slate-200/40 flex items-center justify-between">
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  ✓ Police Verified
                </span>
                <span className="font-medium text-slate-400">Available Today</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
