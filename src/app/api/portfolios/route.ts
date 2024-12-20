import { NextRequest, NextResponse } from 'next/server'
import { createPortfolio, getPortfoliosByUser } from '@/app/services/portfolios'
import { ObjectId } from 'mongodb'

export const POST = async (request: NextRequest) => {
  const { name, description, owner, specification, deadline } = await request.json()

  const ownerId = new ObjectId(owner)
  const portfolio = { name, description, owner: ownerId, specification, deadline }

  try {
    await createPortfolio(portfolio)
    const portfolios = await getPortfoliosByUser(owner)
    return NextResponse.json({ portfolios }, { status: 201 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Unable to create portfolio', { status: 500 })
  }
}
