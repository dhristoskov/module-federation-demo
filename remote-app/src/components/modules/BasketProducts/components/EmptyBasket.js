import React from 'react'

import Typography from '@/components/elements/Typography/Typography'

import 'tailwindcss/tailwind.css'

const EmptyBasket = ({ title, deselectTitle, onClick }) => {
  return (
    <div className="flex flex-col h-full min-h-[20rem] items-center justify-center gap-1 w-full">
      <Typography
        tag="h3"
        additionalClasses="text-sm font-bold"
      >
        {title}
      </Typography>
      <Typography additionalClasses="text-xs text-center">{deselectTitle}</Typography>
    </div>
  )
}

export default EmptyBasket
