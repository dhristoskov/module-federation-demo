import React from 'react'

import 'tailwindcss/tailwind.css'

const Button = ({ href, disabled, variant, children, onClick, spacingTop, spacingBottom, fullWidth }) => {
  const top = spacingTop ? `mt-${spacingTop}` : ''
  const bottom = spacingBottom ? `mb-${spacingBottom}` : ''
  const variantClass = variant === 'primary' ? 'bg-slate-600 hover:bg-slate-900' : 'bg-gray-400 hover:bg-gray-500'
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
  const Tag = href ? 'a' : 'button'
  const fullWidthClass = fullWidth ? 'w-full' : 'w-auto'

  return (
    <Tag
      onClick={href ? null : onClick}
      href={href ? href : null}
      target={href ? '_blank' : null}
      disabled={disabled}
      className={`${top} ${bottom} ${variantClass} ${disabledClass} ${fullWidthClass} px-3 py-2 rounded-md text-white text-sm font-medium`}
    >
      {children}
    </Tag>
  )
}

export default Button
