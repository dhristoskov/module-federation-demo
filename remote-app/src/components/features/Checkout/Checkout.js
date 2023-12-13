import React, { useEffect, useState, useContext } from 'react'

import Typography from '@/components/elements/Typography/Typography'
import BasketOverview from './components/BasketOverview'
import OptionsCheckoutTable from '@/components/modules/OptionsCheckoutTable/OptionsCheckoutTable'

import getBasketAPI from '../Basket/utils/getBasketAPI'
import deleteItemAPI from '../Basket/utils/deleteItemAPI'
import changeQuantityAPI from '../Basket/utils/changeQuantityAPI'

import getBasketFromLocalStorage from '../Basket/utils/getBasketFromLocalStorage'
import deleteItemLocalStorage from '../Basket/utils/deleteItemLocalStorage'
import changeQuantityLocalStorage from '../Basket/utils/changeQuantityLocalStorage'
import deleteOptionLocalStorage from '../Basket/utils/deleteOptionLocalStorage'

import { NotificationContext } from '@/store/NotificationContext'

import 'tailwindcss/tailwind.css'
import EmptyBasket from '@/components/modules/BasketProducts/components/EmptyBasket'

const Checkout = ({ isLoggedIn, setSelectedOptions, continueShopping, setIsBasketEmpty }) => {
  const { showNotification } = useContext(NotificationContext)
  const [recheckBasket, setRecheckBasket] = useState(false)
  const [basketItems, setBasketItems] = useState({
    products: [],
    options: [],
    totalPrice: 0,
    finalTotalPrice: 0,
  })

  const deleteItemFromBasket = async (product) => {
    if (!isLoggedIn) {
      deleteItemLocalStorage(product.id)
      setRecheckBasket(!recheckBasket)
      showNotification({ message: 'Item was deleted!', type: 'success' })
    } else {
      await deleteItemAPI(product._id, showNotification, setRecheckBasket)
    }
  }

  const deleteOptionFromBasket = async (option) => {
    deleteOptionLocalStorage(option.id)
    setRecheckBasket(!recheckBasket)
    showNotification({ message: 'Option was deleted!', type: 'success' })
  }

  const changeQuantity = async (product, direction) => {
    if (!isLoggedIn) {
      changeQuantityLocalStorage(product, direction)
      setRecheckBasket(!recheckBasket)
      direction === 'plus'
        ? showNotification({ message: 'Quantity was increased!', type: 'success' })
        : showNotification({ message: 'Quantity was decreased!', type: 'success' })
      return
    } else {
      await changeQuantityAPI(product._id, direction, showNotification, setRecheckBasket)
    }
  }

  useEffect(() => {
    window.addEventListener('addOption', () => {
      setRecheckBasket(true)
    })
    return () => {
      window.removeEventListener('addOption', () => {})
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      getBasketFromLocalStorage(setBasketItems, setRecheckBasket)
    } else {
      getBasketAPI(setBasketItems, showNotification, setRecheckBasket)
    }
  }, [recheckBasket])

  useEffect(() => {
    const selectedOptionsIds = basketItems?.options?.map((option) => option.id) || []
    setSelectedOptions(selectedOptionsIds)
    setIsBasketEmpty(basketItems?.products?.length === 0)
  }, [basketItems])

  return (
    <section className="flex flex-col">
      <Typography additionalClasses="text-xl font-bold text-slate-900 mb-6">In your Cart:</Typography>
      <div className="flex flex-col gap-3">
        {basketItems?.products?.length == 0 && (
          <div className="max-w-[38rem]">
            <EmptyBasket
              title=" Your cart is epmpy"
              deselectTitle="Check your Saved or Favorites items or continue shopping."
              buttonTitle="Continue Shopping"
              onClick={continueShopping}
            />
          </div>
        )}
        {basketItems?.products?.length > 0 &&
          basketItems?.products?.map((product) => (
            <BasketOverview
              key={product.id}
              product={product}
              changeQuantity={changeQuantity}
              deleteItemFromBasket={deleteItemFromBasket}
            />
          ))}
      </div>
      <div className="flex flex-row justify-between items-center w-full max-w-[38rem] mt-10 border-t-2 border-slate-900 pt-2">
        <Typography additionalClasses="text-md text-slate-500">
          {basketItems?.finalTotalPrice > 0 && basketItems?.products.length > 0 ? 'Cart Sub-Total' : 'Cart Total'}
        </Typography>
        <Typography additionalClasses="text-md font-bold text-slate-900">€ {basketItems?.totalPrice}</Typography>
      </div>
      {basketItems?.options?.length > 0 && basketItems?.finalTotalPrice > 0 && basketItems?.products.length > 0 && (
        <OptionsCheckoutTable
          options={basketItems?.options}
          price={basketItems?.finalTotalPrice}
          deleteOptionFromBasket={deleteOptionFromBasket}
        />
      )}
    </section>
  )
}

export default Checkout
