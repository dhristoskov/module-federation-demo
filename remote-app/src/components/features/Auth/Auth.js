import React, { useState } from 'react'

import LoginCard from './LoginCard/LoginCard'
import RegisterCard from './RegisterCard/RegisterCard'

import 'tailwindcss/tailwind.css'

const Auth = () => {
  const [selected, setSelected] = useState('login')

  const defaultButton = 'bg-slate-600 text-white'
  const selectedButton = 'bg-white text-slate-600'

  const onSectionSelect = (section) => {
    setSelected(section)
  }

  return (
    <div>
      <div className="flex w-full">
        <p
          onClick={() => onSectionSelect('login')}
          className={`w-1/2 p-3 flex items-center justify-center cursor-pointer ${
            selected === 'login' ? selectedButton : defaultButton
          }`}
        >
          Sign In
        </p>
        <p
          onClick={() => onSectionSelect('register')}
          className={`w-1/2 p-3 flex items-center justify-center cursor-pointer ${
            selected === 'register' ? selectedButton : defaultButton
          }`}
        >
          Register
        </p>
      </div>
      {selected === 'login' && <LoginCard />}
      {selected === 'register' && <RegisterCard />}
    </div>
  )
}

export default Auth
