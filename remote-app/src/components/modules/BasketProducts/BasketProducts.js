import React from 'react'

import EmptyBasket from './components/EmptyBasket'
import BasketProductsList from './components/BasketProductsList'

import 'tailwindcss/tailwind.css'

const BasketProducts = ({
  basket,
  children,
  isLoggedIn,
  removeAllBasketItems,
  deleteItemFromBasket,
  changeQuantity,
  saveForLaterItem,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-2 px-3">
      {basket?.products?.length === 0 && (
        <EmptyBasket
          title=" Your cart is epmpy"
          deselectTitle="Check your Saved or Favorites items or continue shopping."
        />
      )}
      {basket?.products?.length > 0 && (
        <BasketProductsList
          basket={basket}
          children={children}
          isLoggedIn={isLoggedIn}
          changeQuantity={changeQuantity}
          saveForLaterItem={saveForLaterItem}
          deleteItemFromBasket={deleteItemFromBasket}
          removeAllBasketItems={removeAllBasketItems}
        />
      )}
    </div>
  )
}

export default BasketProducts
