import React from 'react'

import Typography from '@/components/elements/Typography/Typography'

import 'tailwindcss/tailwind.css'

const OPTIONS = [
  {
    id: 1,
    title: 'Email',
    subtitle: 'You can add, remove or change your email address here for security reasons .',
    value: 'email',
    cta: 'Edit',
  },
  {
    id: 2,
    title: 'Phone number',
    subtitle: 'You can add, remove or change your phone number for security reasons or change of device.',
    value: 'phone_number',
    cta: 'Edit',
  },
  {
    id: 3,
    title: 'Password',
    subtitle: 'You can change your password for security reasons or reset it',
    value: 'password',
    cta: 'Edit',
  },
  {
    id: 4,
    title: 'Permanently remove your account',
    subtitle: 'When you delete your account, your profile, basket, addresses and orders will be permanently removed. ',
    value: 'delete_account',
    cta: 'Delete',
  },
]

const UserSecurityInfo = ({ setSelected, userInfo }) => {
  return (
    <div className="md:w-6/12 w-full flex flex-col gap-2">
      {OPTIONS.map((option) => (
        <div
          key={option.id}
          onClick={() => setSelected(option.value)}
          className="flex item-center w-full justify-between shadow-xl border-2 border-slate-700 hover:bg-slate-400 rounded-xl cursor-pointer p-3 min-h-[6rem]"
        >
          <div className='flex flex-col gap-1'>
            <Typography additionalClasses="text-sm font-bold text-slate-700">
              {option.title}: {userInfo[option.value]}
            </Typography>
            <Typography additionalClasses="text-xz text-slate-500">
              {option.subtitle}
            </Typography>
          </div>
          <Typography additionalClasses="text-sm font-bold text-slate-700 hover:text-slate-900">
            {option.cta}
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default UserSecurityInfo
