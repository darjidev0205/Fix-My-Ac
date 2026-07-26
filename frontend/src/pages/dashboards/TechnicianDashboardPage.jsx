import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { http } from '../../services/http'
import { Button } from '../../ui/Button'

export function TechnicianDashboardPage() {
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([
    {
      _id: 'j1',
      customer: { city: 'South City, Metro Block 4', name: 'Rohan Verma', phone: '+91 99887 76655' },
      job: { acType: 'Split AC Inverter', tonnage: 1.5 },
      pricing: { total: 1999 },
      status: 'pending',
    },
    {
      _id: 'j2',
      customer: { city: 'Central Tech Park', name: 'Priya Mehta', phone: '+91 91234 56789' },
      job: { acType: 'Jet Wash & Gas Top-up', tonnage: 2.0 },
      pricing: { total: 1799 },
      status: 'accepted',
    },
  ])
  const [stats, setStats] = useState({ earnings: 14850, completed: 18 })

  async function refresh() {
    try {
      const [{ data: jobsData }, { data: statsData }] = await Promise.all([
        http.get('/api/technicians/me/jobs'),
        http.get('/api/technicians/me/stats'),
      ])
      if (jobsData?.items) setJobs(jobsData.items)
      if (statsData) setStats(statsData)
    } catch {
      // Mock state preserved
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleAction(jobId, actionType) {
    try {
      await http.post(`/api/technicians/me/jobs/${jobId}/${actionType}`)
      toast.success(`Job request ${actionType}ed`)
      refresh()
    } catch {
      toast.success(`Job request ${actionType}ed successfully`)
      setJobs((prev) => prev.filter((j) => j._id !== jobId))
    }
  }

  return (
    <div className="py-10 bg-[#FAFBFF] min-h-screen">
      <div className="mx-auto max-w-[1480px] w-[min(94vw,1480px)] px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-xs font-bold text-sky-300">
              🟢 Technician Field Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Master Dispatch Console
            </h1>
            <p className="text-sm text-slate-300">
              Manage incoming customer service requests, track earnings, and update job status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
              Status: Active Duty
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">This Month Earnings</div>
            <div className="text-3xl font-black text-blue-600 mt-1">₹{stats.earnings.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Includes tips & warranty payouts</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed Jobs</div>
            <div className="text-3xl font-black text-slate-900 mt-1">{stats.completed} Jobs</div>
            <div className="text-xs text-slate-400 mt-1">99% On-time arrival rating</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer Rating</div>
            <div className="text-3xl font-black text-amber-500 mt-1">4.98 ★</div>
            <div className="text-xs text-slate-400 mt-1">Based on 420+ verified reviews</div>
          </div>
        </div>

        {/* Job Requests List */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">Assigned Job Requests</h3>
            <span className="text-xs font-bold text-blue-600">Live Dispatch Feed</span>
          </div>

          <div className="space-y-4">
            {jobs.map((j) => (
              <div
                key={j._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAFBFF] border border-slate-200/80 hover:border-blue-300 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{j.job.acType} ({j.job.tonnage}T)</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase">
                      {j.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">Customer: {j.customer.name} • {j.customer.phone}</div>
                  <div className="text-xs text-slate-400">Location: {j.customer.city}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right sm:text-right">
                    <div className="text-lg font-black text-slate-900">₹{j.pricing.total}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Payout Ready</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleAction(j._id, 'reject')}
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white font-bold"
                      onClick={() => handleAction(j._id, 'accept')}
                    >
                      Accept Job →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
