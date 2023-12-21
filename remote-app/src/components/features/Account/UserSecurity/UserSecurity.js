import React, { useState, useEffect } from 'react'

import getUserInformation from '../utils/getUserInformation'
import UserSecurityInfo from './UserSecurityComponents/UserSecurityInfo'
import UserSecurityForm from './UserSecurityComponents/UserSecurityForm'
import UserEmailOrPhoneForm from './UserSecurityComponents/UserEmailOrPhoneForm'
import addNotification from '../../Basket/utils/addNotification'
import UserDeleteAccount from './UserSecurityComponents/UserDeleteAccount'

import 'tailwindcss/tailwind.css'

const UserSecurity = ({ id }) => {
  const [selected, setSelected] = useState('')
  const [reload, setReload] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone_number: '',
    password: '',
  })

  useEffect(() => {
    if (!id) return
    getUserInformation(id, setUserInfo, addNotification, setReload)
  }, [reload])

  const renderSelected = () => {
    switch (selected) {
      case 'email':
        return (
          <UserEmailOrPhoneForm
            id={id}
            type="email"
            userInfo={userInfo}
            setReload={setReload}
          />
        )
      case 'phone_number':
        return (
          <UserEmailOrPhoneForm
            id={id}
            type="phone_number"
            userInfo={userInfo}
            setReload={setReload}
          />
        )
      case 'password':
        return <UserSecurityForm id={id} />
      case 'delete_account':
        return <UserDeleteAccount />
      default:
        return (
          <UserEmailOrPhoneForm
            id={id}
            type="email"
            userInfo={userInfo}
            setReload={setReload}
          />
        )
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      <div className="xs:w-full md:w-6/12 w-full">{renderSelected()}</div>
      <UserSecurityInfo
        setSelected={setSelected}
        userInfo={userInfo}
      />
    </div>
  )
}

export default UserSecurity
