import axios from '@/axios'

const removeAllBasketItemsAPI = async (showNotification, setRecheckBasket) => {
  try {
    const response = await axios.delete(`/basket/clear-basket`, {
      'Content-Type': 'application/json',
    })

    if (response.status !== 200) {
      showNotification({ message: 'Failed to remove all basket items!', type: 'error' })
      setRecheckBasket(false)
      return
    }
    showNotification({ message: 'All basket items was removed!', type: 'success' })
    setRecheckBasket(true)
  } catch (err) {
    showNotification({ message: err?.response?.data?.message, type: 'error' })
    setRecheckBasket(false)
  }
}

export default removeAllBasketItemsAPI
