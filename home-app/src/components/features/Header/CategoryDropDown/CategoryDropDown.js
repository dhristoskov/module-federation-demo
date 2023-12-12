import React, { useState } from 'react'
import Image from 'next/image'

import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'

const categorie = [
  {
    id: 1,
    title: 'Bunny',
    image: 'https://dearbear.eu/wp-content/uploads/2019/08/7893-324x324.jpg',
    link: '/products/bunny',
  },
  {
    id: 2,
    title: 'Dino',
    image: 'https://dearbear.eu/wp-content/uploads/2021/07/dino-zblizenie-324x324.jpg',
    link: '/products/dino',
  },
  {
    id: 3,
    title: 'Dog and cats',
    image:
      'https://dearbear.eu/wp-content/uploads/2023/08/livlig-pluszak-pies-siberian-husky__0396078_pe562358_s5-768x768.jpg',
    link: '/products/dog-and-cats',
  },
  {
    id: 4,
    title: 'Elephant',
    image: 'https://dearbear.eu/wp-content/uploads/2018/11/8999-324x324.jpg',
    link: '/products/elephant',
  },
  {
    id: 5,
    title: 'Giraffe',
    image: 'https://dearbear.eu/wp-content/uploads/2021/07/9723-324x324.jpg',
    link: '/products/giraffe',
  },
  {
    id: 6,
    title: 'Koala',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/Koala-160-324x324.jpg',
    link: '/products/koala',
  },
  {
    id: 7,
    title: 'Monkey',
    image: 'https://dearbear.eu/wp-content/uploads/2023/04/7-324x324.jpg',
    link: '/products/monkey',
  },
  {
    id: 8,
    title: 'Panda',
    image: 'https://dearbear.eu/wp-content/uploads/2018/11/8862-324x324.jpg',
    link: '/products/panda',
  },
]

const CategoryDropDown = () => {
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
          {categorie.map((category) => (
            <div
              key={category.id}
              onClick={() => console.log(category.link)}
              className="transition-colors duration-150 ease-in-out hover:bg-slate-400"
            >
              <div className="flex gap-3 items-center px-3">
                <Image
                  loading="eager"
                  priority={true}
                  src={category.image}
                  alt={category.title}
                  width={0}
                  height={0}
                  style={{ width: 'auto', height: '60px' }}
                />
                <p className="text-sm font-bold text-slate-900">{category.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryDropDown
