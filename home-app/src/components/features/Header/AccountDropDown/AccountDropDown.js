import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'

const AccountDropDown = ({ user, logout }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const buttonStyles = 'cursor-pointer bg-white transition-colors duration-150 ease-in-out hover:bg-slate-400 px-3 py-3'

  const toggleOpen = () => {
    setOpen(!open)
  }

  const onLogoutUser = () => {
    logout()
    setOpen(false)
    router.push({ pathname: '/' }, undefined, { shallow: true })
  }

  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 cursor-pointer"
      >
        <BaseIconButton
          icon="user"
          size="md"
          buttonClassName="block min-w-[1.6rem]"
        />
        <p
          id="account-button"
          className="hidden md:block whitespace-nowrap text-sm font-bold text-neutral-700 hover:text-neutral-900"
        >
          Hi, {user?.username}
        </p>
      </div>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          id="drop-down-container"
          className="absolute border-2 border-slate-200 w-full shadow-md z-20 top-8 right-0 bg-white min-w-[10rem]"
        >
          <Link href="/account">
            <p className={buttonStyles}>Account</p>
          </Link>
          <p
            onClick={() => {}}
            className={buttonStyles}
          >
            Settings
          </p>
          <p
            onClick={onLogoutUser}
            className={buttonStyles}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  )
}

export default AccountDropDown
