import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import EmplifyLogo from '../../public/logo.png'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { Icon } from '@chakra-ui/react'
import { ChartPieIcon, ShieldCheckIcon, WalletIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
    const [session, setSession] = useState<Session>()
    const pathname = usePathname()
    
    useEffect(() => {
        const establishSession = async() => {
            try {
                const res = await getSession()
                if (res) setSession(res)
            } catch (e) {
                console.error(e)
            }
        }

        establishSession()
    }, [])

    return (
        <div className='flex flex-col justify-between min-h-screen bg-blue-custom1 max-w-28 min-w-28 rounded-r-3xl pb-40'>
            <Image
            src={EmplifyLogo}
            alt='KPMG Logo'
            className='object-contain h-[50px] w-[100px] my-12 px-4 mx-auto'
            />
            <div className='flex flex-col justify-between h-full mb-28 space-y-12'>
                <a href='/dashboard' aria-label="dashboard" className={`flex justify-center py-3 cursor-pointer ${pathname?.includes('/dashboard') ? 'bg-blue-custom3 rounded-r-full w-10/12 pl-4' : ''}`}>
                    <Icon w={30} h={30} color="white">
                    <ChartPieIcon />
                    </Icon>
                </a>

                <a href='/portfolios' aria-label="portfolios" className={`flex justify-center py-3 cursor-pointer ${pathname?.includes('/portfolios') ? 'bg-blue-custom3 rounded-r-full w-10/12 pl-4' : ''}`}>
                <Icon w={30} h={30} color="white">
                    <ShieldCheckIcon />
                    </Icon>
                </a>

                <a href='/library' aria-label="library" className={`flex justify-center py-3 cursor-pointer ${pathname?.includes('/library') ? 'bg-blue-custom3 rounded-r-full w-10/12 pl-4' : ''}`}>
                <Icon w={30} h={30} color="white">
                    <WalletIcon />
                    </Icon>
                </a>
            </div>
            <div className='m-5'>
                {session?.user?.image 
                ? ( <img src={session?.user?.image} alt="avatar" className="object-cover w-full h-full rounded-full"/>) 
                : ( <div className={`flex items-center justify-center rounded-full bg-pink-custom1 h-[72px] w-[72px]`}>
                        <div className={`flex items-center justify-center w-full h-full font-semibold text-white-custom2 text-3xl`}>
                            {session?.user?.name?.split(' ').map(name => name[0]).join('')}
                        </div>
                    </div>
                 )}
            </div>
        </div>
    )
}

export default Navbar