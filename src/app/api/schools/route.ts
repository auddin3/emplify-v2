import { NextRequest, NextResponse } from 'next/server'
import { fetchSchools } from '@/app/services/schools'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const schools = await fetchSchools()
    return NextResponse.json({ schools })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to fetch schools' }, { status: 500 })
  }
}
