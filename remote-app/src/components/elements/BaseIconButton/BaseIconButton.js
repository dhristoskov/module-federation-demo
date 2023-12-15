import React from 'react'

import BaseIcon from '../BaseIcon/BaseIcon'

import 'tailwindcss/tailwind.css'

const BaseIconButton = ({ icon, size, onClick, onMouseEnter, onMouseLeave, buttonClassName }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${buttonClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <BaseIcon
        icon={icon}
        size={size}
      />
    </div>
  )
}

export default BaseIconButton
