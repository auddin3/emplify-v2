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

const CreateEntryDrawer = ({ portfolio, ksb  }: { portfolio: Portfolio, ksb: KSB }) => {
  const API_ROOT = process.env.NEXT_PUBLIC_API_URL
  const [formData, setFormData] = useState({
    www: '',
    ebi: '',
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
          ebi
        }),
      })
  
      if (res.status === 200) {
        toaster.create({
          title: 'Operation successful',
          type: 'success',
        })
      }

      const { portfolioEntries } = await res.json()
      console.log(portfolioEntries)
    //   setPortfolios(portfolios)
  
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

export default CreateEntryDrawer