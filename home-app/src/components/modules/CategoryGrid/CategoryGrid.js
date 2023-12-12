import React, { useState } from 'react'
import Image from 'next/image'

import Typography from '@/components/elements/Typography/Typography'

const CategoryGrid = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative cursor-pointer hover:shadow-2xl shadow-slate-500"
        >
          <Image
            src={category.image}
            alt={category.title}
            loading="eager"
            priority={true}
            width={0}
            height={0}
            className="rounded-md"
            style={{ width: '324px', height: '324px%' }}
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <Typography
              variant="h6"
              additionalClasses="text-2xl font-bold font-slate-900 text-center"
            >
              {category.title}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryGrid
