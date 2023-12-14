import React, { useEffect, useState, useContext } from 'react'

import BaseForm from '@/components/elements/BaseForm/BaseForm'
import editUserEmail from '../../utils/editUserEmail'
import editPhoneNumber from '../../utils/editPhoneNumber'
import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'
import { NotificationContext } from '@/store/NotificationContext'

import 'tailwindcss/tailwind.css'

const UserEmailOrPhoneForm = ({ id, type, userInfo, setReload }) => {
  const { showNotification } = useContext(NotificationContext)
  const [email, setEmail] = useState('')
  const [phone_number, setPhoneNumber] = useState('')

  useEffect(() => {
    setEmail(userInfo?.email)
    setPhoneNumber(userInfo?.phone_number)
  }, [userInfo])

  const onChange = (e) => {
    switch (type) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'phone_number':
        setPhoneNumber(e.target.value)
        break
      default:
        throw new Error('Invalid type')
    }
  }

  const onUpdate = () => {
    if (!id) return
    switch (type) {
      case 'email':
        editUserEmail(id, email, showNotification, setReload)
        break
      case 'phone_number':
        editPhoneNumber(id, phone_number, showNotification, setReload)
        break
      default:
        throw new Error('Invalid type')
    }

    setEmail('')
    setPhoneNumber('')
  }

  return (
    <BaseForm
      formClass="xs:w-full md:max-w-[32rem] flex flex-col gap-1"
      buttonTitle="Update"
      formSubmit={onUpdate}
    >
      <BaseInputField
        type="text"
        placeholder={type === 'email' ? 'Email' : 'Phone number'}
        name={type === 'email' ? 'email' : 'phone_number'}
        value={type === 'email' ? email : phone_number.replace(/[^0-9-]/g, '')}
        onChange={onChange}
      />
    </BaseForm>
  )
}

export default UserEmailOrPhoneForm
