import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '../../../lib/mongodb'
import School from '@/app/models/school'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const dbName = process.env.MONGODB_DB || 'emplify'
    const db = await getDatabase(dbName)

    const schools = await db
      .collection<School>('schools')
      .find({})
      .toArray()

    return NextResponse.json({ schools })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to fetch movies' }, { status: 500 })
  }
}
