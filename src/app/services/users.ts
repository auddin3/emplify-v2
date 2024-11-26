import User from '../models/user'
import { getDatabase } from '@/lib/mongodb'

export const createUser = async(user: User) => {
  try {
    const db = await getDatabase(process.env.MONGODB_DB || 'emplify')
    await db.collection<User>('users').insertOne(user)
  } catch {
    throw new Error()
  }
}

export const getUserByEmail = async(email: string) => {
  try {
    const db = await getDatabase(process.env.MONGODB_DB || 'emplify')
    const foundUser = await db.collection<User>('users').findOne({ email })
    return foundUser
  } catch {
    throw new Error()
  }
}