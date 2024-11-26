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
import { getSession } from '@/app/actions'
import Spinner from '../Spinner'
import { KSB } from '@/app/models/portfolio'

const dummyKSBs = [
  {
    title: 'D1',
    subtitle: 'Data Analytics',
    description: 'Is able to work with big data analytics solutions to derive insights and conclusions',
    category: ['dataModelling'],
  },
  {
    title: 'C7',
    subtitle: 'Computer and Network Infrastructure',
    description: 'Can plan, design and manage computer networks with an overall focus on the services and capabilities that network infrastructure solutions enable in an organisational context. Identifies network security risks and their resolution.',
    category: [
      'networks',
    ],
  },
  {
    title: 'C1',
    subtitle: 'Information Systems',
    description: 'Is able to critically analyse a business domain in order to identify the role of information systems, highlight issues and identify opportunities for improvement through evaluating information systems in relation to their intended purpose and effectiveness',
    category: [
      'dataModelling',
    ],
  },
  {
    title: 'C2',
    subtitle: 'Systems Development',
    description: 'Analyses business and technical requirements to select and specify appropriate technology solutions. Designs, implements, tests, and debugs software to meet requirements using contemporary methods including agile development. Manages the development and assurance of software artefacts applying secure development practises to ensure system resilience. Configures and deploys solutions to end users.',
    category: [
      'softwareEngineering',
      'UXD/UID',
      'dataModelling',
    ],
  },
  {
    title: 'C3',
    subtitle: 'Data Modelling',
    description: 'Identifies organisational information requirements and can model data solutions using conceptual data modelling techniques. Is able to implement a database solution using an industry standard database management system (DBMS). Can perform database administration tasks and is cognisant of the key concepts of data quality and data security. Is able to manage data effectively and undertake data analysis.',
    category: [
      'dataModelling',
    ],
  },
  {
    title: 'C4',
    subtitle: 'Cyber Security',
    description: 'Can undertake a security risk assessment for a simple IT system and propose resolution advice. Can identify, analyse and evaluate security threats and hazards to planned and installed information systems or services (e.g. Cloud services).',
    category: [
      'networks',
      'artificialIntelligence',
    ],
  },
  {
    title: 'C5',
    subtitle: 'Business Organisation',
    description: 'Can apply organisational theory, change management, marketing, strategic practice, human resource management and IT service management to technology solutions development. Develops well-reasoned investment proposals and provides business insights.',
    category: [
      'dataModelling',
    ],
  },
  {
    title: 'C6',
    subtitle: 'IT Project Management',
    description: 'Follows a systematic methodology for initiating, planning, executing, controlling, and closing technology solutions projects. Applies industry standard processes, methods, techniques and tools to execute projects. Is able to manage a project (typically less than six months, no inter-dependency with other projects and no strategic impact) including identifying and resolving deviations and the management of problems and escalation processes.',
    category: [
      'softwareEngineering',
      'UXD/UID',
    ],
  },
  {
    title: 'D2',
    subtitle: 'Data Engineering',
    description: 'Is able to build infrastructure to support big data analytics solutions',
    category: [
      'dataModelling',
    ],
  },
]

const CreatePortfolioDrawer = () => {
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

  const handleSubmit = async() => {
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