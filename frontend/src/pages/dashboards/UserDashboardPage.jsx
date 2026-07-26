import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../ui/Button'
import { http } from '../../services/http'

const mockUpcomingBooking = {
  id: 'BK-8921',
  service: 'Split AC 1.5T Installation & Pressure Test',
  date: 'Today, 2:30 PM',
  status: 'In Progress',
  step: 3, // 1: Booked, 2: Assigned, 3: On The Way, 4: Servicing, 5: Completed
  total: 1999,
  technician: {
    name: 'Amit Sharma',
    phone: '+91 98765 43210',
    rating: 4.98,
    eta: '14 mins',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
  },
}

export function UserDashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await http.get('/api/user/bookings')
        if (mounted && data?.items) {
          setBookings(data.items)
        }
      } catch {
        // Mock fallback
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Valued Customer'

  return (
    <div className="py-10 bg-[#FAFBFF] min-h-screen">
      <div className="mx-auto max-w-[1480px] w-[min(94vw,1480px)] px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-sky-300">
              🟢 Customer SaaS Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome Back, {displayName}!
            </h1>
            <p className="text-sm text-slate-300">
              Track live technician dispatch, manage service bookings, and view digital invoices.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3">
            <Button
              size="md"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
              onClick={() => navigate('/booking')}
            >
              + Book New Service
            </Button>
          </div>
        </div>

        {/* Active Booking Live Tracker Section */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">Active Job Status</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {mockUpcomingBooking.service}
              </h2>
              <p className="text-xs text-slate-500">Booking Ref: #{mockUpcomingBooking.id} • Scheduled for {mockUpcomingBooking.date}</p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold ring-1 ring-emerald-200 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              {mockUpcomingBooking.status}
            </span>
          </div>

          {/* 5-Step Progress Bar Tracker */}
          <div className="py-4">
            <div className="grid grid-cols-5 gap-2 text-center relative">
              {[
                { name: 'Booked', icon: '📝', done: true },
                { name: 'Assigned', icon: '👤', done: true },
                { name: 'On The Way', icon: '🚗', done: true, active: true },
                { name: 'Servicing', icon: '🔧', done: false },
                { name: 'Completed', icon: '✅', done: false },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                    step.active
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                      : step.done
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-[11px] font-bold ${step.active ? 'text-blue-600' : 'text-slate-600'}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Technician Card */}
          <div className="bg-[#FAFBFF] border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={mockUpcomingBooking.technician.avatar}
                alt={mockUpcomingBooking.technician.name}
                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Assigned Master Tech</span>
                <h4 className="text-base font-bold text-slate-900">{mockUpcomingBooking.technician.name}</h4>
                <p className="text-xs text-slate-500 font-medium">★ {mockUpcomingBooking.technician.rating} • Arriving in {mockUpcomingBooking.technician.eta}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${mockUpcomingBooking.technician.phone}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
              >
                📞 Call Tech
              </a>
              <button
                type="button"
                onClick={() => toast.success('Live GPS location link requested!')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                📍 Track GPS
              </button>
            </div>
          </div>

        </div>

        {/* Booking History & Invoices Table */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Service History & Digital Invoices</h3>
            <span className="text-xs text-slate-500 font-medium">Total Saved Records: {bookings.length || 2}</span>
          </div>

          <div className="space-y-3">
            {[
              { id: 'BK-7810', service: 'Split AC Deep Jet Cleaning', date: 'Jul 10, 2026', total: 699, status: 'Completed' },
              { id: 'BK-6204', service: 'Gas Top-Up R32 Refrigerant', date: 'May 14, 2026', total: 1299, status: 'Completed' },
            ].map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAFBFF] border border-slate-200/60 hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="text-sm font-bold text-slate-900">{item.service}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Job #{item.id} • Serviced on {item.date}</div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-sm font-extrabold text-slate-900">₹{item.total}</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    {item.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => toast.success(`Downloading PDF invoice for ${item.id}...`)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    📄 Invoice PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
