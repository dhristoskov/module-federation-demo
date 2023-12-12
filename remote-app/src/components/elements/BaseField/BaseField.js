import React from 'react'

import Typography from '../Typography/Typography'

import 'tailwindcss/tailwind.css'

const BaseField = ({ label, helpMessage, errorMessage, openMessage, children }) => {
  return (
    <div className="flex flex-col w-full relative">
      {label && (
        <Typography
          spacingBottom="mb-2"
          additionalClasses="text-xs text-slate-500"
        >
          {label}
        </Typography>
      )}
      {children}
      <div className="min-h-[1.5rem] w-full flex items-center">
        {helpMessage && openMessage && !errorMessage && (
          <Typography additionalClasses="text-xs text-slate-400">{helpMessage}</Typography>
        )}
        {errorMessage && <Typography additionalClasses="text-xs text-red-500">{errorMessage}</Typography>}
      </div>
    </div>
  )
}

export default BaseField
