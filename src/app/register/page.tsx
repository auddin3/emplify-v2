'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import User from '../models/user'
import School from '../models/school'
import { Field, Navbar } from '@/components/authentication'
import { Button, Fieldset, Spinner } from '@chakra-ui/react'

const Register = () => {
  const router = useRouter()
  const API_ROOT = process.env.NEXT_PUBLIC_API_URL
  const [schools, setSchools] = useState<School[]>()
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
    name: '',
    school: '',
  })

  const fields = ['name', 'email', 'password', 'school']

  const handleChange = (key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: val,
    }))
  }

  const handleRegister = async() => {
    try {
      const {name, email, password, school} = formData

      const res = await fetch(`${API_ROOT}/api/register`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          name,
          email,
          password,
          school,
        }),
      })

      if (res.status === 201) router.push('/login')

    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`${API_ROOT}/api/schools`)
      const { schools } = await res.json()
      setSchools(schools)
    }

    fetchPosts()
  }, [API_ROOT])

  return (
    <div className='min-h-screen bg-white-custom2'>
      <Navbar />
      {!schools
        ? <Spinner size="xl" color="black" />
        :
        (
          <>
            <div className='bg-gray-custom4 py-14 2xl:py-20 pb-8 2xl:pb-14'>
              <div className='flex flex-col items-center w-fit mx-auto space-y-1.5'>
                <h1 className='text-4xl font-bold text-black-custom1 -ml-10'>Register your account</h1>
                <p className="mr-auto -ml-10">
                  Already have an account? <a href="/login" className="font-semibold text-blue-500">Login.</a>
                </p>
              </div>
            </div>
            <Fieldset.Root size="lg" maxW="xl" className='mx-auto p-4 mt-10'>
              <Fieldset.Content className='my-1'>
                {fields.map((field, UKPRNx) => (
                  <Field
                    key={UKPRNx}
                    fieldName={field}
                    formData ={formData}
                    options={schools}
                    handleChange={handleChange}
                  />
                ))}
              </Fieldset.Content >
              <Button
                size='lg'
                className="bg-blue-custom1 text-white-custom2 font-semibold w-full rounded-md mx-auto my-10"
                onClick={() => handleRegister()}
              >
          Register
              </Button>
            </Fieldset.Root>
          </>
        )
      }
    </div>
  )
}

export default Register