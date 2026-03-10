export type LoginFormData = {
  email: string
  password: string
}

export type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginResponse = {
  message: string
  token: string
}

export type RegisterResponse = {
  message: string
}
