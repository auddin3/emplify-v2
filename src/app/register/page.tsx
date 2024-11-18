'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import Navbar from '@/components/authentication/Navbar'
import { Fieldset, Input } from '@chakra-ui/react'

interface FormValues {
  email: string
  password: string
  name: string
  school: string
}

const Register = () => {
  // const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(false)
  const [userData, setUserData] = useState<FormValues>({
    email: '',
    password: '',
    name: '',
    school: '',
  })

  const fields = ['name', 'email', 'password']

  const handleChange = (key: string, val: string) => {
    setUserData(prev => ({
      ...prev,
      [key]: val,
    }))
  }

  return (
    <div className='container h-screen'>
      <Navbar />
      <div className='bg-white-custom2 space-y-2.5 text-center pt-10 2xl:pt-20 pb-7 2xl:pb-14'>
        <h1 className='text-4xl font-sansBold text-black-custom1'>Register your account</h1>
        <p className="2xl:mt-24 mb-7 2xl:mb-10">
            Already have an account? <a href="/login" className="font-semibold text-blue-500">Login.</a>
        </p>
      </div>
      <Fieldset.Root size="lg" maxW="2xl" className='mx-auto p-4'>
        <Fieldset.Content className='my-5'>
          {fields.map(field => (
            <div key={field} className='space-y-1.5 my-1.5'>
              <div className="w-full ml-1 font-sansSemibold text-black-custom1 capitalize">{field}</div>
              <Input
                type={field === 'password' && !show ? 'password' : 'text'}
                placeholder={`Enter your ${field}`}
                size='sm'
                className='border px-2.5'
                value={userData[field as keyof FormValues]}
                onChange={e => handleChange(field, e.target.value)}
                _placeholder={{ opacity: 1, color: 'gray.500' }}
              />
            </div>
          ))}
        </Fieldset.Content >
      </Fieldset.Root>
    </div>
  )
}

export default Register