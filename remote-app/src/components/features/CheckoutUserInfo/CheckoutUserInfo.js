import React from 'react'

import CheckoutBuyerInfo from './components/CheckoutBuyerInfo'
import Typography from '@/components/elements/Typography/Typography'

import 'tailwindcss/tailwind.css'

const CheckoutUserInfo = () => {
  return (
    <div className="flex flex-col">
      <Typography additionalClasses="text-xl font-bold text-slate-900 mb-8">Personal and biling details:</Typography>
      <CheckoutBuyerInfo />
    </div>
  )
}

export default CheckoutUserInfo
