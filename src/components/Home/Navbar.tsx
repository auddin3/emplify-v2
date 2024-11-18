'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import EmplifyLogo from '../../../public/logo.png'
import { Button } from '@chakra-ui/react'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className='flex flex-row justify-between px-4 py-3 border-b border-b-white-custom1/[0.2] bg-gradient-to-r from-blue-custom2 to-purple-custom4'>
      <Image
        src={EmplifyLogo}
        alt='Emplify Logo'
        className='object-contain w-16 h-10'
        onClick={() => router.push('/')}
      />
      <div className='flex flex-row space-x-5 items-center'>
        <Button
          className='border border-white-custom1/[0.2] text-white-custom1 font-semibold px-5 rounded-xl'
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
        <Button
          className='bg-white-custom1 font-semibold px-5 rounded-xl'
          onClick={() => router.push('/register')}
        >
          Register
        </Button>
      </div>
    </div>
  )
}

export default Navbar