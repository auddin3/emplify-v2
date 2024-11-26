import { ObjectId } from 'mongodb'

interface KSB {
    title: string
    subTitle: string
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