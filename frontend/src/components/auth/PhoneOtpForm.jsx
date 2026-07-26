import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../../ui/Button'
import { initialiseRecaptcha, clearRecaptcha, sendPhoneOtp, verifyPhoneOtp } from '../../services/authService'
import { getFirebaseErrorMessage } from '../../utils/firebaseErrorMessages'

export function PhoneOtpForm({ redirectPath = '/dashboard' }) {
  const navigate = useNavigate()
  const otpInputRef = useRef(null)

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)

  // Clean up reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      clearRecaptcha()
    }
  }, [])

  // Handle resend countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCountdown])

  // Focus OTP input when confirmation result is set
  useEffect(() => {
    if (confirmationResult && otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [confirmationResult])

  function formatPhoneNumber(input) {
    let cleaned = input.trim().replace(/[^\d+]/g, '')
    if (!cleaned.startsWith('+')) {
      if (cleaned.startsWith('91') && cleaned.length > 10) {
        cleaned = '+' + cleaned
      } else {
        cleaned = '+91' + cleaned.replace(/^0+/, '')
      }
    }
    return cleaned
  }

  async function handleSendOtp(e) {
    e.preventDefault()
    setErrorMsg('')

    const formattedPhone = formatPhoneNumber(phone)
    if (!formattedPhone || formattedPhone.length < 12) {
      setErrorMsg('Please enter a valid phone number (e.g. 9876543210).')
      return
    }

    setLoading(true)
    try {
      const verifier = initialiseRecaptcha('recaptcha-container')
      const confirmation = await sendPhoneOtp(formattedPhone, verifier)
      setConfirmationResult(confirmation)
      setResendCountdown(60)
      toast.success('OTP code sent to your phone!')
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setErrorMsg(msg)
      toast.error(msg)
      clearRecaptcha()
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault()
    setErrorMsg('')

    const cleanOtp = otp.trim()
    if (!cleanOtp || cleanOtp.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP code.')
      return
    }

    setLoading(true)
    try {
      await verifyPhoneOtp(confirmationResult, cleanOtp)
      toast.success('Phone verified & signed in successfully!')
      navigate(redirectPath, { replace: true })
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setErrorMsg(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  function handleResendOtp() {
    if (resendCountdown > 0 || loading) return
    setConfirmationResult(null)
    setOtp('')
    clearRecaptcha()
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Container required for Firebase Invisible reCAPTCHA */}
      <div id="recaptcha-container" />

      {errorMsg && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
          {errorMsg}
        </div>
      )}

      {!confirmationResult ? (
        <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
          <label className="block text-left">
            <div className="text-xs font-semibold text-[var(--color-fix-ink)]">
              Mobile Number (India +91)
            </div>
            <div className="mt-1 flex rounded-xl border border-[var(--color-fix-border)] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
              <span className="flex items-center px-3 bg-slate-50 text-xs font-semibold text-slate-500 border-r border-[var(--color-fix-border)]">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="h-11 w-full px-3 text-sm focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
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
            {loading ? 'Sending OTP…' : 'Send OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4" noValidate>
          <div className="flex items-center justify-between text-xs text-[var(--color-fix-muted)]">
            <span>OTP sent to <strong className="text-[var(--color-fix-ink)]">{formatPhoneNumber(phone)}</strong></span>
            <button
              type="button"
              onClick={() => {
                setConfirmationResult(null)
                setOtp('')
                clearRecaptcha()
              }}
              className="text-sky-600 font-medium hover:underline"
            >
              Change
            </button>
          </div>

          <label className="block text-left">
            <div className="text-xs font-semibold text-[var(--color-fix-ink)]">
              Enter 6-Digit OTP Code
            </div>
            <div className="mt-1">
              <input
                ref={otpInputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                className="h-11 w-full rounded-xl border border-[var(--color-fix-border)] bg-white px-3 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="123456"
                required
                disabled={loading}
              />
            </div>
          </label>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || otp.length < 6}
            aria-busy={loading}
          >
            {loading ? 'Verifying…' : 'Verify & Continue'}
          </Button>

          <div className="text-center">
            {resendCountdown > 0 ? (
              <span className="text-xs text-slate-400">
                Resend OTP in {resendCountdown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-xs font-semibold text-sky-600 hover:underline"
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
