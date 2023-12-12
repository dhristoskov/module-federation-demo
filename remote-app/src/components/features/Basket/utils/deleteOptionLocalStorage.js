const deleteOptionLocalStorage = (id) => {
  const basket = JSON.parse(localStorage.getItem('basket'))
  if (!basket) return

  const optionIndex = basket.options.findIndex((p) => p.id === id)
  const optionToDelete = basket.options[optionIndex]
  const oldFinalTotalPrice = parseFloat(basket.finalTotalPrice)
  const newFinalTotalPrice = (oldFinalTotalPrice - optionToDelete.price).toFixed(2)

  localStorage.setItem(
    'basket',
    JSON.stringify({
      ...basket,
      options: [...basket.options.slice(0, optionIndex), ...basket.options.slice(optionIndex + 1)],
      finalTotalPrice: newFinalTotalPrice,
    }),
  )
}

export default deleteOptionLocalStorage
