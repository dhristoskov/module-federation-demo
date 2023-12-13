import React from 'react'

import Typography from '@/components/elements/Typography/Typography'

import 'tailwindcss/tailwind.css'

const EmptyBasket = ({ title, deselectTitle, onClick, buttonTitle }) => {
  return (
    <div className="flex flex-col h-full min-h-[20rem] items-center justify-center gap-1 w-full">
      <Typography
        tag="h3"
        additionalClasses="text-sm font-bold"
      >
        {title}
      </Typography>
      <Typography additionalClasses="text-xs text-center">{deselectTitle}</Typography>
      {onClick && buttonTitle && (
        <p
          className="border-2 border-slate-900 rounded-3xl text-slate-100 bg-slate-900 py-2 px-4 text-center cursor-pointer mt-6"
          onClick={onClick}
        >
          {buttonTitle}
        </p>
      )}
    </div>
  )
}

export default EmptyBasket
