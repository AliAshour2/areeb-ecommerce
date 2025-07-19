export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  role: string
}

export interface SignUpData {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}

export interface SignInData{
  email:string  
  password : string
}