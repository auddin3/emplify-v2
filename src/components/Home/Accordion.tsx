import React from 'react'
import { Grid, GridItem, Icon } from '@chakra-ui/react'
import { ChartPieIcon, MagnifyingGlassIcon, RectangleStackIcon } from '@heroicons/react/24/solid'

const cardDeck = [
  {
    title: 'File Synchronisation',
    description: 'Easily synchronise your uploaded files to a specific location.',
    icon: <RectangleStackIcon />,
  },
  {
    title: 'Portfolio Management',
    description: 'Streamline portfolio tasks effortlessly with our app&apos;s user-friendly features.',
    icon: <MagnifyingGlassIcon />,
  },
  {
    title: 'Expert Analysis',
    description: 'Make informed decisions through visualised insights into your portfolio.',
    icon: <ChartPieIcon />,
  },
]

const Accordion = () => (
  <div>
    <div className='flex flex-row justify-center items-end space-x-4'>
      <div className='text-3xl font-semibold text-white-custom1'>
          What&apos;s in Emplify?
      </div>
      <div className='text-lg text-gray-custom2'>
          Everything you need to build a great portfolio.
      </div>
    </div>
    <Grid templateColumns="repeat(3, 1fr)" gap="6" className='my-20'>
      {cardDeck.map((card, idx) => (
        <GridItem key={idx} className='border border-white-custom1/[0.2] rounded-md p-7 text-left bg-blue-custom1/4 h-full' >
          <Icon className='w-40 h-40 mx-auto text-gray-custom1 mb-2'>
            {card.icon}
          </Icon>
          <div className='text-lg font-semibold text-white-custom1 '>
            {card.title}
          </div>
          <div className='text-gray-custom2'>
            {card.description}
          </div>
        </GridItem>
      ))}
    </Grid>
  </div>
)

export default Accordion