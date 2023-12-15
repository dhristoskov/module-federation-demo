import React from 'react'

import 'tailwindcss/tailwind.css'

const BaseLink = ({ children, link, target }) => {
  return (
    <a
      href={link}
      target={target ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="text-slate-900 hover:text-slate-800 transition-colors duration-200"
    >
      {children}
    </a>
  )
}

export default BaseLink
