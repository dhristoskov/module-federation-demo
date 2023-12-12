import React from 'react'

import BasketProductItem from './BasketProductItem'
import Typography from '@/components/elements/Typography/Typography'

import 'tailwindcss/tailwind.css'

const BasketProductsList = ({
  basket,
  children,
  isLoggedIn,
  removeAllBasketItems,
  changeQuantity,
  deleteItemFromBasket,
  saveForLaterItem,
}) => {
  return (
    <div className="w-full h-full flex flex-col item-center py-2 px-3">
      <div className="mb-5">
        <Typography
          tag="h5"
          additionalClasses="text-lg font-bold"
        >
          Shopping Cart
        </Typography>
        <p
          onClick={removeAllBasketItems}
          className="text-sm text-slate-500 cursor-pointer"
        >
          Deselect all items
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {basket?.products?.map((product) => (
          <BasketProductItem
            key={product.id}
            product={product}
            isLoggedIn={isLoggedIn}
            changeQuantity={changeQuantity}
            saveForLaterItem={saveForLaterItem}
            deleteItemFromBasket={deleteItemFromBasket}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between items-center w-full mt-5 border-t-2 border-slate-900 pt-2">
        <Typography additionalClasses="text-sm text-slate-500">Total</Typography>
        <Typography additionalClasses="text-sm text-slate-900">€ {basket.totalPrice}</Typography>
      </div>
      {children}
    </div>
  )
}

export default BasketProductsList
