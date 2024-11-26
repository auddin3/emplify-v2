import React from 'react'
import Portfolio, { KSB } from "@/app/models/portfolio"
import { Avatar } from '../ui/avatar'
import { IconButton } from '@chakra-ui/react'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import CreateEntryDrawer from './CreateEntryDrawer'

const KSBCard = ({ portfolio, ksb }: { portfolio: Portfolio, ksb: KSB }) => {
    const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

    const pickPalette = (name: string) => {
        const index = name.charCodeAt(0) % colorPalette.length
        return colorPalette[index]
    }

    return (
        <div className='border bg-white-custom2 w-full rounded-xl p-6 flex flex-row items-center justify-between'>
            <div className='flex flex-row space-x-6'>
                <Avatar variant="solid" name={ksb.title.split('').join(' ')} colorPalette={pickPalette(ksb.subtitle)}/>
                <div>
                    <div className='font-semibold'>{ksb.subtitle}</div>
                    <div>{ksb.description}.</div>
                </div>
            </div>
            <CreateEntryDrawer portfolio={portfolio} ksb={ksb}/>
        </div>
    )
}

interface CompactPortfolioProps {
    selectedPortfolio: Portfolio
}

const dummyData = {
    incompleteKSBs: [
        {
            title: 'C3', 
            subtitle: 'Data Modelling',
            description: 'Identifies organisational information requirements and can model data',
            category: ['dataModelling']
        }
    ], 
    achievedKSBs: [
        {
            title: 'C4', 
            subtitle: 'Data Engineering',
            description: 'Build architecture to support big data analytical solutions',
            category: ['dataModelling']
        }
    ], 

}

const CompactPortfolio = ({ selectedPortfolio }: CompactPortfolioProps) => {
    const { incompleteKSBs, achievedKSBs } = dummyData

    return (
        <div className="bg-gray-custom1 w-full p-10"> 
            <div className="text-2xl font-semibold">{selectedPortfolio?.name}</div>
            <div className="text-lg text-black-custom1 py-4">{selectedPortfolio?.description}</div>
            <div className="flex flex-col space-y-3">
                <div className='my-10'>
                    <div className="font-semibold text-gray-custom2 mb-4">Incomplete</div>
                    {incompleteKSBs.map((ksb) => (
                        <KSBCard portfolio={selectedPortfolio} ksb={ksb} key={ksb.title}/>
                    ))}
                </div>
                <div className='my-10'>
                    <div className="font-semibold text-gray-custom2 mb-4">Achieved</div>
                    {achievedKSBs.map((ksb) => (
                        <KSBCard portfolio={selectedPortfolio} ksb={ksb} key={ksb.title}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompactPortfolio