'use client'

import React from 'react'
import Image from 'next/image'
import EmplifyLogo from '../../../public/logo.png'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className='bg-blue-custom1 w-screen px-4'>
      <Image
        src={EmplifyLogo}
        alt='Emplify Logo'
        className='object-contain w-16 h-16'
        onClick={() => router.push('/')}
      />
    </div>
  )
}

export default Navbar