import { NextRequest, NextResponse } from 'next/server'
import { getPortfoliosByUser } from '@/app/services/portfolios'

export async function GET(request: NextRequest, { params }: { params: { user: string } }) {
  try {
    const { user } = await params
    if (!user) {
      return NextResponse.json({ error: 'No user found' }, { status: 400 })
    }

    const portfolios = await getPortfoliosByUser(user)
    return NextResponse.json({ portfolios })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to fetch portfolios' }, { status: 500 })
  }
}