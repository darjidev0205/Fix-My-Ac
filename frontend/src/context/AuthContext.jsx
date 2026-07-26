import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { subscribeToAuthChanges, loginWithEmail, registerWithEmail, logoutUser, resetUserPassword } from '../services/authService'
import { setAuth, clearAuth, setAuthStatus } from '../features/auth/authSlice'
import { getFirebaseErrorMessage } from '../utils/firebaseErrorMessages'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    setAuthLoading(true)
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (firebaseUser) {
        let idToken = ''
        try {
          idToken = await firebaseUser.getIdToken()
        } catch {
          // Ignore token fetch error
        }

        const formattedUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '',
          phoneNumber: firebaseUser.phoneNumber || '',
          photoURL: firebaseUser.photoURL || '',
          role: firebaseUser.email?.includes('admin') ? 'admin' : firebaseUser.email?.includes('tech') ? 'technician' : 'customer',
        }

        setUser(formattedUser)
        dispatch(setAuth({ user: formattedUser, idToken }))
        dispatch(setAuthStatus('authenticated'))
      } else {
        setUser(null)
        dispatch(clearAuth())
        dispatch(setAuthStatus('unauthenticated'))
      }
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [dispatch])

  const login = useCallback(async (email, password) => {
    setAuthError(null)
    try {
      const cred = await loginWithEmail(email, password)
      return cred.user
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setAuthError(msg)
      throw new Error(msg)
    }
  }, [])

  const register = useCallback(async (email, password, displayName = '') => {
    setAuthError(null)
    try {
      const cred = await registerWithEmail(email, password, displayName)
      return cred.user
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setAuthError(msg)
      throw new Error(msg)
    }
  }, [])

  const logout = useCallback(async () => {
    setAuthError(null)
    try {
      await logoutUser()
      setUser(null)
      dispatch(clearAuth())
      dispatch(setAuthStatus('unauthenticated'))
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setAuthError(msg)
      throw new Error(msg)
    }
  }, [dispatch])

  const resetPassword = useCallback(async (email) => {
    setAuthError(null)
    try {
      await resetUserPassword(email)
    } catch (err) {
      const msg = getFirebaseErrorMessage(err)
      setAuthError(msg)
      throw new Error(msg)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      authLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      resetPassword,
      authError,
    }),
    [user, authLoading, login, register, logout, resetPassword, authError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
