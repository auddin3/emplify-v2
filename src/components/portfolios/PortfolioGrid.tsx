import React from 'react'
import { Grid } from '@chakra-ui/react'
import CreatePortfolioDrawer from './CreatePortfolioDrawer'

const PortfolioGrid = () => {
  return (
    <div className='space-y-10'>
      <Grid templateColumns='repeat(2, 1fr)' rowGap={8} columnGap={10} marginTop={8}>
        <div className='border rounded-lg h-60 bg-white-custom2 p-3'>
          <div>Portfolio Title</div>
        </div>
        <CreatePortfolioDrawer />
      </Grid>
    </div>
  )
}

export default PortfolioGrid