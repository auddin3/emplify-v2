'use client'

import React, { useState } from 'react'
import User from '../models/user'
import { login, loginWithCredentials } from '../actions'
import { Field, Navbar } from '@/components/authentication'
import { Button, Fieldset } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [userData, setUserData] = useState<User>({
    email: '',
    password: '',
  })

  const fields = ['email', 'password']
  const router = useRouter()

  const handleChange = (key: string, val: string) => {
    setUserData(prev => ({
      ...prev,
      [key]: val,
    }))
  }

  const handleLogin = async() => {
    try {
      const response = await loginWithCredentials(userData)
      if (!response.error) (
        router.push('/dashboard')
      )
    } catch (e) {
      console.error(e)
    }
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
            onClick={handleLogin}
          >
          Login
          </Button>
          <Button
            onClick={() => login('github')}
            size="lg"
            className="bg-black-custom2 text-white font-semibold w-full rounded-md mx-auto flex items-center justify-center space-x-1"
            _hover={{ bg: 'gray-700' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white-custom2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.299 3.438 9.8 8.205 11.387.6.111.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.614-4.042-1.614-.546-1.387-1.333-1.755-1.333-1.755-1.091-.745.084-.73.084-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.775.419-1.305.762-1.604-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.236-3.221-.124-.303-.536-1.523.116-3.176 0 0 1.008-.322 3.3 1.23a11.544 11.544 0 0 1 3.003-.404c1.02.005 2.046.137 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.771.839 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.92.43.37.815 1.096.815 2.21 0 1.598-.015 2.888-.015 3.277 0 .32.192.694.798.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
            </svg>
            <span className='font-semibold text-white-custom2'>Sign in with GitHub</span>
          </Button>
        </div>
      </Fieldset.Root>
    </div>
  )
}

export default Login