import { ObjectId } from 'mongodb'
import { getDatabase } from '@/lib/mongodb'
import PortfolioEntry from '../models/portfolioEntry'

export const getPortfolioEntries = async(portfolioId: string) => {
  try {
    const portfolio = new ObjectId(portfolioId)
    const db = await getDatabase(process.env.MONGODB_DB || 'emplify')
    const portfolioEntries = await db.collection<PortfolioEntry>('portfolioEntries').find({ portfolio }).toArray()
    return portfolioEntries
  } catch {
    throw new Error()
  }
}

export const createPortfolioEntry = async(entry: PortfolioEntry) => {
  try {
    const db = await getDatabase(process.env.MONGODB_DB || 'emplify')
    await db.collection<PortfolioEntry>('portfolioEntries').deleteOne({ portfolio: entry.portfolio, KSB: entry.KSB })
    await db.collection<PortfolioEntry>('portfolioEntries').insertOne(entry)
  } catch {
    throw new Error()
  }
}