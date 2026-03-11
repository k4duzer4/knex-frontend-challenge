import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getAuthTokenFromCookie } from '../utils/auth'
import LoginPage from '../pages/Login'
import HomePage from '../pages/Home'
import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  const isAuthenticated = Boolean(getAuthTokenFromCookie())

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
