import React, { useEffect, useState } from 'react'

import useAuth from '@/hooks/useAuth'

import getBasketAPI from './utils/getBasketAPI'
import deleteItemAPI from './utils/deleteItemAPI'
import changeQuantityAPI from './utils/changeQuantityAPI'
import removeAllBasketItemsAPI from './utils/removeAllBasketItemsAPI'

import BasketProducts from '@/components/modules/BasketProducts/BasketProducts'
import deleteItemLocalStorage from './utils/deleteItemLocalStorage'
import changeQuantityLocalStorage from './utils/changeQuantityLocalStorage'
import getBasketFromLocalStorage from './utils/getBasketFromLocalStorage'
import addNotification from './utils/addNotification'

import 'tailwindcss/tailwind.css'

const Basket = ({ children }) => {
  const { isLoggedIn } = useAuth()
  const [recheckBasket, setRecheckBasket] = useState(false)
  const [basketItems, setBasketItems] = useState({
    products: [],
    options: [],
    totalPrice: 0,
    finalTotalPrice: 0,
  })

  const removeAllBasketItems = async () => {
    if (!isLoggedIn) {
      localStorage.removeItem('basket')
      setBasketItems({
        products: [],
        options: [],
        totalPrice: 0,
        finalTotalPrice: 0,
      })
      addNotification({ message: 'All basket items was removed!', type: 'success' })
    } else {
      await removeAllBasketItemsAPI(addNotification, setRecheckBasket)
    }
  }

  const deleteItemFromBasket = async (product) => {
    if (!isLoggedIn) {
      deleteItemLocalStorage(product.id)
      setRecheckBasket(!recheckBasket)
      addNotification({ message: 'Item was deleted!', type: 'success' })
    } else {
      await deleteItemAPI(product._id, addNotification, setRecheckBasket)
    }
  }

  const changeQuantity = async (product, direction) => {
    if (!isLoggedIn) {
      changeQuantityLocalStorage(product, direction)
      setRecheckBasket(!recheckBasket)
      direction === 'plus'
        ? addNotification({ message: 'Quantity was increased!', type: 'success' })
        : addNotification({ message: 'Quantity was decreased!', type: 'success' })
      return
    } else {
      await changeQuantityAPI(product._id, direction, addNotification, setRecheckBasket)
    }
  }

  const saveForLaterItem = (product) => {
    console.log(product)
  }

  useEffect(() => {
    if(isLoggedIn === null) return
    if (!isLoggedIn) {
      getBasketFromLocalStorage(setBasketItems, setRecheckBasket)
    } else {
      getBasketAPI(setBasketItems, addNotification, setRecheckBasket)
    }
  }, [recheckBasket, isLoggedIn])
  
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
