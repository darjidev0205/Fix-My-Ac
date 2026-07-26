import { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react'
import { Button } from '../ui/Button'

export function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success('Thank you! Our support team will get back to you shortly.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-12 overflow-clip">
      <div className="site-container space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider">
            24/7 Support & Dispatch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            We are Here to <span className="text-gradient-blue">Keep You Cool</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Have a question about an existing booking, commercial quote, or emergency dispatch? Reach out to us anytime.
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group flex items-start gap-4"
          >
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageSquare size={22} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">Instant Chat</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">WhatsApp Support</h3>
              <p className="text-xs text-slate-500 mt-1">Typical response in &lt; 5 mins</p>
            </div>
          </a>

          <a
            href="tel:+919876543210"
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group flex items-start gap-4"
          >
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Phone size={22} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">24/7 Emergency</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">+91 98765 43210</h3>
              <p className="text-xs text-slate-500 mt-1">Direct dispatch hotline</p>
            </div>
          </a>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">Operating Hours</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">Mon – Sun: 8 AM – 10 PM</h3>
              <p className="text-xs text-slate-500 mt-1">Emergency 24/7 coverage active</p>
            </div>
          </div>
        </div>

        {/* Split Form & Map Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3">
              Send Us a Message
            </h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name">
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-[#FAFBFF] px-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    required
                  />
                </Field>

                <Field label="Email Address">
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-[#FAFBFF] px-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    required
                  />
                </Field>
              </div>

              <Field label="Phone Number">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-[#FAFBFF] px-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                />
              </Field>

              <Field label="Your Message">
                <textarea
                  rows={4}
                  placeholder="How can we assist you?"
                  className="w-full rounded-xl border border-slate-200 bg-[#FAFBFF] px-3.5 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  required
                />
              </Field>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                {loading ? 'Sending Message...' : 'Send Message →'}
              </Button>
            </form>
          </div>

          {/* Right Office Location & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Central Operations Hub
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="text-sky-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="text-white">Headquarters:</strong>
                    <p className="mt-0.5 text-slate-400">102 Climate Clarity Towers, Metro Tech Zone, City Center 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-sky-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="text-white">Email Inquiries:</strong>
                    <p className="mt-0.5 text-slate-400">support@climateclarity.com</p>
                  </div>
                </div>
              </div>

              {/* Map Preview Box */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80"
                  alt="City Dispatch Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-bold text-white">
                  📍 Covering 45+ Local Service Zones
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block text-left">
      <div className="text-xs font-bold text-slate-700 mb-1.5">{label}</div>
      {children}
    </label>
  )
}