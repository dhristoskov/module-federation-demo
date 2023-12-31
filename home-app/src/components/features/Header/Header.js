import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import LanguagePicker from './LanguagePicker/LanguagePicker'
import Breakpoints from '@/components/foundations/Breakpoints/Breakpoints'
import AccountDropDown from './AccountDropDown/AccountDropDown'
import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'
import CategoryDropDown from './CategoryDropDown/CategoryDropDown'
import BasketDropDown from './BasketDropDown/BasketDropDown'
import GlobalSearch from './GlobalSearch/GlobalSearch'

import logout from './utils/logout'
import useAuth from '@/hooks/useAuth'

const showComponent = ['/products', '/products/[id]', '/', '/home']
const hideBasket = ['/checkout', '/checkout/[id]']

const Header = ({ categories }) => {
  const { isLoggedIn, user } = useAuth()
  const pathName = usePathname()

  const shouldShowComponent = showComponent.includes(pathName)
  const shouldHideBasket = !hideBasket.includes(pathName)

  const handleOnLoginClick = () => {
    const event = new CustomEvent('auth')
    window.dispatchEvent(event)
  }

  return (
    <header className="shadow-md shadow-slate-300 bg-slate-100">
      <Breakpoints tag="div">
        <div className="col-span-full col-start-1 flex h-16 sm:h-24 items-center justify-between">
          <div className="flex gap-6 items-center max-w-[4rem] sm:max-w-none sm:min-w-[7rem]">
            <Link href="/">
              <Image
                width={0}
                height={0}
                alt="logo"
                loading="eager"
                placeholder="blur"
                src="/assets/Logo.png"
                blurDataURL="/assets/Logo.png"
                style={{ width: '100px', height: 'auto' }}
              />
            </Link>
          </div>
          {shouldShowComponent && <CategoryDropDown categories={categories} />}
          {shouldShowComponent && <GlobalSearch />}
          <div className="flex items-center gap-4 cursor-pointer">
            {!isLoggedIn && (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleOnLoginClick}
              >
                <p className="hidden md:block cursor-pointer text-sm font-bold text-neutral-700 hover:text-neutral-900 whitespace-nowrap">
                  Sign In
                </p>
                <BaseIconButton
                  icon="sign-in"
                  size="md"
                  buttonClassName="block min-w-[1.6rem]"
                />
              </div>
            )}
            {isLoggedIn && (
              <AccountDropDown
                user={user}
                logout={logout}
              />
            )}
            <LanguagePicker />
            {shouldHideBasket && <BasketDropDown />}
          </div>
        </div>
      </Breakpoints>
    </header>
  )
}

export default Header
