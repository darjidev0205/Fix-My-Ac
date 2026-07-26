import { SectionHeading } from '../ui/SectionHeading'

const testimonials = [
  {
    name: 'Ayesha Kapoor',
    role: 'Homeowner, South City',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    serviceTag: '1.5T Inverter AC Install',
    quote:
      'Itemized copper pipe breakdown before booking. Technician Rajesh arrived in 25 mins with full safety gear and left the room spotless!',
    rating: 5,
  },
  {
    name: 'Rohit Sharma',
    role: 'Apartment Owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    serviceTag: 'Jet Foam Deep Wash',
    quote:
      'No hidden charges at all. The price I saw on the live calculator was the exact amount on my digital invoice. The AC cools like new now.',
    rating: 5,
  },
  {
    name: 'Mehul Patel',
    role: 'Tech Startup Founder',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    serviceTag: 'Commercial Multi-Split',
    quote:
      'Climate Clarity feels like the Linear or Apple of AC services. Live GPS tracking of the engineer and zero phone calls needed.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-12 sm:py-20 bg-[#FAFBFF] relative overflow-clip">
      <div className="site-container">
        
        <SectionHeading
          eyebrow="4.9/5 Average Customer Rating"
          title="Loved by Homeowners & Local Businesses"
          subtitle="Real reviews from verified customers across your city."
        />

        {/* Mobile Horizontal Carousel & Desktop Grid */}
        <div className="mt-8 sm:mt-14 flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-4 sm:gap-8 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <figure
              key={idx}
              className="flex-none w-[84%] min-w-[275px] sm:w-auto snap-start relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex text-amber-400 text-xs sm:text-sm">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-blue-50 text-blue-700">
                    Verified Booking
                  </span>
                </div>

                <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  “{t.quote}”
                </blockquote>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <figcaption className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {t.name}
                    </figcaption>
                    <div className="text-[10px] sm:text-xs text-slate-500">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
