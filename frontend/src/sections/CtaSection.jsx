import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { Button } from '../ui/Button'

export function CtaSection() {
  const navigate = useNavigate()

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#FAFBFF] relative overflow-clip">
      <div className="site-container">
        
        <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl shadow-blue-500/10">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-blue-600/30 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-sky-500/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            
            {/* Text & Action Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              
              {/* Compact Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-[11px] sm:text-xs font-bold text-sky-300 uppercase tracking-wider mb-1 w-fit">
                Instant Dispatch Available
              </span>

              {/* Responsive Headline (Max 2-3 lines on mobile) */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                <span className="hidden lg:inline">Ready to Experience <br /></span>
                <span className="lg:hidden">Book Reliable AC Service <br /></span>
                <span className="text-gradient-blue">In Minutes</span>
              </h2>

              {/* Shorter Mobile Description */}
              <p className="text-slate-300 text-xs sm:text-lg leading-relaxed max-w-xl">
                Book certified technicians with instant pricing and a 90-day service warranty.
              </p>

              {/* Touch-Friendly Action Buttons (2 per row on mobile) */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <Button
                  size="lg"
                  className="h-12 sm:h-14 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-base px-4 sm:px-6 rounded-xl sm:rounded-2xl"
                  onClick={() => navigate('/booking')}
                >
                  Book Service
                </Button>

                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-1.5 h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-800/90 text-white text-xs sm:text-base font-bold hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  <Phone size={16} className="text-sky-400 shrink-0" />
                  <span>Call 24/7</span>
                </a>
              </div>
            </div>

            {/* Compact Mobile Image Preview (Cropped Height 190px - 240px) */}
            <div className="lg:col-span-5 relative mt-3 lg:mt-0 flex justify-center">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/80 w-full max-w-sm sm:max-w-md">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&auto=format&fit=crop&q=80"
                  alt="Certified AC Technician"
                  loading="lazy"
                  className="cta-image w-full h-48 sm:h-72 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-center">
                  <span className="text-[10px] sm:text-xs font-bold text-sky-300 block">Certified Master Engineer</span>
                  <span className="text-xs sm:text-sm font-extrabold text-white block">Equipped & Ready for Dispatch</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
