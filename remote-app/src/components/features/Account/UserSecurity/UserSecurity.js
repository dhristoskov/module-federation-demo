import React, { useState, useEffect, useContext } from 'react'

import getUserInformation from '../utils/getUserInformation'
import UserSecurityInfo from './UserSecurityComponents/UserSecurityInfo'
import UserSecurityForm from './UserSecurityComponents/UserSecurityForm'
import UserEmailOrPhoneForm from './UserSecurityComponents/UserEmailOrPhoneForm'
import { NotificationContext } from '@/store/NotificationContext'

import 'tailwindcss/tailwind.css'

const UserSecurity = ({ id }) => {
  const { showNotification } = useContext(NotificationContext)
  const [selected, setSelected] = useState('')
  const [reload, setReload] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone_number: '',
    password: '',
  })

  useEffect(() => {
    if (!id) return
    getUserInformation(id, setUserInfo, showNotification, setReload)
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
      case 'report_problem':
        return <div>report_problem</div>
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
      <div className="md:w-6/12 w-full">{renderSelected()}</div>
      <UserSecurityInfo
        setSelected={setSelected}
        userInfo={userInfo}
      />
    </div>
  )
}

export default UserSecurity
