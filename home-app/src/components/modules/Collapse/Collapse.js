import React, { useState } from 'react'

import BaseIcon from '@/components/elements/BaseIcon/BaseIcon'
import Typography from '@/components/elements/Typography/Typography'

const Collapse = ({ tag, title, type, children }) => {
  const [open, setOpen] = useState(false)

  const icons = {
    default: open ? 'minus' : 'plus',
    chevron: open ? 'chevron-up' : 'chevron-down',
  }

  return (
    <div className="flex flex-col gap-3">
      <Typography
        tag={tag || 'h3'}
        additionalClasses="text-md sm:text-lg sm:font-bold bg-slate-200 p-2 rounded-3xl"
      >
        <div
          className="flex justify-between w-full items-center px-3 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {title}
          <BaseIcon
            size="xl"
            icon={icons[type] || 'plus'}
            additionalClasses="min-w-[1.6rem] min-h-[1.6rem]"
          />
        </div>
      </Typography>
      {open && <Typography additionalClasses="xs:text-sm sm:text-md px-2 sm:px-5">{children}</Typography>}
    </div>
  )
}

export default Collapse
