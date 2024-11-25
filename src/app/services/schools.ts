import School from '../models/school'
import { getDatabase } from '@/lib/mongodb'

export const fetchSchools = async() => {
  try {
    const db = await getDatabase(process.env.MONGODB_DB || 'emplify')
    const schools = await db.collection<School>('schools').find({}).toArray()
    return schools
  } catch {
    throw new Error()
  }

}