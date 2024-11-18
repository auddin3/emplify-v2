/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { FormValues } from '@/app/register/page'
import { Input } from '@chakra-ui/react'

interface FieldProps {
    fieldName: string
    userData: FormValues
    schools?: string[]
    handleChange: (key: string, val: string) => void
}

const Field = ({ fieldName, userData, schools, handleChange }: FieldProps ) => {
  const [show, setShow] = useState(false)

  return (
    <div className='space-y-1.5 my-1.5'>
      <div className="w-full ml-1 font-sansSemibold text-black-custom1 capitalize">{fieldName}</div>
      { fieldName === 'school'
        ? (
          <div></div>
        )
        : (
          <Input
            type={fieldName === 'password' && !show ? 'password' : 'text'}
            placeholder={`Enter your ${fieldName}`}
            size='sm'
            className='border px-2.5'
            value={userData[fieldName as keyof FormValues]}
            onChange={e => handleChange(fieldName, e.target.value)}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
          />
        )}
    </div>
  )
}

export default Field