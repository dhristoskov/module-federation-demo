const changeQuantityLocalStorage = (product, direction) => {
  const basket = JSON.parse(localStorage.getItem('basket'))
  if (!basket) return

  const productIndex = basket.products.findIndex((p) => p.id === product.id)
  const productToChange = basket.products[productIndex]
  const oldTotalPrice = parseFloat(basket.totalPrice)
  const productPrice = product.quantity > 1 ? +(product.price / product.quantity).toFixed(2) : +product.price
  let newTotalPrice = 0
  let newQuantity = 0
  let productNewPrice = 0

  if (direction === 'plus') {
    newQuantity = productToChange.quantity + 1
    productNewPrice = (parseFloat(productToChange.price) + productPrice).toFixed(2)
    newTotalPrice = (oldTotalPrice + productPrice).toFixed(2)
  } else {
    newQuantity = productToChange.quantity - 1
    productNewPrice = (parseFloat(productToChange.price) - productPrice).toFixed(2)
    newTotalPrice = (oldTotalPrice - productPrice).toFixed(2)
  }

  localStorage.setItem(
    'basket',
    JSON.stringify({
      ...basket,
      products: [
        ...basket.products.slice(0, productIndex),
        {
          ...productToChange,
          price: productNewPrice,
          quantity: newQuantity,
        },
        ...basket.products.slice(productIndex + 1),
      ],
      totalPrice: newTotalPrice,
    }),
  )
}

export default changeQuantityLocalStorage
