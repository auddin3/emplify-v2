import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioEntries } from '@/app/services/portfolioEntries'

export async function GET(request: NextRequest, { params }: { params: { portfolio: string } }) {
  try {
    const { portfolio } = await params
    if (!portfolio) {
      return NextResponse.json({ error: 'No user found' }, { status: 400 })
    }

    const portfolioEntries = await getPortfolioEntries(portfolio)
    return NextResponse.json({ portfolioEntries })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to fetch portfolios' }, { status: 500 })
  }
}