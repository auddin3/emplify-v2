'use client'

import React from 'react'
import { Box, Button, HStack, Link, Text, VStack } from '@chakra-ui/react'
import {ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  PhoneIcon} from '@heroicons/react/24/outline'

const Footer = () => (
  <Box
    as="footer"
    color="white"
    py={8}
    px={4}
    borderTop="1px solid"
    borderColor="whiteAlpha.300"
    className='bg-gradient-to-r from-blue-custom2 to-purple-custom4'
  >
    <VStack gap={6} align="center">
      <HStack gap={8} justify="center">
        <Link href="/" _hover={{ textDecoration: 'underline' }} fontSize="lg">
          Home
        </Link>
        <Link href="/about" _hover={{ textDecoration: 'underline' }} fontSize="lg">
          About
        </Link>
        <Link href="/features" _hover={{ textDecoration: 'underline' }} fontSize="lg">
          Features
        </Link>
        <Link href="/contact" _hover={{ textDecoration: 'underline' }} fontSize="lg">
          Contact
        </Link>
      </HStack>

      <HStack gap={4}>
        <Button
          as="a"
          rel="noopener noreferrer"
          bg="whiteAlpha.200"
          _hover={{ bg: 'whiteAlpha.300' }}
          size="lg"
          rounded="full"
          p={2}
        >
          <GlobeAltIcon className="h-6 w-6 text-white" />
        </Button>
        <Button
          as="a"
          rel="noopener noreferrer"
          bg="whiteAlpha.200"
          _hover={{ bg: 'whiteAlpha.300' }}
          size="lg"
          rounded="full"
          p={2}
        >
          <ArrowTopRightOnSquareIcon className="h-6 w-6 text-white" />
        </Button>
        <Button
          as="a"
          rel="noopener noreferrer"
          bg="whiteAlpha.200"
          _hover={{ bg: 'whiteAlpha.300' }}
          size="lg"
          rounded="full"
          p={2}
        >
          <PhoneIcon className="h-6 w-6 text-white" />
        </Button>
      </HStack>

      <Text fontSize="sm" textAlign="center" opacity={0.8}>
        © {new Date().getFullYear()} Emplify. All rights reserved.
      </Text>
    </VStack>
  </Box>
)

export default Footer
