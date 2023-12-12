import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import Breakpoints from '@/components/foundations/Breakpoints/Breakpoints'
import BaseIcon from '@/components/elements/BaseIcon/BaseIcon'
import Typography from '@/components/elements/Typography/Typography'

const Address = dynamic(() => import('remote/Address'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const SHOW_ADDRESS_OPTION = ['/products', '/products/[slug]', '/', '/home']

const InfoHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathName = usePathname()
  const storedData = JSON.parse(localStorage.getItem('userData'))
  const token = storedData && storedData.token

  useEffect(() => {
    setIsLoggedIn(token)
  }, [token])

  const showAddressOption = SHOW_ADDRESS_OPTION.includes(pathName)
  const loggedInClass = isLoggedIn && showAddressOption ? 'justify-between' : 'justify-end'

  return (
    <div className="shadow-md min-h-[2rem] shadow-slate-300 bg-slate-900">
      <Breakpoints tag="div">
        <div
          className={`col-span-full col-start-1 min-h-[2rem] flex flex-col md:flex-row gap-1 items-start md:items-center ${loggedInClass} py-[0.5rem] md:py-0`}
        >
          {isLoggedIn && showAddressOption && (
            <div className="flex items-center gap-2 cursor-pointer">
              <p className="hidden md:flex h-[2rem] w-[2rem] bg-slate-100 items-center justify-center">
                <BaseIcon
                  size="md"
                  icon="map-marker"
                />
              </p>
              <Address />
            </div>
          )}
          <Typography additionalClasses="text-slate-100 text-xs font-bold">Todays Deal -10% to -20% for selected products</Typography>
        </div>
      </Breakpoints>
    </div>
  )
}

export default InfoHeader

export const getServersideProps = async (ctx) => {
  const address = await import('remote/Address')

  if(address.getServersideProps) {
    return await address.getServersideProps(ctx)
  }

  return {
    props: {}
  }
}
