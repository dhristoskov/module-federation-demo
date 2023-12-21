import React, { useState } from 'react'
import axios from '@/axios'

import BaseInputField from '@/components/elements/BaseInputField/BaseInputField'
import BaseForm from '@/components/elements/BaseForm/BaseForm'
import addNotification from '../../Basket/utils/addNotification'
import login from '../utils/login'

import 'tailwindcss/tailwind.css'

const RegisterCard = () => {
  const [user, setUser] = useState({
    user_name: '',
    password: '',
    firstname: '',
    lastname: '',
  })

  const firstNameValidation = {
    value: user.firstname,
    validators: [{ validator: 'isAlphabetical', message: 'First name must be alphabetical' }],
  }

  const lastNameValidation = {
    value: user.lastname,
    validators: [{ validator: 'isAlphabetical', message: 'Last name must be alphabetical' }],
  }

  const userNameValidation = {
    value: user.user_name,
    validators: [{ validator: 'minLength', minLength: 3, message: 'Username must be at least 3 characters long' }],
  }

  const passwordValidation = {
    value: user.password,
    validators: [{ validator: 'minLength', minLength: 6, message: 'Password must be at least 6 characters long' }],
  }

  const { user_name, password, firstname, lastname } = user

  const onUserRegistrationChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onRegister = async () => {
    if (!user_name || !password || !firstname || !lastname) {
      return
    }

    const data = {
      username: user_name,
      password,
      first_name: firstname,
      last_name: lastname,
    }

    try {
      const res = await axios.post('/user/register', data, {
        'Content-Type': 'application/json',
      })

      const { token, first_name, last_name, username, id } = res.data
      const user = {
        id,
        username,
        first_name,
        last_name,
      }

      const rememberMe = false
      login(token, user, rememberMe)
      addNotification({ message: `User ${username} registered!`, type: 'success' })

      setUser({
        user_name: '',
        password: '',
        firstname: '',
        lastname: '',
      })
    } catch (err) {
      addNotification({ message: err?.response?.data?.message, type: 'error' })
    }
  }

  return (
    <BaseForm
      buttonTitle="Register"
      formSubmit={onRegister}
      formClass="flex w-full flex-col items-center gap-1 p-4"
    >
      <div className="w-full flex flex-col gap-2 text-neutral-500 mb-2">
        <p className="text-2xl font-semibold">Create your account</p>
        <p className="text-md font-bold">Registration is easy</p>
      </div>
      <BaseInputField
        placeholder="First name"
        helpMessage="Help message"
        onChange={onUserRegistrationChange}
        value={firstname}
        name="firstname"
        validation={firstNameValidation}
      />
      <BaseInputField
        placeholder="Last name"
        helpMessage="Help message"
        onChange={onUserRegistrationChange}
        value={lastname}
        name="lastname"
        validation={lastNameValidation}
      />
      <BaseInputField
        placeholder="Username"
        helpMessage="Help message"
        onChange={onUserRegistrationChange}
        value={user_name}
        name="user_name"
        validation={userNameValidation}
      />
      <BaseInputField
        placeholder="Password"
        type="password"
        helpMessage="Help message"
        onChange={onUserRegistrationChange}
        value={password}
        name="password"
        validation={passwordValidation}
      />
      <p className="cursor-pointer text-sm mb-3">
        We may send you communications; you may change your preferences in your account settings. We'll never post
        without your permission.
      </p>
    </BaseForm>
  )
}

export default RegisterCard
