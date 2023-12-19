import React from 'react'

import Typography from '@/components/elements/Typography/Typography'
import ProductCard from '@/components/modules/ProductCard/ProductCard'

const ProductsOnSale = ({ products }) => {
  return (
    <section className="my-14 flex flex-col gap-8">
      <Typography additionalClasses="text-2xl font-bold text-gray-800">Products on SALE</Typography>
      <div className="flex flex-row justify-center items-center gap-2 flex-wrap">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductsOnSale
