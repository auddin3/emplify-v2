'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import User from '../models/user'
import { Field, Navbar } from '@/components/authentication'
import { Button, Fieldset } from '@chakra-ui/react'

const dummySchools = [
  {
    id: 'UOB',
    name: 'University of Birmingham',
  },
  {
    id: 'DHU',
    name: 'Durham University',
  },
  {
    id: 'UOE',
    name: 'University of Edinburgh',
  },
  {
    id: 'ICL',
    name: 'Imperial College London',
  },
  {
    id: 'KCL',
    name: 'King\'s College London',
  },
  {
    id: 'LSE',
    name: 'London School of Economics and Political Science (LSE)',
  },
  {
    id: 'UOM',
    name: 'University of Manchester',
  },
  {
    id: 'QMUL',
    name: 'Queen Mary\'s University London',
  },
]

const Register = () => {
  // const router = useRouter()

  const [userData, setUserData] = useState<User>({
    email: '',
    password: '',
    name: '',
    school: '',
  })

  const fields = ['name', 'email', 'password', 'school']

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
          <h1 className='text-4xl font-bold text-black-custom1 -ml-10'>Register your account</h1>
          <p className="mr-auto -ml-10">
            Already have an account? <a href="/login" className="font-semibold text-blue-500">Login.</a>
          </p>
        </div>
      </div>
      <Fieldset.Root size="lg" maxW="xl" className='mx-auto p-4 mt-10'>
        <Fieldset.Content className='my-1'>
          {fields.map((field, idx) => (
            <Field
              key={idx}
              fieldName={field}
              formData ={userData}
              options={dummySchools}
              handleChange={handleChange}
            />
          ))}
        </Fieldset.Content >
        <Button
          size='lg'
          className="bg-blue-custom1 text-white-custom2 font-semibold w-full rounded-md mx-auto my-10"
        // onClick={() => handleRegister(userData)}
        >
          Register
        </Button>
      </Fieldset.Root>
    </div>
  )
}

export default Register