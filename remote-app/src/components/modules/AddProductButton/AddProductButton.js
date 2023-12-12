import React, { useContext } from 'react'

import setProductsInLocalStorage from './utils/setProductsInLocalStorage'
import addToBasketAPI from './utils/addToBasketAPI'
import { NotificationContext } from '@/store/NotificationContext'

const AddProductButton = ({ title, product, isLoggedIn }) => {
  const { showNotification } = useContext(NotificationContext)

  const addToBasket = async () => {
    const newPrice = product?.onSale
      ? (product.price - (product?.price * product.discount) / 100).toFixed(2)
      : product.price

    const productToBasket = {
      ...product,
      price: +newPrice,
    }
    if (!isLoggedIn) {
      setProductsInLocalStorage(productToBasket)
      showNotification({ message: 'Product added to basket!', type: 'success' })
    } else {
      await addToBasketAPI({ ...productToBasket, price: newPrice }, showNotification)
    }
  }

  return (
    <div
      className="border-2 border-slate-900 rounded-3xl text-slate-100 bg-slate-900 py-3 px-5 text-center cursor-pointer"
      onClick={addToBasket}
    >
      {title}
    </div>
  )
}

export default AddProductButton
