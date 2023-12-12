import React from 'react'

import CategoryGrid from '@/components/modules/CategoryGrid/CategoryGrid'
import Typography from '@/components/elements/Typography/Typography'

const Category = ({categories}) => {
  return (
    <div className="my-16 flex flex-col gap-8">
      <Typography
        variant="h4"
        additionalClasses="text-2xl font-bold"
      >
        Our product categories
      </Typography>
      <CategoryGrid categories={categories} />
    </div>
  )
}

export default Category
