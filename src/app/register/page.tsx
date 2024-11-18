'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
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
export interface FormValues {
  email: string
  password: string
  name: string
  school: string
}

const Register = () => {
  // const router = useRouter()

  const [userData, setUserData] = useState<FormValues>({
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
      <div className='bg-gray-custom3 space-y-2.5 text-center pt-10 2xl:pt-20 pb-7 2xl:pb-14'>
        <h1 className='text-4xl font-sansBold text-black-custom1'>Register your account</h1>
        <p className="2xl:mt-24 mb-7 2xl:mb-10">
            Already have an account? <a href="/login" className="font-semibold text-blue-500">Login.</a>
        </p>
      </div>
      <Fieldset.Root size="lg" maxW="2xl" className='mx-auto p-4'>
        <Fieldset.Content className='my-1'>
          {fields.map((field, idx) => (
            <Field
              key={idx}
              fieldName={field}
              userData={userData}
              schools={dummySchools}
              handleChange={handleChange}
            />
          ))}
        </Fieldset.Content >
        <Button
          size='lg'
          className="bg-blue-custom1 text-white-custom2 w-5/12 2xl:w-1/3 rounded-md mx-auto my-10"
        // onClick={() => handleRegister(userData)}
        >
          Register
        </Button>
      </Fieldset.Root>
    </div>
  )
}

export default Register