import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const Dashboard = async () => {

  const session = await auth()

  if (!session?.user) redirect ('/')

  return (
    <div>
      <h1>{session?.user?.name}</h1>
      <Image
        src={session?.user?.image as string}
        alt={session?.user?.name as string}
        width={72}
        height={72}
        className='rounded-full'
      />
    </div>
  )
}

export default Dashboard