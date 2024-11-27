import { ObjectId } from 'mongodb'
import Portfolio from '../models/portfolio'
import { getDatabase } from '@/lib/mongodb'

export const getPortfoliosByUser = async(user: string) => {
  try {
    const owner = new ObjectId(user)
    const db = await getDatabase(process.env.MONGODB_DB || 'emplify')
    const portfolios = await db.collection<Portfolio>('portfolios').find({ owner }).toArray()
    return portfolios
  } catch {
    throw new Error()
  }
}

export const createPortfolio = async(portfolio: Portfolio) => {
  try {
    const db = await getDatabase(process.env.MONGODB_DB || 'emplify')
    await db.collection<Portfolio>('portfolios').insertOne(portfolio)
  } catch {
    throw new Error()
  }
}