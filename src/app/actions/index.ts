'use server'

import { auth } from '@/auth'
import { signIn, signOut } from '@/auth'
import User from '../models/user'

export const login = async(action: string) => {
  await signIn(action, { redirectTo: '/dashboard'})
}

export const logout = async() => {
  await signOut({ redirectTo: '/login'})
}

export const loginWithCredentials = async(formData: User) => {
  try {
    const response = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })
    return response
  } catch(e) {
    throw new Error(e as string)
  }
}

export const getSession = async () => {
  const session = await auth()
  if (session?.user) return session
}