import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/app/services/users'
import bcrypt from 'bcryptjs'

export const POST = async (request: NextRequest) => {
  const { name, email, password, school } = await request.json()

  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = {
    name,
    password: hashedPassword,
    email,
    school,
  }

  try {
    await createUser(newUser)
  } catch {
    return new NextResponse('Unable to create user', {status: 500})
  }

  return new NextResponse('User has been created', {status: 201})
}