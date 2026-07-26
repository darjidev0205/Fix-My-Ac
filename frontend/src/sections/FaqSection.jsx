import React, { useState } from 'react'
import { SectionHeading } from '../ui/SectionHeading'

const faqs = [
  {
    q: 'How does Climate Clarity calculate instant prices?',
    a: 'Our SaaS algorithm calculates live pricing based on your AC type (Split vs Window), tonnage rating, copper piping length, and optional add-ons. You see the itemized breakdown before booking with zero hidden charges.',
  },
  {
    q: 'What is included in the 90-Day Service Warranty?',
    a: 'Our 90-day warranty covers all labor, gas leakage fixes, wiring connections, and installation brackets. If your AC experiences any cooling issues within 90 days, we send a master technician free of charge.',
  },
  {
    q: 'Are your technicians background checked and certified?',
    a: 'Yes. Every Climate Clarity technician undergoes thorough police background verification and holds certification from top manufacturers like Daikin, Voltas, LG, and Mitsubishi.',
  },
  {
    q: 'How fast can a technician arrive at my location?',
    a: 'For standard bookings, you choose your preferred time slot. For emergency cooling breakdowns, our local dispatch fleet offers arrival in 60 minutes or less.',
  },
  {
    q: 'Can I reschedule or cancel my booking?',
    a: 'Absolutely. You can manage or reschedule your booking anytime directly through your Customer Dashboard without any cancellation fees.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our AC installation, repair, and pricing."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-[#FAFBFF] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-600 text-white' : ''}`}>
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
