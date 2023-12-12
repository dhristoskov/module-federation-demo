import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import Typography from '@/components/elements/Typography/Typography'

const AddProductButton = dynamic(() => import('remote/AddProductButton'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const ProductCard = ({ product, isLoggedIn }) => {
  const newPrice = product.onSale
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price
  const additionalClasses = product.onSale ? 'text-xs font-bold line-through' : 'text-sm font-bold'

  return (
    <div>
      <div className="relative hover:shadow-2xl hover:scale-[1.03] w-fit p-4 cursor-pointer rounded-2xl flex flex-col items-center gap-2 min-w-[16rem]">
        <p className="absolute top-7 right-7 text-xs text-slate-500 cursor-pointer hover:text-slate-900 hover:border-slate-900 border-2 border-slate-500 px-1">
          favorite
        </p>
        <Image
          loading="eager"
          priority={true}
          src={product.image}
          alt={product.title}
          width={0}
          height={0}
          style={{ width: 'auto', height: '250px' }}
        />
        <div>
          {product.onSale && (
            <Typography additionalClasses="text-xs text-white border-2 border-slate-900 bg-slate-900 p-1 absolute left-8 bottom-[10rem]">
              Sale: {product.discount}%
            </Typography>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <Typography additionalClasses="text-md">{product.title}</Typography>
          <div className="flex items-center gap-2">
            <Typography additionalClasses={additionalClasses}>€ {product.price} </Typography>
            {product.onSale && <Typography additionalClasses="text-sm font-bold">€ {newPrice}</Typography>}
          </div>
        </div>
        <AddProductButton
          title="Add to cart"
          isLoggedIn={isLoggedIn}
          product={product}
        />
      </div>
    </div>
  )
}

export default ProductCard
