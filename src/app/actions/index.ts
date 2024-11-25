'use server'

import { signIn, signOut } from '@/auth'

export const login = async(action: string) => {
  await signIn(action, { redirectTo: '/dashboard'})
}

export const logout = async() => {
  await signOut({ redirectTo: '/login'})
}