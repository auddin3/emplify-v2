import { NextRequest, NextResponse } from 'next/server'
import { getPortfoliosByUser, createPortfolio } from '@/app/services/portfolios'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const user = searchParams.get('user')
    if(!user) return NextResponse.json({ error: 'No user found' }, { status: 500 })

    const portfolios = await getPortfoliosByUser(user)
    return NextResponse.json({ portfolios })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to fetch portfolios' }, { status: 500 })
  }
}

export const POST = async (request: NextRequest) => {
  const { name, description, owner, specification, deadline } = await request.json()

  const ownerId = new ObjectId(owner)
  const portfolio = { name, description, owner: ownerId, specification, deadline }

  try {
    await createPortfolio(portfolio)
  } catch {
    return new NextResponse('Unable to create portfolio', {status: 500})
  }

  return new NextResponse('Portfolio has been created', {status: 201})
}
