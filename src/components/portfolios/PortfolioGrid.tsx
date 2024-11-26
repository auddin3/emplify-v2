import React, {useState, useEffect} from 'react'
import { Button, Grid, Icon, IconButton } from '@chakra-ui/react'
import { Tooltip } from '../ui/tooltip'
import { ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Spinner from '../Spinner'
import { Session } from 'next-auth'
import { getSession } from '@/app/actions'
import CreatePortfolioDrawer from './CreatePortfolioDrawer'
import Portfolio from '@/app/models/portfolio'
import { calculateDateDifference } from '@/app/util'

const GridItem = ({ portfolio, setSelectedPortfolio }: { portfolio: Portfolio, setSelectedPortfolio: (portfolio: Portfolio) => void }) => {
  const daysRemaining = calculateDateDifference(portfolio?.deadline)

  return (
    <div className='border rounded-lg h-60 bg-white-custom2 p-6'>
      <div className='flex flex-row items-center'>
        <div className='text-lg font-semibold'>{portfolio?.name}</div>
        <Tooltip showArrow content={portfolio.description}  positioning={{ placement: "right-end" }}>
          <IconButton
              as={InformationCircleIcon}
              variant={'plain'}
              h={5} 
              w={5}
              color='#7213EA'
          />
        </Tooltip>
      </div>
      <div className='flex flex-row items-center space-x-2 mt-1'>
        <Icon> 
          <ClockIcon color="#989898"/>
        </Icon>
        <div className='text-[#333333] italic text-xs'>Due in {daysRemaining} days</div>
      </div>
      <Button
          size='sm'
          className="bg-blue-custom1 text-white-custom2 font-semibold rounded-lg w-full mt-24"
          onClick={() => setSelectedPortfolio(portfolio)}
        >
          View
      </Button>
    </div>
  )
}

const PortfolioGrid = ({ portfolios, setPortfolios, setSelectedPortfolio }: { portfolios: Portfolio[], setPortfolios: React.Dispatch<React.SetStateAction<Portfolio[] | undefined>>, setSelectedPortfolio: (portfolio: Portfolio) => void} ) => {
  return (
    <div className='space-y-10'>
      <Grid templateColumns='repeat(2, 1fr)' rowGap={8} columnGap={10} marginTop={8}>
        {portfolios?.map(portfolio => (
          <GridItem key={portfolio.name} portfolio={portfolio} setSelectedPortfolio={setSelectedPortfolio} />
        ))}
        <CreatePortfolioDrawer setPortfolios={setPortfolios}/>
      </Grid>
    </div>
  )
}

export default PortfolioGrid