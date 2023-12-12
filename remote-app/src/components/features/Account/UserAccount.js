import React, { useContext } from 'react'

import UserAddress from './UserAddress/UserAddress'
import UserSecurity from './UserSecurity/UserSecurity'
import UserPaymentsForm from './UserPayments/UserPaymentsForm'
import { AuthContext } from '@/store/AuthContext'

import 'tailwindcss/tailwind.css'

const UserAccount = ({ selected }) => {
  const { user } = useContext(AuthContext)

  const renderSelected = () => {
    switch (selected) {
      case 'orders':
        return <div>Orders</div>
      case 'security':
        return <UserSecurity id={user.id} />
      case 'addresses':
        return <UserAddress id={user.id} />
      case 'payments':
        return <UserPaymentsForm id={user.id} />
      case 'gift-cards':
        return <div>Gift Cards</div>
      case 'messages':
        return <div>Messages</div>
      case 'contact':
        return <div>Contact</div>
      case 'favorites':
        return <div>Favorites</div>
    }
  }

  return (
    user && (
      <div className="flex flex-col w-full my-20 min-h-[25rem]">
        <div className="w-full">{renderSelected()}</div>
      </div>
    )
  )
}

export default UserAccount
