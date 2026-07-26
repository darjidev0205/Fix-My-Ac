import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../../ui/Button'
import { useAuth } from '../../context/AuthContext'

export function EmailLoginForm({ onForgotPassword, redirectPath = '/dashboard' }) {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      setErrorMsg('Email address is required.')
      return
    }
    if (!password) {
      setErrorMsg('Password is required.')
      return
    }

    setLoading(true)
    try {
      await login(cleanEmail, password)
      toast.success('Logged in successfully!')
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setErrorMsg(err.message || 'Failed to login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
      {errorMsg && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
          {errorMsg}
        </div>
      )}

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

      <label className="block text-left">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-fix-ink)]">
          <span>Password</span>
          {onForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-sky-600 hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="mt-1">
          <input
            type="password"
            className="h-11 w-full rounded-xl border border-[var(--color-fix-border)] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
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
        {loading ? 'Logging in…' : 'Login'}
      </Button>
    </form>
  )
}
