import React from 'react'
import Image from 'next/image'

import Typography from '@/components/elements/Typography/Typography'

const BasketOverview = ({ product, deleteItemFromBasket, changeQuantity }) => {
  return (
    <div className="w-full max-w-[38rem] flex justify-between items-center py-2 px-4 gap-4 shadow-xl">
      <Image
        loading="eager"
        priority={true}
        src={product.image}
        alt={product.title}
        width={0}
        height={0}
        style={{ width: 'auto', height: '150px' }}
      />
      <div className="flex items-center justify-between w-[65%]">
        <div className="flex flex-col gap-2">
          <Typography additionalClasses="text-md font-bold">{product.title}</Typography>
          <p
            onClick={() => deleteItemFromBasket(product)}
            className="text-sm text-red-700 cursor-pointer"
          >
            Delete Item
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Typography additionalClasses="text-md font-bold text-slate-900">€ {product.price}</Typography>
          <div className="flex gap-2 items-center">
            {product.quantity > 1 && (
              <p
                onClick={() => changeQuantity(product, 'minus')}
                className="bg-slate-500 text-white h-[1.25rem] w-[1.25rem] cursor-pointer flex items-center justify-center"
              >
                <span>-</span>
              </p>
            )}
            <Typography additionalClasses="text-md text-slate-900">Qty: {product.quantity}</Typography>
            <p
              onClick={() => changeQuantity(product, 'plus')}
              className="bg-slate-500 text-white h-[1.25rem] w-[1.25rem] cursor-pointer flex items-center justify-center"
            >
              <span>+</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasketOverview
