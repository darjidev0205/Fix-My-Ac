import React from 'react'

export function AboutPage() {
  return (
    <div className="py-12 bg-[#FAFBFF] min-h-screen overflow-clip">
      <div className="site-container space-y-20">
        
        {/* Story Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider">
            Our Mission & Vision
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Redefining Home Cooling <br />
            With <span className="text-gradient-blue hand-drawn-underline">Total Transparency</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Climate Clarity was founded to replace unverified local mechanics, opaque pricing, and poor service with a modern SaaS dispatch platform that puts customers first.
          </p>
        </section>

        {/* Team Showcase Photo Grid */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white p-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                alt="HVAC Installation Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-bold text-sky-300">Field Engineers</span>
                <p className="text-sm font-bold">100% Police Verified & Certified</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
                alt="Central Parts Depot"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-bold text-sky-300">Logistics Hub</span>
                <p className="text-sm font-bold">Genuine OEM Parts Inventory</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                alt="Dispatch Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-bold text-sky-300">Engineering HQ</span>
                <p className="text-sm font-bold">24/7 Smart Dispatch Operations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="text-4xl font-extrabold text-blue-600 tracking-tight">15,000+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">Completed Installs</div>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">60 Mins</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">Average Dispatch</div>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="text-4xl font-extrabold text-blue-600 tracking-tight">4.9/5</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">Customer Rating</div>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">90 Days</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">Free Warranty</div>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Operating Values</h2>
            <p className="text-slate-600 text-sm mt-2">How we build products and serve thousands of households daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                💎
              </div>
              <h3 className="text-xl font-bold text-slate-900">Upfront Price Transparency</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe in 100% itemized pricing. What you see on your digital estimate is what you pay.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-slate-900">Safety & Certification</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every engineer undergoes background checks, safety protocols, and OEM brand certification.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-slate-900">SaaS Dispatch Speed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated GPS matching dispatches the closest qualified engineer in 60 minutes or less.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
