import React, {useState, useEffect} from 'react'
import Portfolio, { KSB } from "@/app/models/portfolio"
import { Avatar } from '../ui/avatar'
import Spinner from '../Spinner'
import CreateEntryDrawer from './CreateEntryDrawer'
import { dummyKSBs } from '@/app/util'
import PortfolioEntry from '@/app/models/portfolioEntry'

const KSBCard = ({ portfolio, ksb }: { portfolio: Portfolio, ksb: KSB }) => {
    const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

    const pickPalette = (name: string) => {
        const index = name.charCodeAt(0) % colorPalette.length
        return colorPalette[index]
    }

    return (
        <div className='border bg-white-custom2 w-full rounded-xl p-6 flex flex-row items-center justify-between my-4'>
            <div className='flex flex-row space-x-6'>
                <Avatar variant="solid" name={ksb.title.split('').join(' ')} colorPalette={pickPalette(ksb.subtitle)}/>
                <div>
                    <div className='font-semibold'>{ksb.subtitle}</div>
                    <div>{ksb.description.slice(0, 200)}...</div>
                </div>
            </div>
            <CreateEntryDrawer portfolio={portfolio} ksb={ksb}/>
        </div>
    )
}

interface CompactPortfolioProps {
    selectedPortfolio: Portfolio
}

const CompactPortfolio = ({ selectedPortfolio }: CompactPortfolioProps) => {
    const [portfolioEntries, setPortfolioEntries ] = useState<PortfolioEntry[]>()
    const [loading, setLoading] = useState(true)
    const [achievedKSBs, setAchievedKSBs] = useState<KSB[]>([]);
    const [incompleteKSBs, setIncompleteKSBs] = useState<KSB[]>([]);
    const API_ROOT = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const fetchPortfolioEntries = async () => {
          try {
            setLoading(true)
            const res = await fetch(`${API_ROOT}/api/portfolioEntries/${selectedPortfolio._id}`)
            const { portfolioEntries } = await res.json()
            setPortfolioEntries(portfolioEntries)
          } catch (e) {
            console.error(e)
          } finally {
            setLoading(false)
          }
        }
    
        fetchPortfolioEntries()
      }, [API_ROOT, setPortfolioEntries])

    useEffect(() => {
        const categorizeKSBs = (entries: PortfolioEntry[]) => {
            const achieved: KSB[] = []
            const incomplete: KSB[] = []
        
            const achievedTitles = new Set<string>()
            console.log('hiha', entries)
            entries?.forEach((entry: PortfolioEntry) => {
                console.log(entry, 'this is an entry', entry.KSB.title)
                if (!achievedTitles.has(entry.KSB.title)) {
                    achieved.push(entry.KSB)
                    achievedTitles.add(entry.KSB.title)
                }
            })
        
            const specificationTitles = new Set(
                selectedPortfolio.specification.map((ksb) => ksb.title)
            );
        
            dummyKSBs.forEach((ksb) => {
                if (
                    !achievedTitles.has(ksb.title) && 
                    specificationTitles.has(ksb.title)
                ) {
                    incomplete.push(ksb);
                }
            });
        
            setAchievedKSBs(achieved)
            setIncompleteKSBs(incomplete)
        }
        
        portfolioEntries && categorizeKSBs(portfolioEntries)
    }, [portfolioEntries])

    if (loading) return <Spinner size={100} color="#1D4ED8" thickness={5} />

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