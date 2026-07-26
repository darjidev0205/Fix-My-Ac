import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../config/firebase'

/**
 * Registers a user with email and password, and optionally updates displayName.
 */
export async function registerWithEmail(email, password, displayName = '') {
  const cleanEmail = email.trim().toLowerCase()
  const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password)
  
  if (displayName && displayName.trim()) {
    await updateProfile(userCredential.user, {
      displayName: displayName.trim(),
    })
  }

  return userCredential
}

/**
 * Logs in a user with email and password.
 */
export async function loginWithEmail(email, password) {
  const cleanEmail = email.trim().toLowerCase()
  return signInWithEmailAndPassword(auth, cleanEmail, password)
}

/**
 * Signs out current Firebase user.
 */
export async function logoutUser() {
  return signOut(auth)
}

/**
 * Sends a password reset email to the specified address.
 */
export async function resetUserPassword(email) {
  const cleanEmail = email.trim().toLowerCase()
  return sendPasswordResetEmail(auth, cleanEmail)
}

/**
 * Subscribes to auth state changes.
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback)
}

let activeRecaptcha = null

/**
 * Initialises or reinitialises reCAPTCHA verifier safely.
 */
export function initialiseRecaptcha(containerId = 'recaptcha-container') {
  if (typeof window === 'undefined') return null

  if (activeRecaptcha) {
    try {
      activeRecaptcha.clear()
    } catch {
      // Ignore cleanup error if container changed
    }
    activeRecaptcha = null
  }

  activeRecaptcha = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
    'expired-callback': () => {
      // Response expired
    },
  })

  return activeRecaptcha
}

/**
 * Cleans up existing reCAPTCHA instance.
 */
export function clearRecaptcha() {
  if (activeRecaptcha) {
    try {
      activeRecaptcha.clear()
    } catch {
      // Ignore
    }
    activeRecaptcha = null
  }
}

/**
 * Sends phone OTP using Firebase Phone Auth.
 */
export async function sendPhoneOtp(phoneNumber, recaptchaVerifier) {
  const verifier = recaptchaVerifier || initialiseRecaptcha()
  return signInWithPhoneNumber(auth, phoneNumber, verifier)
}

/**
 * Verifies the phone OTP code using the confirmation result.
 */
export async function verifyPhoneOtp(confirmationResult, code) {
  return confirmationResult.confirm(code)
}
