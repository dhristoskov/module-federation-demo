import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import Breakpoints from '@/components/foundations/Breakpoints/Breakpoints'
import BaseIcon from '@/components/elements/BaseIcon/BaseIcon'
import Typography from '@/components/elements/Typography/Typography'
import useAuth from '@/hooks/useAuth'

const Address = dynamic(() => import('remote/Address'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const SHOW_ADDRESS_OPTION = ['/products', '/products/[slug]', '/', '/home']

const InfoHeader = () => {
  const { isLoggedIn } = useAuth()
  const [isAddressAvailable, setIsAddressAvailable] = useState(false)
  const pathName = usePathname()

  const showAddressOption = SHOW_ADDRESS_OPTION.includes(pathName)
  const loggedInClass = isLoggedIn && showAddressOption ? 'justify-between' : 'justify-end'

  useEffect(() => {
    window.addEventListener('address-available', (e) => {
      setIsAddressAvailable(e.detail)
    })

    return () => {
      window.removeEventListener('address-available', () => {})
    }
  }, [])

  return (
    <div className="shadow-md min-h-[2rem] shadow-slate-300 bg-slate-900">
      <Breakpoints tag="div">
        <div
          className={`col-span-full col-start-1 min-h-[2rem] flex flex-col md:flex-row gap-1 items-start md:items-center ${loggedInClass} py-[0.5rem] md:py-0`}
        >
          {isLoggedIn && showAddressOption && (
            <div className="flex items-center gap-2 cursor-pointer">
              {isAddressAvailable && (
                <p className="hidden md:flex h-[2rem] w-[2rem] bg-slate-100 items-center justify-center">
                  <BaseIcon
                    size="md"
                    icon="map-marker"
                  />
                </p>
              )}
              <Address setIsAddressAvailable={setIsAddressAvailable} />
            </div>
          )}
          <Typography additionalClasses="text-slate-100 text-xs font-bold ml-auto">
            Todays Deal -10% to -20% for selected products
          </Typography>
        </div>
      </Breakpoints>
    </div>
  )
}

export default InfoHeader

export const getServersideProps = async (ctx) => {
  const address = await import('remote/Address')

  if (address.getServersideProps) {
    return await address.getServersideProps(ctx)
  }

  return {
    props: {},
  }
}
