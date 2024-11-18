/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { FormValues } from '@/app/register/page'
import { Fieldset, Input } from '@chakra-ui/react'

interface FieldProps {
    field: string
    userData: FormValues
    handleChange: (key: string, val: string) => void
}

const Field = ({ field, userData, handleChange }: FieldProps ) => {
  const [show, setShow] = useState(false)

  return (
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
  )
}

export default Field