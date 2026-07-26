import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Phone, MessageSquare, Mail, ChevronDown } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // State for mobile accordion collapse (below 768px)
  const [openSection, setOpenSection] = useState(null)

  function toggleSection(sectionKey) {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey))
  }

  async function handleNewsletter(e) {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      await new Promise((res) => setTimeout(res, 600))
      toast.success('Thank you! You have subscribed to Climate Clarity updates.')
      setNewsletterEmail('')
    } finally {
      setSubmitting(false)
    }
  }

  const linkGroups = [
    {
      key: 'services',
      title: 'Services',
      links: [
        { label: 'AC Installation', path: '/booking' },
        { label: 'Jet Foam Cleaning', path: '/booking' },
        { label: 'Gas Leak Repair & Refill', path: '/booking' },
        { label: 'Comprehensive Maintenance', path: '/booking' },
        { label: 'Commercial HVAC', path: '/pricing' },
      ],
    },
    {
      key: 'product',
      title: 'Product',
      links: [
        { label: 'Live Price Calculator', path: '/pricing' },
        { label: 'Instant Booking', path: '/booking' },
        { label: 'Customer Portal', path: '/dashboard' },
        { label: 'Technician Portal', path: '/technician' },
      ],
    },
    {
      key: 'company',
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact Support', path: '/contact' },
        { label: 'FAQ & Help', path: '/faq' },
        { label: 'Customer Reviews', path: '/#reviews' },
      ],
    },
    {
      key: 'legal',
      title: 'Legal & Safety',
      links: [
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'ISO 9001:2015 Certified', path: '/about' },
      ],
    },
  ]

  return (
    <footer className="footer relative border-t border-slate-800 bg-slate-900 text-slate-300 pt-10 sm:pt-16 lg:pt-20 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] w-full max-w-full overflow-clip">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-8 sm:space-y-12">
        
        {/* Top Header Grid: Brand, Contact Actions & Newsletter */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Brand & Identity Block */}
          <div className="lg:col-span-5 space-y-4 text-left">
            
            {/* Logo Row */}
            <Link to="/" className="flex items-center gap-3 text-left group w-fit">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 shrink-0">
                <span className="text-lg font-extrabold tracking-tight">CC</span>
              </div>
              <div className="flex flex-col whitespace-nowrap min-w-0">
                <span className="text-xl font-bold tracking-tight text-white font-display truncate">
                  Climate Clarity
                </span>
                <span className="text-xs text-blue-400 font-medium truncate">
                  AC Service & Smart Cooling Solutions
                </span>
              </div>
            </Link>

            {/* Short Description */}
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Transparent AC pricing, certified technicians, and fast service for homes and businesses.
            </p>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 text-xs font-medium text-slate-300 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All systems operational</span>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2 sm:max-w-md">
              <a
                href="tel:+919624328554"
                aria-label="Call Darji Dev"
                title="Call Darji Dev (+91 9624328554)"
                className="group flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:bg-slate-700/90 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-all cursor-pointer"
              >
                <Phone size={14} className="text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Call</span>
              </a>

              <a
                href="https://wa.me/919624328554?text=Hi%20Darji%20Dev,%0A%0AI%20visited%20your%20Climate%20Clarity%20website%20and%20would%20like%20to%20enquire%20about%20your%20AC%20installation/service.%0A%0AThanks!"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp with Darji Dev"
                title="Chat on WhatsApp with Darji Dev"
                className="group flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:bg-slate-700/90 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-all cursor-pointer"
              >
                <MessageSquare size={14} className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </a>

              <a
                href="mailto:darjidev4350@gmail.com?subject=Climate%20Clarity%20Service%20Enquiry&body=Hello%20Darji%20Dev,%0A%0AI%20visited%20your%20website%20and%20I'm%20interested%20in%20your%20AC%20installation/service.%0A%0APlease%20contact%20me.%0A%0AThank%20you."
                aria-label="Send Email to Darji Dev"
                title="Send Email to Darji Dev (darjidev4350@gmail.com)"
                className="group flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:bg-slate-700/90 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-all cursor-pointer"
              >
                <Mail size={14} className="text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Email</span>
              </a>
            </div>

          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-slate-800/40 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-white">Get cooling tips and offers</h3>
              <p className="text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
            </div>

            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={submitting}
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-12 px-6 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 transition-colors shrink-0 shadow-md shadow-blue-500/20 disabled:opacity-60 whitespace-nowrap"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>

        </div>

        {/* Link Groups: Accordion on Mobile (<768px), Expanded Grid on Desktop (≥768px) */}
        <div className="pt-4 border-t border-slate-800/80">
          
          {/* Mobile Accordion View (<768px) */}
          <div className="md:hidden space-y-2">
            {linkGroups.map((group) => {
              const isOpen = openSection === group.key
              return (
                <div key={group.key} className="border-b border-slate-800/60 last:border-none">
                  <button
                    type="button"
                    onClick={() => toggleSection(group.key)}
                    aria-expanded={isOpen}
                    className="flex h-12 w-full items-center justify-between py-3 text-sm font-bold text-white text-left focus:outline-none"
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <ul className="pb-4 space-y-2 text-xs">
                      {group.links.map((link, i) => (
                        <li key={i}>
                          <Link
                            to={link.path}
                            className="flex items-center min-h-[44px] py-1.5 text-slate-400 hover:text-white transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>

          {/* Desktop & Tablet Multi-Column Grid (≥768px) */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {linkGroups.map((group) => (
              <div key={group.key}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.path}
                        className="text-slate-400 hover:text-white transition-colors block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Trust Badges & Safety Certifications Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span> Certified Technicians
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span className="text-blue-400 font-bold">✓</span> 90-Day Service Guarantee
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span className="text-sky-400 font-bold">✓</span> ISO 9001:2015 Certified
            </span>
          </div>

          <span className="text-[11px] text-slate-500">
            24/7 Emergency Dispatch Operational
          </span>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Climate Clarity. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Premium Developer Signature */}
        <div className="footer-signature-wrapper">
          <div className="developer-signature">
            <span className="signature-text">
              Designed & Built with Precision by
            </span>

            <Link
              to="/about"
              className="developer-name"
              aria-label="Darji Dev Portfolio"
            >
              <span className="code-symbol">&lt;/&gt;</span>
              Darji Dev
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}