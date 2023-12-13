import React from 'react'
import Link from 'next/link'

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
    title: 'Gift Cards & Top Up',
    description: 'View balance or redeem a card and purchase a new Gift Card',
    icon: 'coin',
    slug: 'gift-cards',
  },
  {
    id: 6,
    title: 'Message Centre',
    description: 'View or respond to messages from Sellers and Buyers',
    icon: 'mail',
    slug: 'messages',
  },
  {
    id: 7,
    title: 'Contact Us',
    description: 'Browse self service options, help articles or contact us',
    icon: 'headphone',
    slug: 'contact',
  },
  {
    id: 8,
    title: 'Your Favorites',
    description: 'View, modify and share your favorites',
    icon: 'heart',
    slug: 'favorites',
  },
  {
    id: 9,
    title: 'Mobile App',
    description: 'Download the our App',
    icon: 'phone-holding',
    slug: 'mobile-app',
  },
]

const AccountView = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-[8rem]">
      {ACCOUNT_VIEW_DATA.map((item) => (
        <Link
          key={item.id}
          href={{ pathname: `/account-settings/`, query: { option: item.slug } }}
          className="flex items-center justify-between border-2 border-slate-900 p-8 shadow-xl rounded-2xl hover:bg-slate-200"
        >
          <div className="flex items-center gap-5">
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
        </Link>
      ))}
    </div>
  )
}

export default AccountView
