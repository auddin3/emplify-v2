'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Field, Navbar } from '@/components/authentication'
import { Button, Fieldset } from '@chakra-ui/react'

export interface FormValues {
  email: string
  password: string
}

const Login = () => {
  // const router = useRouter()

  const [userData, setUserData] = useState<FormValues>({
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
      <div className='bg-gray-100 py-14 2xl:py-20 pb-8 2xl:pb-14'>
        <div className='flex flex-col items-center w-fit mx-auto space-y-1.5'>
          <h1 className='text-4xl font-bold text-black-custom1'>Login to your account</h1>
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
              userData={userData}
              handleChange={handleChange}
            />
          ))}
        </Fieldset.Content >
        <p className="mr-auto text-sm">
            Dont have an account? <a href="/register" className="font-semibold text-blue-500">Register an account.</a>
        </p>
        <Button
          size='lg'
          className="bg-blue-custom1 text-white-custom2 font-semibold w-full rounded-md mx-auto mt-20 mb-16"
        // onClick={() => handleRegister(userData)}
        >
          Login
        </Button>
      </Fieldset.Root>
    </div>
  )
}

export default Login