import React from 'react'

import BaseIcon from '../BaseIcon/BaseIcon'
import Typography from '../Typography/Typography'

const BaseIconButton = ({ icon, size, onClick, title, onMouseEnter, onMouseLeave, buttonClassName }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex items-center gap-2 ${buttonClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <BaseIcon
        icon={icon}
        size={size}
      />
      {title && <Typography additionalClasses="text-sm font-bold">{title}</Typography>}
    </div>
  )
}

export default BaseIconButton
