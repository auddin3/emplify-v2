/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, Box, CheckboxGroup, Fieldset, IconButton, Input } from '@chakra-ui/react'
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader,
  DrawerRoot, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Session } from 'next-auth'
import { Field } from '../ui/field'
import { Checkbox } from '../ui/checkbox'
import { toaster } from '@/components/ui/toaster'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Portfolio from '@/app/models/portfolio'
import { getSession } from '@/app/actions'
import Spinner from '../Spinner'
import { KSB } from '@/app/models/portfolio'
import { dummyKSBs } from '@/app/util'

const CreatePortfolioDrawer = ({ setPortfolios }: { setPortfolios: React.Dispatch<React.SetStateAction<Portfolio[] | undefined>> }) => {
  const [session, setSession] = useState<Session>()
  const API_ROOT = process.env.NEXT_PUBLIC_API_URL
  const [loading, setLoading] = useState(true)
  const [KSBs, setKSBs] = useState<KSB[]>(dummyKSBs)
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    owner: string | undefined;
    specification: KSB[];
    deadline: Date;
  }>({
    name: '',
    description: '',
    owner: '',
    specification: [],
    deadline: new Date(),
  })

  const handleChange = (key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: val,
    }))
  }

  const handleCheckboxChange = (ksb: KSB) => {
    setFormData(prev => ({
      ...prev,
      specification: (prev.specification.some(item => item.title === ksb.title))
        ? prev.specification.filter(item => item.title !== ksb.title)
        : [...prev.specification, ksb],
    }))
  }

  const handleSubmit = async () => {
    try {
      const { name, description, owner, specification, deadline } = formData
      setLoading(true)
      const res = await fetch(`${API_ROOT}/api/portfolios`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          name,
          description,
          owner,
          specification,
          deadline,
        }),
      })

      if (res.status === 200) {
        toaster.create({
          title: 'Operation successful',
          type: 'success',
        })
      }

      const { portfolios } = await res.json()
      setPortfolios(portfolios)

    } catch {
      toaster.create({
        title: 'Operation failed',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const establishSession = async () => {
      setLoading(true)
      try {
        const res = await getSession()
        if (res) {
          setSession(res)
          setFormData(prev => ({
            ...prev,
            owner: res.user?.id || '',
          }))
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    establishSession()
  }, [])

  if (loading) return ( <></> )

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
          <Field label="Name" required>
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
          <Field label="Description" required>
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
          <Fieldset.Root>
            <CheckboxGroup defaultValue={['react']} name="specification">
              <Fieldset.Legend fontSize="sm" mb="2">
                Specification
              </Fieldset.Legend>
              <Fieldset.Content className='pl-4'>
                {KSBs?.map(ksb => (
                  <Checkbox
                    key={ksb.title}
                    value={ksb.title}
                    variant={'subtle'}
                    gap={4}
                    alignItems={'flex-start'}
                    colorPalette={'blue'}
                    onChange={() => handleCheckboxChange(ksb)}
                  >
                    <Box lineHeight="1">{ksb.subtitle}</Box>
                    <Box fontWeight="normal" color="fg.muted" mt="1">
                      {ksb.description.length > 100
                        ? `${ksb.description.slice(0, 100)}...`
                        : ksb.description}
                    </Box>
                  </Checkbox>
                ))}
              </Fieldset.Content>
            </CheckboxGroup>
          </Fieldset.Root>
          <Field label="Deadline" required>
            <Input
              type={'date'}
              size="xs"
              className="border px-2.5 text-xs font-black-custom1"
              value={formData?.deadline.toString()}
              onChange={e => handleChange('deadline', e.target.value)}
              _placeholder={{ opacity: 1, color: 'gray.500', fontSize: '12px' }}
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

export default CreatePortfolioDrawer