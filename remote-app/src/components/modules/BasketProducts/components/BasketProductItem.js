import React from 'react'
import Image from 'next/image'

import Typography from '@/components/elements/Typography/Typography'

import 'tailwindcss/tailwind.css'

const BasketProductItem = ({ product, deleteItemFromBasket, isLoggedIn, changeQuantity, saveForLaterItem }) => {
  return (
    <div
      key={product.id}
      className="flex flex-row items-center justify-between w-full"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <Image
            loading="eager"
            priority={true}
            src={product.image}
            alt={product.title}
            width={0}
            height={0}
            style={{ width: 'auto', height: '80px' }}
          />
          <div className="flex flex-col">
            <Typography additionalClasses="text-xs">{product.title}</Typography>
            <div className="flex gap-2 items-center">
              <p
                onClick={() => deleteItemFromBasket(product)}
                className="text-xs text-slate-500 cursor-pointer"
              >
                Delete
              </p>
              {isLoggedIn && (
                <div className="flex gap-2 items-center">
                  <span className="text-slate-500">|</span>
                  <p
                    onClick={() => saveForLaterItem(product)}
                    className="text-xs text-slate-500 cursor-pointer"
                  >
                    Save for later
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Typography additionalClasses="text-xs text-slate-900">€ {product.price}</Typography>
          <div className="flex gap-1 items-center">
            {product.quantity > 1 && (
              <p
                onClick={() => changeQuantity(product, 'minus')}
                className="bg-slate-500 text-white h-4 w-4 cursor-pointer flex items-center justify-center"
              >
                <span>-</span>
              </p>
            )}
            <Typography additionalClasses="text-xs text-slate-900">Qty: {product.quantity}</Typography>
            <p
              onClick={() => changeQuantity(product, 'plus')}
              className="bg-slate-500 text-white h-4 w-4 cursor-pointer flex items-center justify-center"
            >
              <span>+</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasketProductItem
