import { NextRequest, NextResponse } from 'next/server'
import { createPortfolioEntry, getPortfolioEntries } from '@/app/services/portfolioEntries'
import { ObjectId } from 'mongodb'

export const POST = async (request: NextRequest) => {
  const { portfolio, KSB, www, ebi } = await request.json()

  try {
    const portfolioId = new ObjectId(portfolio._id)
    const portfolioEntry = { portfolio: portfolioId, KSB, www, ebi }

    await createPortfolioEntry(portfolioEntry)
    const portfolioEntries = await getPortfolioEntries(portfolio._id)
    return NextResponse.json({ portfolioEntries }, { status: 201 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Unable to create portfolio', { status: 500 })
  }
}
