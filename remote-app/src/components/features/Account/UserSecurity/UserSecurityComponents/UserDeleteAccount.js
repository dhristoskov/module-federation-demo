import React, { useState } from 'react'

import BaseForm from '@/components/elements/BaseForm/BaseForm'
import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'
import addNotification from '@/components/features/Basket/utils/addNotification'
import deleteUserAccountAPI from '../../utils/deleteUserAccountAPI'
import useAuth from '@/hooks/useAuth'

import 'tailwindcss/tailwind.css'

const UserDeleteAccount = () => {
  const { token } = useAuth()
  const [confirmPassword, setConfirmPassword] = useState('')

  const passwordValidation = {
    value: confirmPassword,
    validators: [{ validator: 'minLength', minLength: 6, message: 'Password must be at least 6 characters long' }],
  }

  const deleteUserAccount = async () => {
    // setConfirmPassword('')
    // const event = new CustomEvent('logout')
    // window.dispatchEvent(event)

    await deleteUserAccountAPI(confirmPassword, token, addNotification)
  }

  return (
    <BaseForm
      formClass="xs:w-full md:max-w-[32rem] flex flex-col gap-1"
      buttonTitle="Delete account"
      formSubmit={deleteUserAccount}
    >
      <BaseInputField
        type="password"
        placeholder="Add your password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        validation={passwordValidation}
      />
    </BaseForm>
  )
}

export default UserDeleteAccount
