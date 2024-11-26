import React from 'react'
import { Grid, IconButton } from '@chakra-ui/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const PortfolioGrid = () => {
  return (

    <Grid templateColumns='repeat(2, 1fr)' rowGap={8} columnGap={10} marginTop={8}>
      <div
        className='flex justify-center items-center cursor-pointer h-60 bg-blue-custom4'
        // onClick={onOpen}
      >
        <IconButton
          as={PlusCircleIcon}
          variant="plain"
          h={32} w={32}
          className='stroke-blue-custom1 mx-auto self-center'
        />
      </div>
    </Grid>
  )
}

export default PortfolioGrid