/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Button, IconButton, Input, Textarea } from '@chakra-ui/react'
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader,
  DrawerRoot, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Field } from '../ui/field'
import { toaster } from '@/components/ui/toaster'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import Portfolio from '@/app/models/portfolio'
import { KSB } from '@/app/models/portfolio'
import PortfolioEntry from '@/app/models/portfolioEntry'

interface PortfolioEntryDrawerProps {
  portfolio: Portfolio
  ksb: KSB
  entry?: PortfolioEntry
  setPortfolioEntries: React.Dispatch<React.SetStateAction<PortfolioEntry[] | undefined>>
}

const PortfolioEntryDrawer = ({ portfolio, ksb, entry, setPortfolioEntries }: PortfolioEntryDrawerProps) => {
  const API_ROOT = process.env.NEXT_PUBLIC_API_URL
  const [formData, setFormData] = useState({
    www: (entry?.www || ''),
    ebi: (entry?.ebi || ''),
  })

  const handleChange = (key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: val,
    }))
  }

  const handleSubmit = async () => {
    try {
      const { www, ebi } = formData

      const res = await fetch(`${API_ROOT}/api/portfolioEntries`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          portfolio,
          KSB: ksb,
          www,
          ebi,
        }),
      })

      if (res.status === 200) {
        toaster.create({
          title: 'Operation successful',
          type: 'success',
        })
      }

      const { portfolioEntries } = await res.json()
      setPortfolioEntries(portfolioEntries)

    } catch {
      toaster.create({
        title: 'Operation failed',
        type: 'error',
      })
    }
  }

  return (
    <DrawerRoot size='sm'>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton aria-label="See entry" rounded="full">
          <ArrowRightCircleIcon className='text-blue-custom3 h-12 w-12 justify-end'/>
        </IconButton>
      </DrawerTrigger>
      <DrawerContent rounded="md">
        <DrawerHeader>
          <DrawerTitle className='font-semibold text-blue-custom1 text-[18px] pb-2'>New Portfolio Entry</DrawerTitle>
          <hr className='border-t border-t-black-custom1/20 text-black-custom1 w-full absolute left-0 right-0'/>
        </DrawerHeader>
        <DrawerBody className = 'space-y-6'>
          <Field label="What Went Well?" required>
            <Textarea
              placeholder={'This time, what really went well...'}
              size="xl"
              className="border px-2.5 text-xs font-black-custom1"
              value={formData?.www}
              onChange={e => handleChange('www', e.target.value)}
              _placeholder={{ opacity: 1, color: 'gray.500', fontSize: '12px' }}
              required
            />
          </Field>
          <Field label="Even Better If?" required>
            <Textarea
              placeholder={'Next time, it would be even better if...'}
              size="xl"
              className="border px-2.5 text-xs font-black-custom1"
              value={formData?.ebi}
              onChange={e => handleChange('ebi', e.target.value)}
              _placeholder={{ opacity: 1, color: 'gray.500', fontSize: '12px' }}
              required
            />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button
            size="xs"
            onClick={handleSubmit}
            className='mx-auto w-32 bg-blue-custom1 text-white-custom2 font-semibold rounded-lg px-5'
          >
            Save
          </Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default PortfolioEntryDrawer