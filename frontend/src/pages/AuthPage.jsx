import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { EmailLoginForm } from '../components/auth/EmailLoginForm'
import { EmailRegisterForm } from '../components/auth/EmailRegisterForm'
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm'
import { PhoneOtpForm } from '../components/auth/PhoneOtpForm'

export function AuthPage() {
  const location = useLocation()
  const redirectPath = useMemo(() => location.state?.from?.pathname || '/dashboard', [location])

  const [tab, setTab] = useState('email') // 'email' | 'phone'
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'forgot'

  return (
    <div className="py-10 overflow-clip">
      <div className="site-container grid max-w-4xl gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[var(--color-fix-border)] bg-white p-8 shadow-[var(--shadow-fix-soft)]">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fix-ink)]">
            Welcome to FixMyAC
          </h1>
          <p className="mt-2 text-sm text-[var(--color-fix-muted)]">
            Sign in to manage bookings, track status, and view invoices.
          </p>

          <div className="mt-6 flex gap-2 rounded-2xl bg-[var(--color-fix-surface)] p-1 ring-1 ring-[var(--color-fix-border)]">
            <Tab active={tab === 'email'} onClick={() => { setTab('email'); setMode('login') }}>
              Email
            </Tab>
            <Tab active={tab === 'phone'} onClick={() => setTab('phone')}>
              Phone OTP
            </Tab>
          </div>

          {tab === 'email' ? (
            <div className="mt-6">
              {mode !== 'forgot' && (
                <div className="flex gap-2 mb-2">
                  <Tab active={mode === 'login'} onClick={() => setMode('login')}>
                    Login
                  </Tab>
                  <Tab active={mode === 'register'} onClick={() => setMode('register')}>
                    Register
                  </Tab>
                </div>
              )}

              {mode === 'login' && (
                <EmailLoginForm
                  onForgotPassword={() => setMode('forgot')}
                  redirectPath={redirectPath}
                />
              )}

              {mode === 'register' && (
                <EmailRegisterForm redirectPath={redirectPath} />
              )}

              {mode === 'forgot' && (
                <ForgotPasswordForm onBackToLogin={() => setMode('login')} />
              )}
            </div>
          ) : (
            <PhoneOtpForm redirectPath={redirectPath} />
          )}
        </div>

        <div className="rounded-3xl border border-[var(--color-fix-border)] bg-[var(--color-fix-surface)] p-8">
          <div className="text-sm font-semibold text-[var(--color-fix-ink)]">
            After you sign in
          </div>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-fix-muted)]">
            <li className="flex gap-2">
              <span className="mt-1 size-2 rounded-full bg-sky-500" />
              Track bookings with real-time status
            </li>
            <li className="flex gap-2">
              <span className="mt-1 size-2 rounded-full bg-sky-500" />
              View invoices and full pricing breakdown
            </li>
            <li className="flex gap-2">
              <span className="mt-1 size-2 rounded-full bg-sky-500" />
              Technician dashboard for job management
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Tab({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex-1 rounded-xl px-3 py-2 text-sm font-medium transition',
        active ? 'bg-white shadow-sm ring-1 ring-[var(--color-fix-border)]' : 'text-[var(--color-fix-muted)] hover:bg-white/60',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
