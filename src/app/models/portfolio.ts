import { ObjectId } from 'mongodb'

export interface KSB {
    title: string
    subtitle: string
    description: string
    category: string[]
}

interface Portfolio {
    name: string
    owner: ObjectId
    specification: KSB[]
    deadline: Date
    description: string
}

export default Portfolio