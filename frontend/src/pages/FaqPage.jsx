import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

// Expanded FAQ content for better SEO and user reassurance
const faqs = [
  {
    q: "Is the calculator price final?",
    a: "It’s an instant estimate based on your inputs. The final price may change slightly if on-site conditions differ (e.g., you need more copper wire than estimated), but we always show a fully itemized breakdown before starting work."
  },
  {
    q: "What does extra copper pipe pricing mean?",
    a: "Split ACs require copper piping to connect the indoor and outdoor units. Brands usually provide 3 meters in the box. If your installation requires more distance between the units, the extra copper pipe is charged per meter."
  },
  {
    q: "How do technicians get assigned?",
    a: "We assign technicians automatically based on your service area, their current availability, and their customer rating. You’ll be able to see your assigned technician's details in your dashboard."
  },
  {
    q: "Do you offer a warranty on the installation?",
    a: "Yes! All our installations come with a standard 30-day service warranty. If you face any leakage or cooling issues due to the installation within this period, we will fix it free of charge."
  },
  {
    q: "Are there any hidden visiting charges?",
    a: "No, we believe in 100% transparency. There are zero hidden charges. If you decide not to proceed after the technician inspects the site, only a nominal visiting fee of ₹299 is applicable."
  },
  {
    q: "How long does a typical AC installation take?",
    a: "A standard split AC installation takes about 1.5 to 2 hours. This can vary slightly depending on the complexity of the core drilling and where the outdoor unit is being mounted."
  },
  {
    q: "Can I reschedule or cancel my booking?",
    a: "Absolutely. You can reschedule or cancel your booking free of charge up to 4 hours before your scheduled time slot via your user dashboard."
  },
  {
    q: "Do you service all AC brands?",
    a: "Yes, our technicians are highly trained and certified to handle all major AC brands in the market, including LG, Daikin, Voltas, Samsung, Blue Star, and Carrier."
  }
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 py-16 overflow-clip">
      <div className="site-container max-w-3xl">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-inner">
            <HelpCircle size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about pricing, add-ons, and how our booking process works.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index} 
              q={faq.q} 
              a={faq.a} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 rounded-3xl bg-blue-600 p-8 text-center shadow-xl shadow-blue-600/20 sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white">Still have questions?</h3>
            <p className="mt-2 text-sm text-blue-100">
              Can't find the answer you're looking for? Our team is happy to help.
            </p>
          </div>
          <div className="mt-6 sm:mt-0 sm:ml-6 flex-shrink-0">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Contact Support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Accordion Item Component
function FaqItem({ q, a, isOpen, onClick }) {
  return (
    <div 
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen 
          ? 'border-blue-200 bg-white shadow-lg shadow-blue-900/5' 
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className={`text-base font-semibold transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900'}`}>
          {q}
        </span>
        <div 
          className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
            isOpen ? 'rotate-180 bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </div>
      </button>
      
      {/* Using CSS Grid for smooth accordion height transition. 
        When open, grid-template-rows is 1fr, otherwise 0fr.
      */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-sm leading-relaxed text-slate-600">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}