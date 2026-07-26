export { app, auth, analytics } from '../config/firebase'
export {
  loginWithEmail as loginEmail,
  registerWithEmail as registerEmail,
  logoutUser as logoutFirebase,
  sendPhoneOtp as startPhoneOtp,
  initialiseRecaptcha as ensureRecaptcha,
} from './authService'
