const setProductsInLocalStorage = (product) => {
  const basket = JSON.parse(localStorage.getItem('basket'))
  if (!basket) {
    const products = [{ ...product, quantity: 1 }]
    const totalPrice = product.price.toFixed(2)
    const basket = {
      products,
      totalPrice,
    }
    localStorage.setItem('basket', JSON.stringify(basket))
  }

  if (basket) {
    const productIndex = basket.products.findIndex((p) => p.id === product.id)
    if (productIndex !== -1) {
      const productToUpdate = (basket.products[productIndex].quantity += 1)
      const oldProductPrice = parseFloat(basket.products[productIndex].price)
      const productPriceToUpdate = (oldProductPrice + product.price).toFixed(2)
      const oldTotalPrice = parseFloat(basket.totalPrice)
      const newTotalPrice = (oldTotalPrice + product.price).toFixed(2)
      localStorage.setItem(
        'basket',
        JSON.stringify({
          ...basket,
          products: [
            ...basket.products.slice(0, productIndex),
            { ...basket.products[productIndex], quantity: productToUpdate, price: productPriceToUpdate },
            ...basket.products.slice(productIndex + 1),
          ],
          totalPrice: newTotalPrice,
        }),
      )
    }

    if (productIndex === -1) {
      const products = [...basket.products, { ...product, quantity: 1 }]
      const oldTotalPrice = parseFloat(basket.totalPrice)
      const newTotalPrice = (oldTotalPrice + product.price).toFixed(2)
      localStorage.setItem(
        'basket',
        JSON.stringify({
          products,
          totalPrice: newTotalPrice,
        }),
      )
    }
  }
}

export default setProductsInLocalStorage
