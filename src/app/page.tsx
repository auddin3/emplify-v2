'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Accordion from '../components/home/Accordion'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import { Button, useClipboard } from '@chakra-ui/react'
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid'

const Home = () => {
  const router = useRouter()
  const [value] = useState<string>('https://github.com/auddin3/emplify-v2/blob/main/README.md')
  const clipboard = useClipboard({ value })

  return (
    <div>
      <Navbar />
      <div className='bg-gradient-to-r from-blue-custom2 to-purple-custom4 space-y-20 px-28 py-24 text-center'>
        <h1 className='text-6xl text-white-custom1 font-bold'>
            Build a Portfolio That Empowers Your Future
        </h1>
        <p className='text-xl text-gray-custom2'>
            Enhance your professional journey by boosting your portfolio&apos;s impact, offering
          <strong className='text-white-custom1'> tailored tools </strong>
            to showcase your strengths seamlessly.
        </p>
        <div>
          <Button
            size='xl'
            className='bg-white-custom1 font-semibold px-5 rounded-xl'
            onClick={() => router.push('/login')}
          >
              Get Started
          </Button>
          <div className='flex flex-row text-gray-custom2 justify-center items-center mt-6'>
            <div className='text-sm mt-1'>{value}</div>
            <Button onClick={clipboard.copy} ml={2} className='h-fit'>
              {clipboard.copied ? <CheckIcon /> : <DocumentDuplicateIcon />}
            </Button>
          </div>
        </div>
      </div>
      <Accordion />
      <Footer />
    </div>
  )
}

export default Home