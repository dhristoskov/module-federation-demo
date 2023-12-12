const addOptionInLocalStorage = (option) => {
  const basket = JSON.parse(localStorage.getItem('basket'))
  if (!basket) return

  const optionToAdd = {
    id: option.id,
    image: option.image,
    title: option.title,
    price: option.price,
  }

  const options = basket?.options ? [...basket.options, optionToAdd] : [optionToAdd]
  const totalPrice = parseFloat(basket.totalPrice)
  const optionPrice = parseFloat(option.price)
  const oldFinalTotalPrice = parseFloat(basket.finalTotalPrice) || 0

  let finalTotalPrice = 0
  if (oldFinalTotalPrice === 0) {
    finalTotalPrice = (totalPrice + optionPrice).toFixed(2)
  } else {
    finalTotalPrice = (oldFinalTotalPrice + optionPrice).toFixed(2)
  }

  localStorage.setItem(
    'basket',
    JSON.stringify({
      ...basket,
      options,
      finalTotalPrice,
    }),
  )
}

export default addOptionInLocalStorage
