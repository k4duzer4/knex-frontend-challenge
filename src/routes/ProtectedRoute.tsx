import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { getAuthTokenFromCookie } from '../utils/auth'

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getAuthTokenFromCookie()

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
