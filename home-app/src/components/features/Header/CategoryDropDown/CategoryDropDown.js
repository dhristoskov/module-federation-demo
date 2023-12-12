import React, { useState } from 'react'
import Image from 'next/image'

import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'

const CategoryDropDown = ({ categories }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className="hidden sm:flex item-center gap-1 cursor-pointer min-w-[2rem] relative">
      <BaseIconButton
        size="md"
        icon="hamburge-menu"
        onClick={toggleOpen}
        onMouseEnter={() => setOpen(true)}
      />
      <p
        onClick={toggleOpen}
        onMouseEnter={() => setOpen(true)}
        className="hidden lg:block text-md font-bold text-blue-900"
      >
        Category
      </p>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          id="drop-down-container"
          className="absolute border-2 border-slate-200 w-full shadow-2xl z-20 top-9 left-0 bg-white min-w-[15rem] flex flex-col gap-3"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => {}}
              className="transition-colors duration-150 ease-in-out hover:bg-slate-400"
            >
              <div className="flex gap-3 items-center px-3">
                <Image
                  loading="eager"
                  priority={true}
                  src={category.attributes.image}
                  alt={category.attributes.title}
                  width={0}
                  height={0}
                  style={{ width: 'auto', height: '60px' }}
                />
                <p className="text-sm font-bold text-slate-900">{category.attributes.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryDropDown
