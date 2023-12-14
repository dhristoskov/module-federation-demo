import React from 'react'

import BaseIcon from '@/components/elements/BaseIcon/BaseIcon'
import Typography from '@/components/elements/Typography/Typography'

const ACCOUNT_VIEW_DATA = [
  {
    id: 1,
    title: 'Your Orders',
    description: 'Track, return, cancel an order, download invoice',
    icon: 'package',
    slug: 'orders',
  },
  {
    id: 2,
    title: 'Login & Security',
    description: 'Edit name, email and password',
    icon: 'lock',
    slug: 'security',
  },
  {
    id: 3,
    title: 'Your Addresses',
    description: 'Edit, remove or set default address',
    icon: 'map-marker',
    slug: 'addresses',
  },
  {
    id: 4,
    title: 'Your Payments',
    description: 'View all transactions, manage payment methods and settings',
    icon: 'money-stack',
    slug: 'payments',
  },
  {
    id: 5,
    title: 'Message Centre',
    description: 'View or respond to messages from Sellers and Buyers',
    icon: 'mail',
    slug: 'messages',
  },
  {
    id: 6,
    title: 'Your Favorites',
    description: 'View, modify and share your favorites',
    icon: 'heart',
    slug: 'favorites',
  },
]

const AccountView = ({ setSelected }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {ACCOUNT_VIEW_DATA.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelected(item.slug)}
          className="flex items-center justify-between border-2 border-slate-900 p-4 shadow-xl rounded-2xl hover:bg-slate-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <BaseIcon
                icon={item.icon}
                size="3xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography
                tag="h3"
                additionalClasses="text-lg font-bold text-gray-800"
              >
                {item.title}
              </Typography>
              <Typography additionalClasses="text-sm font-semibold text-gray-500">{item.description}</Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AccountView
