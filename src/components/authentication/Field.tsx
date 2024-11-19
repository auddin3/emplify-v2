/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { FormValues } from '@/app/register/page'
import { Button, Input } from '@chakra-ui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

interface FieldProps {
    fieldName: string
    userData: FormValues
    schools?: { id: string, name: string }[]
    handleChange: (key: string, val: string) => void
}

interface SelectFieldProps {
  items: { id: string, name: string }[]
  fieldName: string
  selectedValue: string
  handleChange: (key: string, val: string) => void
}

const SelectField = ({ items, fieldName, selectedValue, handleChange } : SelectFieldProps) => {
  const [ selected, setSelected ] = useState<string>(selectedValue)

  const handleSelect = (item: string) => {
    setSelected(item)
    handleChange(fieldName, item)
  }

  return (
    <select
      value={selected}
      onChange={(e => handleSelect(e.target.value))}
      className='w-full h-fit p-1.5 bg-white-custom2 text-black-custom2 rounded-md border text-xs'
    >
      {items.map(item => (
        <option key={item.id} value={item.name} className='text-sm'>
          {item.name}
        </option>
      ))}
    </select>
  )
}

const Field = ({ fieldName, userData, schools, handleChange }: FieldProps ) => {
  const [show, setShow] = useState(false)

  return (
    <div className='space-y-1.5 my-1'>
      <div className="w-full ml-1 text-sm font-semibold text-black-custom1 capitalize">{fieldName}</div>
      { fieldName === 'school' && schools
        ? <SelectField
          items={schools}
          fieldName='school'
          selectedValue={userData.school}
          handleChange={handleChange}
        />
        : (
          <div className='flex flex-row'>
            <Input
              type={fieldName === 'password' && !show ? 'password' : 'text'}
              placeholder={`Enter your ${fieldName}`}
              size='xs'
              className='border px-2.5 text-xs font-black-custom1'
              value={userData[fieldName as keyof FormValues]}
              onChange={e => handleChange(fieldName, e.target.value)}
              _placeholder={{ opacity: 1, color: 'gray.500', fontSize: '12px' }}
            />
            { fieldName === 'password'
              ? (
                <Button onClick={() => setShow(!show)} className='-ml-10 pb-2'>
                  { !show ? <EyeIcon/> : <EyeSlashIcon/> }
                </Button>
              )
              : ''
            }
          </div>
        )}
    </div>
  )
}

export default Field