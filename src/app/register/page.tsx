'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Field, Navbar } from '@/components/authentication/Index'
import { Fieldset } from '@chakra-ui/react'

export interface FormValues {
  email: string
  password: string
  name: string
  school: string
}

const dummySchools = [
  'University of Birmingham',
  'University of Bristol',
  'Durham University',
  'University of Edinburgh',
  'Imperial College London',
  'King\'s College London',
  'London School of Economics and Political Science (LSE)',
  'University of Leeds',
  'University of Liverpool',
  'University of Manchester',
  'Newcastle University',
  'University of Nottingham',
  'University of Oxford',
  'Queen Mary\'s University of London',
  'University of Sheffield',
  'University of Southampton',
  'University of St Andrews',
  'University of Warwick',
  'University of Glasgow',
  'University College London (UCL)',
]

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
      </Fieldset.Root>
    </div>
  )
}

export default Register