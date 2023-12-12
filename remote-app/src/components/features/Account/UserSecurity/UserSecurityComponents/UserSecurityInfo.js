import React from 'react'

import Typography from '@/components/elements/Typography/Typography'

import 'tailwindcss/tailwind.css'

const OPTIONS = [
  {
    id: 1,
    title: 'Email',
    subtitle: 'You can add, remove or change your email address here.',
    value: 'email',
    cta: 'Edit',
  },
  {
    id: 2,
    title: 'Phone number',
    subtitle: 'You can add, remove or change your phone number here.',
    value: 'phone_number',
    cta: 'Edit',
  },
  {
    id: 3,
    title: 'Password',
    subtitle: 'You can change your password here.',
    value: 'password',
    cta: 'Edit',
  },
  {
    id: 4,
    title: 'Report security problem',
    subtitle: 'You can report a security problem here.',
    value: 'report_problem',
    cta: 'Start',
  },
]

const UserSecurityInfo = ({ setSelected, userInfo }) => {
  return (
    <div className="md:w-6/12 w-full flex flex-col gap-2">
      {OPTIONS.map((option) => (
        <div
          key={option.id}
          onClick={() => setSelected(option.value)}
          className="flex item-center w-full justify-between shadow-xl border-2 border-slate-700 hover:bg-slate-400 rounded-xl cursor-pointer p-3"
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
