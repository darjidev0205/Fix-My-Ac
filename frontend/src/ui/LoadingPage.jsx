import { VayuCareLogo } from '../components/ui/VayuCareLogo'

export function LoadingPage({ label = 'Loading VayuCare…' }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-[#F8FAFC] px-6">
      <div className="w-full max-w-md text-center">
        {/* Animated VayuCare Icon Spinner */}
        <div className="relative mx-auto mb-6 h-16 w-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />
          <div className="relative z-10">
            <VayuCareLogo variant="icon" size="lg" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <VayuCareLogo size="sm" />
            <div className="size-4 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600" />
          </div>

          <div className="text-xs font-semibold text-slate-600">
            {label}
          </div>

          {/* Airwave Pulse Line */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full bg-gradient-to-r from-slate-900 via-sky-400 to-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-400 font-medium">
          Securing your climate experience…
        </div>
      </div>
    </div>
  )
}

function SkeletonRow() {
  return (
    <div className="h-10 animate-pulse rounded-2xl bg-black/5 ring-1 ring-[var(--color-fix-border)]" />
  )
}

function Spinner() {
  return (
    <div
      className="size-5 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600"
      aria-label="loading"
    />
  )
}

