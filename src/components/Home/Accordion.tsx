import React from 'react'
import { Grid, GridItem, Box } from '@chakra-ui/react'
import {ChartPieIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon} from '@heroicons/react/24/solid'

const cardDeck = [
  {
    title: 'File Synchronisation',
    description: 'Easily synchronise your uploaded files to a specific location.',
    icon: RectangleStackIcon, // Pass the icon component directly
    color: 'blue.500',
  },
  {
    title: 'Portfolio Management',
    description: 'Streamline portfolio tasks effortlessly with our app\'s user-friendly features.',
    icon: MagnifyingGlassIcon,
    color: 'green.500',
  },
  {
    title: 'Expert Analysis',
    description: 'Make informed decisions through visualised insights into your portfolio.',
    icon: ChartPieIcon,
    color: 'purple.500',
  },
]

const Accordion = () => (
  <Box bg="gray.50" px={{ base: 8, md: 16 }} py={{ base: 12, md: 20 }} h="full">
    <Box textAlign="center" mb={16}>
      <Box as="h1" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" color="gray.800">
        What&apos;s in Emplify?
      </Box>
      <Box fontSize={{ base: 'md', md: 'lg' }} color="gray.600" mt={3}>
        Everything you need to build a great portfolio.
      </Box>
    </Box>
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={10}>
      {cardDeck.map((card, idx) => (
        <GridItem
          key={idx}
          bg="white"
          p={10}
          borderRadius="2xl"
          boxShadow="2xl"
          _hover={{ transform: 'translateY(-8px)', boxShadow: '3xl' }}
          transition="all 0.3s ease-in-out"
          textAlign="center"
        >
          <Box
            as={card.icon}
            w={24}
            h={24}
            color={card.color}
            mb={6}
            mx="auto"
          />
          <Box fontSize="xl" fontWeight="bold" color="gray.800" mb={3}>
            {card.title}
          </Box>
          <Box fontSize="md" color="gray.600">
            {card.description}
          </Box>
        </GridItem>
      ))}
    </Grid>
  </Box>
)

export default Accordion
