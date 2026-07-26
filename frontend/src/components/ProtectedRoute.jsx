import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoadingPage } from '../ui/LoadingPage'

export function ProtectedRoute({ children, requireRole }) {
  const { user, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return <LoadingPage />
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  if (requireRole && user.role !== requireRole) {
    // If technician dashboard requested by customer, redirect to customer dashboard
    const defaultTarget = user.role === 'technician' ? '/technician' : '/dashboard'
    return <Navigate to={defaultTarget} replace />
  }

  return children
}
