import api from './api'
import type { LoginFormData, LoginResponse, RegisterResponse } from '../types/auth'

type RegisterPayload = {
  name: string
  email: string
  password: string
}

export async function loginUser(payload: LoginFormData) {
  const { data } = await api.post<LoginResponse>('/auth/login', payload)
  return data
}

export async function registerUser(payload: RegisterPayload) {
  const { data } = await api.post<RegisterResponse>('/auth/register', payload)
  return data
}
