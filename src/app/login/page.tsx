'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import User from '../models/user'
import { Field, Navbar } from '@/components/authentication'
import { Button, Fieldset } from '@chakra-ui/react'

const Login = () => {
  // const router = useRouter()

  const [userData, setUserData] = useState<User>({
    email: '',
    password: '',
  })

  const fields = ['email', 'password']

  const handleChange = (key: string, val: string) => {
    setUserData(prev => ({
      ...prev,
      [key]: val,
    }))
  }

  return (
    <div className='min-h-screen bg-white-custom2'>
      <Navbar />
      <div className='bg-gray-custom4 py-14 2xl:py-20 pb-8 2xl:pb-14'>
        <div className='flex flex-col items-center w-fit mx-auto space-y-1.5 text-black-custom3'>
          <h1 className='text-4xl font-bold mr-10'>Login to your account</h1>
          <p className="mr-auto">
            Welcome back!
          </p>
        </div>
      </div>
      <Fieldset.Root size="lg" maxW="xl" className='mx-auto p-4 mt-10'>
        <Fieldset.Content className='my-1'>
          {fields.map((field, idx) => (
            <Field
              key={idx}
              fieldName={field}
              formData={userData}
              handleChange={handleChange}
            />
          ))}
        </Fieldset.Content >
        <div className='my-12 space-y-4'>
          <p className="text-center text-sm text-black-custom3">
            Dont have an account? <a href="/register" className="font-semibold text-blue-500">Register an account.</a>
          </p>
          <Button
            size='lg'
            className="bg-blue-custom1 text-white-custom2 font-semibold w-full rounded-md mx-auto"
            // onClick={() => handleRegister(userData)}
          >
          Login
          </Button>
        </div>
      </Fieldset.Root>
    </div>
  )
}

export default Login