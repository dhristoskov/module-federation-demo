import axios from '@/axios'

const getBasketAPI = async (setBasketItems, showNotification, setRecheckBasket) => {
  try {
    const response = await axios.get(`/basket/get-basket`, {
      'Content-Type': 'application/json',
    })

    if (response.status !== 200) {
      showNotification({ message: 'Failed to get basket!', type: 'error' })
      setRecheckBasket(false)
      return
    }
    setBasketItems(response.data.basket)
    setRecheckBasket(false)
  } catch (err) {
    showNotification({ message: err?.response?.data?.message, type: 'error' })
    setRecheckBasket(false)
  }
}

export default getBasketAPI
