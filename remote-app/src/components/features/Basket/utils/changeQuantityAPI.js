import axios from '@/axios'

const changeQuantityAPI = async (id, direction, showNotification, setRecheckBasket) => {
  if (!id || !direction) return

  const data = {
    id,
    direction,
  }

  try {
    const response = await axios.patch(`/basket/change-quantity`, data, {
      'Content-Type': 'application/json',
    })

    if (response.status !== 200) {
        showNotification({ message: 'Failed to change quantity!', type: 'error' })
        setRecheckBasket(false)
        return
    }

    if (response.status === 200) {
      setRecheckBasket(true)
      direction === 'plus'
        ? showNotification({ message: 'Quantity was increased!', type: 'success' })
        : showNotification({ message: 'Quantity was decreased!', type: 'success' })
    }
  } catch (err) {
    showNotification({ message: err?.response?.data?.message, type: 'error' })
  }
}

export default changeQuantityAPI
