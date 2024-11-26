import { NextRequest, NextResponse } from 'next/server'
import { createPortfolio } from '@/app/services/portfolios'
import { ObjectId } from 'mongodb'

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
