/**
 * Maps Firebase Auth error codes to user-friendly error messages.
 * @param {Error|string} error 
 * @returns {string} Human readable error message
 */
export function getFirebaseErrorMessage(error) {
  if (!error) return 'An unexpected error occurred. Please try again.'

  const errorCode = typeof error === 'string' ? error : error.code || error.message || ''

  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Try logging in instead.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password must contain at least 6 characters.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials and try again.'
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a few minutes before trying again.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.'
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.'
    case 'auth/invalid-phone-number':
      return 'Invalid phone number format. Please enter a valid number (e.g. +919876543210).'
    case 'auth/missing-phone-number':
      return 'Phone number is required.'
    case 'auth/quota-exceeded':
      return 'SMS quota exceeded for today. Please try again later.'
    case 'auth/captcha-check-failed':
      return 'reCAPTCHA verification failed. Please refresh and try again.'
    case 'auth/code-expired':
      return 'OTP code has expired. Please request a new code.'
    case 'auth/invalid-verification-code':
      return 'Incorrect verification code. Please check and enter the 6-digit code again.'
    case 'auth/popup-closed-by-user':
      return 'Sign in was cancelled.'
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address using a different sign-in method.'
    default:
      if (typeof error === 'object' && error.message && !error.code) {
        return error.message
      }
      return 'Authentication failed. Please try again.'
  }
}
