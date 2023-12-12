import React, { useEffect, useState, useContext } from 'react'

import getBasketAPI from './utils/getBasketAPI'
import deleteItemAPI from './utils/deleteItemAPI'
import changeQuantityAPI from './utils/changeQuantityAPI'
import removeAllBasketItemsAPI from './utils/removeAllBasketItemsAPI'

import BasketProducts from '@/components/modules/BasketProducts/BasketProducts'
import deleteItemLocalStorage from './utils/deleteItemLocalStorage'
import changeQuantityLocalStorage from './utils/changeQuantityLocalStorage'
import getBasketFromLocalStorage from './utils/getBasketFromLocalStorage'

import { NotificationContext } from '@/store/NotificationContext'

import 'tailwindcss/tailwind.css'

const Basket = ({ isLoggedIn, children }) => {
  const { showNotification } = useContext(NotificationContext)
  const [recheckBasket, setRecheckBasket] = useState(false)
  const [basketItems, setBasketItems] = useState({
    products: [],
    totalPrice: 0,
  })

  const removeAllBasketItems = async () => {
    if (!isLoggedIn) {
      localStorage.removeItem('basket')
      setBasketItems({
        products: [],
        totalPrice: 0,
      })
      showNotification({ message: 'All basket items was removed!', type: 'success' })
    } else {
      await removeAllBasketItemsAPI(showNotification, setRecheckBasket)
    }
  }

  const deleteItemFromBasket = async (product) => {
    if (!isLoggedIn) {
      deleteItemLocalStorage(product.id)
      setRecheckBasket(!recheckBasket)
      showNotification({ message: 'Item was deleted!', type: 'success' })
    } else {
      await deleteItemAPI(product._id, showNotification, setRecheckBasket)
    }
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

  const saveForLaterItem = (product) => {
    console.log(product)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      getBasketFromLocalStorage(setBasketItems, setRecheckBasket)
    } else {
      getBasketAPI(setBasketItems, showNotification, setRecheckBasket)
    }
  }, [recheckBasket])

  return (
    <BasketProducts
      children={children}
      basket={basketItems}
      isLoggedIn={isLoggedIn}
      changeQuantity={changeQuantity}
      saveForLaterItem={saveForLaterItem}
      deleteItemFromBasket={deleteItemFromBasket}
      removeAllBasketItems={removeAllBasketItems}
    />
  )
}

export default Basket
