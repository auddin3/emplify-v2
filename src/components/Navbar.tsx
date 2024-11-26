import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import EmplifyLogo from '../../public/logo.png'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { Icon } from '@chakra-ui/react'
import { ChartPieIcon, ShieldCheckIcon, WalletIcon } from '@heroicons/react/24/solid'

interface NavItemProps {
    href: string
    ariaLabel: string
    isActive: boolean
    IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const NavItem = ({ href, ariaLabel, isActive, IconComponent }: NavItemProps) => {
  const isDisabled = href != '/portfolios'

  return (
    <>
      {isDisabled
        ? (
          <div
            className={`flex justify-center py-3 cursor-pointer 
            ${isActive ? 'bg-blue-custom3 rounded-r-full w-10/12 pl-4' : ''}
            ${isDisabled ? 'cursor-not-allowed' : ''}`
            }>
            <Icon w={30} h={30} color="white">
              <IconComponent />
            </Icon>
          </div>
        )
        : (
          <a
            href={href}
            aria-label={ariaLabel}
            className={`flex justify-center py-3 cursor-pointer 
            ${isActive ? 'bg-blue-custom3 rounded-r-full w-10/12 pl-4' : ''}
            ${isDisabled ? 'cursor-not-allowed' : ''}`
            }
          >
            <Icon w={30} h={30} color="white">
              <IconComponent />
            </Icon>
          </a>
        )}
    </>
  )
}

const Navbar = () => {
  const [session, setSession] = useState<Session>()
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', ariaLabel: 'dashboard', IconComponent: ChartPieIcon },
    { href: '/portfolios', ariaLabel: 'portfolios', IconComponent: ShieldCheckIcon },
    { href: '/library', ariaLabel: 'library', IconComponent: WalletIcon },
  ]

  useEffect(() => {
    const establishSession = async() => {
      setLoading(true)
      try {
        const res = await getSession()
        if (res) setSession(res)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    establishSession()
  }, [])

  if (loading) return (<div className='flex flex-col justify-between min-h-screen bg-blue-custom1 max-w-28 min-w-28 rounded-r-3xl'></div> )

  return (
    <div className='flex flex-col h-screen bg-blue-custom1 max-w-28 min-w-28 rounded-r-3xl'>
      <Image
        src={EmplifyLogo}
        alt='KPMG Logo'
        className='object-contain h-[50px] w-[100px] mt-12 mb-20 px-4 mx-auto'
        priority
      />
      <div className='flex flex-col h-full space-y-7'>
        {navItems.map(item => (
          <NavItem
            key={item.href}
            href={item.href}
            ariaLabel={item.ariaLabel}
            isActive={pathname?.includes(item.href)}
            IconComponent={item.IconComponent}
          />
        ))}
      </div>
      <div className='mx-auto pb-16'>
        {session?.user?.image
          ? ( <Image src={session?.user?.image} alt="avatar" width={72} height={72} className="object-cover rounded-full" priority/>)
          : ( <div className={'flex items-center justify-center rounded-full bg-pink-custom1 h-[72px] w-[72px]'}>
            <div className={'flex items-center justify-center w-full h-full font-semibold text-white-custom2 text-3xl'}>
              {session?.user?.name?.split(' ').map(name => name[0]).join('')}
            </div>
          </div>
          )}
      </div>
    </div>
  )
}

export default Navbar