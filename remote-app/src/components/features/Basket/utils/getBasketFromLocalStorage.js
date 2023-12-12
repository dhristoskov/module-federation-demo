const getBasketFromLocalStorage = (setBasketItems, setRecheckBasket) => {
  const basket = localStorage.getItem('basket')

  if (basket) {
    setBasketItems(JSON.parse(basket))
  }

  setRecheckBasket(false)
}

export default getBasketFromLocalStorage
