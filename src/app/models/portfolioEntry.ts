import { ObjectId } from 'mongodb'
import { KSB } from './portfolio'

interface PortfolioEntry {
    portfolio: ObjectId
    KSB: KSB
    www: string
    ebi: string
}

export default PortfolioEntry
