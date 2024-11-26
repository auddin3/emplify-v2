'use client'

import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import Portfolio from '../models/portfolio'
import Navbar from '@/components/Navbar'
import Spinner from '@/components/Spinner'
import PortfolioGrid from '@/components/portfolios/PortfolioGrid'

const Portfolios = () => {
  const [session, setSession] = useState<Session>()
  const [loading, setLoading] = useState(true)
  const API_ROOT = process.env.NEXT_PUBLIC_API_URL
  const [portfolios, setPortfolios] = useState<Portfolio[] | undefined>([])

  useEffect(() => {
    const establishSession = async () => {
      setLoading(true)
      try {
        const res = await getSession()
        if (res) setSession(res)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    establishSession()
  }, [])

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!session?.user?.id) return
      try {
        setLoading(true)
        const res = await fetch(`${API_ROOT}/api/portfolios/${session.user.id}`)
        const { portfolios } = await res.json()
        setPortfolios(portfolios)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [session?.user?.id, API_ROOT, setPortfolios])

  if (loading) return <Spinner size={100} color="#1D4ED8" thickness={5} />

  return (
    <div className="bg-gray-custom1 flex flex-row">
      <Navbar />
      <div className="w-full px-14 py-12 max-h-screen overflow-y-scroll">
        <h1 className="text-xl text-blue-custom1 capitalize font-semibold">{session?.user?.name}&apos;s Portfolios</h1>
        <PortfolioGrid portfolios={portfolios || []} setPortfolios={setPortfolios} />
      </div>
    </div>
  )
}

export default Portfolios