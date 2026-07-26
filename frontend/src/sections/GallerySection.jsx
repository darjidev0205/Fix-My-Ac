import React, { useState } from 'react'

const galleryItems = [
  {
    id: 1,
    category: 'Split AC',
    title: 'Dual Inverter Split AC Install',
    subtitle: 'Concealed copper piping & zero-vibration wall mounting.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
    tag: '5.0 ★ Install',
  },
  {
    id: 2,
    category: 'Process',
    title: 'Precision Pressure Testing',
    subtitle: 'R32 refrigerant charging with nitrogen pressure verification.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    tag: 'Safety Verified',
  },
  {
    id: 3,
    category: 'Cleaning',
    title: 'Jet Foam Deep Wash',
    subtitle: 'Deep evaporator coil decontamination eliminating 99.9% dust.',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&auto=format&fit=crop&q=80',
    tag: 'Deep Wash',
  },
  {
    id: 4,
    category: 'Warehouse',
    title: 'Central Depot Stock',
    subtitle: 'Stocked with 100% genuine OEM spare parts & eco refrigerants.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    tag: 'OEM Hub',
  },
  {
    id: 5,
    category: 'Commercial',
    title: 'Multi-VRF HVAC Setup',
    subtitle: 'Custom ducting & multi-zone climate controller setup.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    tag: 'Commercial',
  },
  {
    id: 6,
    category: 'Equipment',
    title: 'Digital Diagnostics',
    subtitle: 'Calibrated micron gauges ensuring maximum cooling efficiency.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    tag: 'Pro Toolkit',
  },
]

export function GallerySection() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter)

  return (
    <section className="py-12 sm:py-20 bg-[#FAFBFF] relative overflow-clip">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 sm:mb-3">
              Craftsmanship Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Installations & <br className="hidden sm:inline" />
              <span className="text-gradient-blue">Field Work Gallery</span>
            </h2>
          </div>

          {/* Filter Pills with Horizontal Scroll on Smallest Mobile */}
          <div className="flex flex-wrap sm:flex-wrap gap-1.5 sm:gap-2 max-w-full overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Split AC', 'Process', 'Cleaning', 'Commercial', 'Equipment'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 min-w-0 w-full"
            >
              <div className="relative aspect-[4/3] h-48 sm:h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Badge Tag */}
                <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-slate-900 shadow-sm">
                  {item.tag}
                </span>

                {/* Overlay Text */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white min-w-0">
                  <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="text-xs sm:text-base font-bold leading-tight mt-0.5 line-clamp-1 sm:line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="hidden sm:block text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
