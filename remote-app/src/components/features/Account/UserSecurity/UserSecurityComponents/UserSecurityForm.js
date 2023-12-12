import React, { useState } from 'react'

import BaseForm from '@/components/elements/BaseForm/BaseForm'
import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'

import 'tailwindcss/tailwind.css'

const UserSecurityForm = ({ id }) => {
  const [userPassword, setUserPassword] = useState({
    actual_password: '',
    new_password: '',
    confirm_password: '',
  })

  const { actual_password, new_password, confirm_password } = userPassword

  const onChange = (e) => {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value,
    })
  }

  const updateUserPassword = () => {
    console.log('updateUserPassword', userPassword)

    setUserPassword({
      actual_password: '',
      new_password: '',
      confirm_password: '',
      email: '',
    })
  }

  return (
    <BaseForm
      formClass="max-w-[32rem] flex flex-col gap-1"
      buttonTitle="Update"
      formSubmit={updateUserPassword}
    >
      <BaseInputField
        type="password"
        placeholder="Current password"
        name="actual_password"
        value={actual_password}
        onChange={onChange}
      />
      <BaseInputField
        type="password"
        placeholder="New Password"
        name="new_password"
        value={new_password}
        onChange={onChange}
      />
      <BaseInputField
        type="password"
        placeholder="Confirm new password"
        name="confirm_password"
        value={confirm_password}
        onChange={onChange}
      />
    </BaseForm>
  )
}

export default UserSecurityForm
