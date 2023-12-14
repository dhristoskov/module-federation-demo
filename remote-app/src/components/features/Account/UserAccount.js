import React, { useContext } from 'react'

import UserOrders from './UserOreders/UserOrders'
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
        return <UserOrders />
      case 'security':
        return <UserSecurity id={user.id} />
      case 'addresses':
        return <UserAddress id={user.id} />
      case 'payments':
        return <UserPaymentsForm id={user.id} />
      case 'messages':
        return <div>Messages</div>
      case 'favorites':
        return <div>Favorites</div>
    }
  }

  return (
    user && (
      <div className="flex flex-col w-full">
        <div className="w-full">{renderSelected()}</div>
      </div>
    )
  )
}

export default UserAccount
