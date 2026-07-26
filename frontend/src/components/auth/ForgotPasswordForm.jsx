import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../../ui/Button'
import { useAuth } from '../../context/AuthContext'

export function ForgotPasswordForm({ onBackToLogin }) {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      await resetPassword(cleanEmail)
      setSubmitted(true)
      toast.success('Password reset email sent!')
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send reset link.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mt-4 space-y-4 text-center">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 font-medium">
          If an account exists with <span className="font-semibold">{email}</span>, a password reset link has been sent. Please check your inbox.
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={onBackToLogin}
        >
          Back to Login
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
      {errorMsg && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
          {errorMsg}
        </div>
      )}

      <p className="text-xs text-[var(--color-fix-muted)]">
        Enter your registered email address and we'll send you instructions to reset your password.
      </p>

      <label className="block text-left">
        <div className="text-xs font-semibold text-[var(--color-fix-ink)]">
          Email Address
        </div>
        <div className="mt-1">
          <input
            type="email"
            className="h-11 w-full rounded-xl border border-[var(--color-fix-border)] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            disabled={loading}
          />
        </div>
      </label>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Sending reset link…' : 'Send Reset Link'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-xs font-medium text-[var(--color-fix-muted)] hover:text-[var(--color-fix-ink)]"
        >
          ← Back to Login
        </button>
      </div>
    </form>
  )
}
