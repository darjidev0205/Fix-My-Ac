import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export function HeroSection({ onGetPrice }) {
  const navigate = useNavigate()

  return (
    <section 
      className="relative overflow-clip pt-8 pb-12 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28"
      style={{
        background: `
          radial-gradient(circle at 15% 15%, rgba(53, 99, 246, 0.08) 0%, transparent 45%),
          radial-gradient(circle at 85% 20%, rgba(14, 165, 233, 0.06) 0%, transparent 40%),
          linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)
        `,
      }}
    >
      {/* Extremely subtle Linear-style grid texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient blur glows contained inside overflow-clip section */}
      <div className="pointer-events-none absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 rounded-full blur-[100px] sm:blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-20 right-10 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-sky-400/10 rounded-full blur-[100px] sm:blur-[140px] -z-10 animate-pulse-glow" />

      <div className="site-container">
        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] items-center">
          
          {/* Left Hero Content */}
          <div className="min-w-0 w-full space-y-6 sm:space-y-8 text-left relative z-10">
            
            {/* Rating / Proof Badge */}
            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full bg-white/90 border border-slate-200/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              <div className="flex -space-x-1.5 shrink-0">
                <img className="h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Customer" />
                <img className="h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Customer" />
                <img className="h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Customer" />
              </div>
              <div className="flex items-center gap-1 min-w-0 text-ellipsis overflow-hidden">
                <span className="text-amber-400 text-xs sm:text-sm shrink-0">★★★★★</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 shrink-0">4.9/5</span>
                <span className="text-[11px] sm:text-xs text-slate-500 truncate">(15,000+ homes)</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] break-words">
                Smart Cooling & <br className="hidden sm:inline" />
                <span className="text-gradient-blue hand-drawn-underline">AC Installation</span> <br className="hidden sm:inline" />
                Made Effortless.
              </h1>
              <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-xl font-normal">
                Upfront transparent pricing, background-checked HVAC engineers, and guaranteed 60-minute dispatch across your city.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
              <button
                type="button"
                onClick={onGetPrice}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 rounded-2xl bg-gradient-to-r from-[#3563F6] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Calculate Live Price</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 text-slate-800 hover:bg-slate-50 font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book Instant Service →</span>
              </button>
            </div>

            {/* Floating Stats Cards Bar */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-2.5 sm:gap-4 text-left">
              <div className="p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm min-w-0">
                <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight truncate">60 Min</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">Avg Arrival</div>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm min-w-0">
                <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight truncate">90 Days</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">Warranty</div>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm min-w-0">
                <div className="text-lg sm:text-2xl font-black text-[#3563F6] tracking-tight truncate">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">Price Fixed</div>
              </div>
            </div>

          </div>

          {/* Right Visual Hero Showcase */}
          <div className="min-w-0 w-full relative mt-4 lg:mt-0">
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative rounded-[28px] overflow-hidden border border-white/90 bg-white p-3 shadow-2xl shadow-blue-500/10 w-full max-w-[620px] mx-auto"
            >
              {/* Top glass reflection highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden w-full">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                  alt="Certified HVAC Technician Installing Split AC"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-20 gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-300 block truncate">Live Status</span>
                    <h4 className="text-xs sm:text-sm font-bold truncate">Split AC Inverter Installation</h4>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/90 text-[10px] sm:text-xs font-bold backdrop-blur-md shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                    Verified Job
                  </span>
                </div>
              </div>

              {/* Floating Live Appointment Card safely aligned inside card */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-5 left-5 right-5 hidden sm:flex items-center gap-3 rounded-2xl glass-panel p-3 shadow-xl border border-white/80 max-w-[calc(100%-40px)] animate-float z-30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">Technician En Route</div>
                  <div className="text-[11px] text-slate-500 truncate">Rajesh K. arriving in 14 mins</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
