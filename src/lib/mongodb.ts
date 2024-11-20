/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getDatabase(dbName: string): Promise<Db> {
  const client = await clientPromise
  return client.db(dbName)
}

export default clientPromise
