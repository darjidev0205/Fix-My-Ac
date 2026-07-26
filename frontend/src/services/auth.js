import { http } from './http'
import {
  loginWithEmail,
  registerWithEmail,
  logoutUser,
  sendPhoneOtp,
  verifyPhoneOtp,
  resetUserPassword,
} from './authService'

export async function syncUserToBackend(idToken) {
  try {
    const { data } = await http.post(
      '/api/auth/sync',
      {},
      { headers: { Authorization: `Bearer ${idToken}` } },
    )
    return data
  } catch (err) {
    // If backend is not available or sync fails, return null so caller falls back to Firebase user details
    return null
  }
}

export async function emailLoginFlow(email, password) {
  const cred = await loginWithEmail(email, password)
  const idToken = await cred.user.getIdToken()
  const profile = await syncUserToBackend(idToken)
  return { cred, idToken, profile }
}

export async function emailRegisterFlow(email, password, displayName = '') {
  const cred = await registerWithEmail(email, password, displayName)
  const idToken = await cred.user.getIdToken()
  const profile = await syncUserToBackend(idToken)
  return { cred, idToken, profile }
}

export async function phoneOtpStartFlow(phoneNumber, verifier) {
  const confirmation = await sendPhoneOtp(phoneNumber, verifier)
  return confirmation
}

export async function phoneOtpVerifyFlow(confirmation, code) {
  const cred = await verifyPhoneOtp(confirmation, code)
  const idToken = await cred.user.getIdToken()
  const profile = await syncUserToBackend(idToken)
  return { cred, idToken, profile }
}

export async function logoutFlow() {
  await logoutUser()
  await http.post('/api/auth/logout').catch(() => {})
}

export async function resetPasswordFlow(email) {
  return resetUserPassword(email)
}
