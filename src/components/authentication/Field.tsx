/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { FormValues } from '@/app/register/page'
import { Input, Select } from '@chakra-ui/react'

interface FieldProps {
    fieldName: string
    userData: FormValues
    schools?: { id: string, name: string }[]
    handleChange: (key: string, val: string) => void
}

const SelectField = ({ items } : { items: { id: string, name: string }[] }) => (
  <select className='w-full h-fit p-1.5 bg-white-custom2 text-black-custom2 rounded-md border'>
    {items.map(item => (
      <option key={item.id} value={item.name}>{item.name}</option>
    ))}
  </select>
)

const Field = ({ fieldName, userData, schools, handleChange }: FieldProps ) => {
  const [show, setShow] = useState(false)

  return (
    <div className='space-y-1 my-1'>
      <div className="w-full ml-1 text-sm font-sansSemibold text-black-custom1 capitalize">{fieldName}</div>
      { fieldName === 'school' && schools
        ? <SelectField items={schools}/>
        : (
          <Input
            type={fieldName === 'password' && !show ? 'password' : 'text'}
            placeholder={`Enter your ${fieldName}`}
            size='xs'
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