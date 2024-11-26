import React, { useState, useEffect } from 'react'
import { Button, IconButton, Input } from '@chakra-ui/react'
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader,
  DrawerRoot, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Session } from 'next-auth'
import { Field } from '../ui/field'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { getSession } from '@/app/actions'
import Spinner from '../Spinner'

const CreatePortfolioDrawer = () => {
  const [session, setSession] = useState<Session>()
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    owner: session?.user?.id,
    specification: [],
    deadline: new Date(),
  })

  const handleChange = (key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: val,
    }))
  }

  useEffect(() => {
    const establishSession = async() => {
      setLoading(true)
      try {
        const res = await getSession()
        if (res) setSession(res)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    establishSession()
  }, [])

  if (loading) return ( <Spinner size={100} color="#1D4ED8" thickness={5} /> )

  return (
    <DrawerRoot size='sm'>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <div
          className='flex justify-center items-center cursor-pointer h-60 bg-blue-custom4 rounded-lg'
        >
          <IconButton
            as={PlusCircleIcon}
            variant="plain"
            h={32} w={32}
            className='stroke-blue-custom1 mx-auto self-center'
          />
        </div>
      </DrawerTrigger>
      <DrawerContent rounded="md">
        <DrawerHeader>
          <DrawerTitle className='font-semibold text-blue-custom1 text-[18px] pb-2'>New Portfolio</DrawerTitle>
          <hr className='border-t border-t-black-custom1/20 text-black-custom1 w-full absolute left-0 right-0'/>
        </DrawerHeader>
        <DrawerBody className = 'space-y-6'>
          <Field label="Name">
            <Input
              type={'text'}
              placeholder={'Enter portfolio name'}
              size="xs"
              className="border px-2.5 text-xs font-black-custom1"
              value={formData?.name}
              onChange={e => handleChange('name', e.target.value)}
              _placeholder={{ opacity: 1, color: 'gray.500', fontSize: '12px' }}
            />
          </Field>
          <Field label="Description">
            <Input
              type={'text'}
              placeholder={'Enter portfolio description'}
              size="xs"
              className="border px-2.5 text-xs font-black-custom1"
              value={formData?.description}
              onChange={e => handleChange('description', e.target.value)}
              _placeholder={{ opacity: 1, color: 'gray.500', fontSize: '12px' }}
            />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <Button size="sm" className='mx-auto bg-blue-custom1 text-white-custom2 font-semibold rounded-xl px-5'>Save</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default CreatePortfolioDrawer