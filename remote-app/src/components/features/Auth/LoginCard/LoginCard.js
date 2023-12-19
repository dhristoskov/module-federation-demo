import React, { useState } from 'react'
import axios from '@/axios'

import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'
import BaseForm from '@/components/elements/BaseForm/BaseForm'
import addNotification from '../../Basket/utils/addNotification'
import login from '../utils/login'

import 'tailwindcss/tailwind.css'

const LoginCard = () => {
  const [user_name, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    if (!user_name || !password) {
      return
    }

    const data = {
      username: user_name,
      password,
    }

    try {
      const res = await axios.post('/user/login', data, {
        'Content-Type': 'application/json',
      })

      const { token, first_name, last_name, username, id } = res.data
      const user = {
        id,
        username,
        first_name,
        last_name,
      }

      login(token, user)
      addNotification({ message: `User ${username} logged in!`, type: 'success' })

      setUsername('')
      setPassword('')
    } catch (err) {
      addNotification({ message: err?.response?.data?.message, type: 'error' })
    }
  }

  return (
    <BaseForm
      buttonTitle="Log-in"
      formSubmit={onLogin}
      formClass="flex w-full flex-col items-center gap-1 p-4 mt-5"
    >
      <BaseInputField
        placeholder="Username"
        helpMessage="Help message"
        onChange={(e) => setUsername(e.target.value)}
        value={user_name}
      />
      <BaseInputField
        placeholder="Password"
        type="password"
        helpMessage="Help message"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        value={password}
      />
      <div className="flex items-center justify-between w-full my-3">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            value=""
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="text-sm font-bold">Stay signed in</p>
        </div>
        <p className="cursor-pointer text-sm font-bold text-neutral-500 hover:text-neutral-900 underline">
          Forgot your password?
        </p>
      </div>
      <p className="cursor-pointer text-sm mb-3">
        We may send you communications; you may change your preferences in your account settings. We'll never post
        without your permission.
      </p>
    </BaseForm>
  )
}

export default LoginCard
