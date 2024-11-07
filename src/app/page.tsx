'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Accordion from '@/components/Home/Accordion'
import Navbar from '@/components/Home/Navbar'
import { Button, useClipboard } from '@chakra-ui/react'
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid'

const Home = () => {
  const router = useRouter()
  const [value] = useState<string>('https://github.com/auddin3/emplify-v2/blob/main/README.md')
  const clipboard = useClipboard({ value })

  return (
    <div className="bg-gradient-to-r from-blue-custom2 to-purple-custom4 h-full">
      <Navbar />
      <div className='pt-28 pb-10 px-10 text-center'>
        <div className='space-y-20 mb-56 px-28'>
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
              onClick={() => router.push('/register')}
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
      </div>
    </div>
  )
}

export default Home