import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../../ui/Button'
import { useAuth } from '../../context/AuthContext'

export function EmailRegisterForm({ redirectPath = '/dashboard' }) {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    const cleanName = fullName.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (!cleanName) {
      setErrorMsg('Full name is required.')
      return
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await register(cleanEmail, password, cleanName)
      toast.success('Account created successfully!')
      setPassword('')
      setConfirmPassword('')
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create account.')
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
          Full Name
        </div>
        <div className="mt-1">
          <input
            type="text"
            className="h-11 w-full rounded-xl border border-[var(--color-fix-border)] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
            disabled={loading}
          />
        </div>
      </label>

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
        <div className="text-xs font-semibold text-[var(--color-fix-ink)]">
          Password
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

      <label className="block text-left">
        <div className="text-xs font-semibold text-[var(--color-fix-ink)]">
          Confirm Password
        </div>
        <div className="mt-1">
          <input
            type="password"
            className="h-11 w-full rounded-xl border border-[var(--color-fix-border)] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? 'Creating account…' : 'Create Account'}
      </Button>
    </form>
  )
}
