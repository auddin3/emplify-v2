import React, {useState, useEffect} from 'react'
import { Grid } from '@chakra-ui/react'
import Spinner from '../Spinner'
import { Session } from 'next-auth'
import { getSession } from '@/app/actions'
import CreatePortfolioDrawer from './CreatePortfolioDrawer'
import Portfolio from '@/app/models/portfolio'

const GridItem = ({ portfolio }: { portfolio: Portfolio }) => {
  return (
    <div className='border rounded-lg h-60 bg-white-custom2 p-3'>
      <div className='text-lg font-sansSemibold'>{portfolio?.name}</div>
    </div>
  )
}

const PortfolioGrid = () => {
  const [session, setSession] = useState<Session>()
  const [loading, setLoading] = useState(true)
  const API_ROOT = process.env.NEXT_PUBLIC_API_URL
  const [portfolios, setPortfolios] = useState<Portfolio[]>()

  useEffect(() => {
    const establishSession = async () => {
      setLoading(true);
      try {
        const res = await getSession();
        if (res) setSession(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
  
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
  
    fetchPortfolios();
  }, [session?.user?.id, API_ROOT])
  
  if (loading) return ( <Spinner size={100} color="#1D4ED8" thickness={5} /> )

  return (
    <div className='space-y-10'>
      <Grid templateColumns='repeat(2, 1fr)' rowGap={8} columnGap={10} marginTop={8}>
        {portfolios?.map(portfolio => (
          <GridItem key={portfolio.name} portfolio={portfolio}/>
        ))}
        <CreatePortfolioDrawer />
      </Grid>
    </div>
  )
}

export default PortfolioGrid