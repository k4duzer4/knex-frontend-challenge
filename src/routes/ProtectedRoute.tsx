import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { hasValidAuthToken } from '../utils/auth'

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!hasValidAuthToken()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
