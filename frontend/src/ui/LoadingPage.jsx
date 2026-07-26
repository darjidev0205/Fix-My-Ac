import { motion } from 'framer-motion'

export function LoadingPage({ label = 'Loading FixMyAC…' }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-[var(--color-fix-bg)] px-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-sky-500 text-white shadow-[var(--shadow-fix-soft)]">
            <span className="text-sm font-bold">FA</span>
          </div>
          <div>
            <div className="text-base font-semibold text-[var(--color-fix-ink)]">
              FixMyAC
            </div>
            <div className="text-xs text-[var(--color-fix-muted)]">
              Pricing & Booking Platform
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[var(--color-fix-border)] bg-white p-6 shadow-[var(--shadow-fix-soft)]">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[var(--color-fix-ink)]">
              {label}
            </div>
            <Spinner />
          </div>

          <div className="mt-5 space-y-3">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>

          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-6 h-1.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-200"
          />
        </div>

        <div className="mt-4 text-center text-xs text-[var(--color-fix-muted)]">
          Please wait a moment…
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

