import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '../../lib/mongodb'

interface Movie {
  title: string;
  year: number;
  plot: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const dbName = process.env.MONGODB_DB || 'sample_mflix'
    const db = await getDatabase(dbName)

    const movies = await db
      .collection<Movie>('movies')
      .find({})
      .limit(10)
      .toArray()

    return NextResponse.json({ movies })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to fetch movies' }, { status: 500 })
  }
}
