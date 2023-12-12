import axios from '@/axios'

const deleteItemAPI = async (id, showNotification, setRecheckBasket) => {
  if (!id) return

  try {
    const response = await axios.delete(`/basket/remove-product/${id}`)

    if (response.status !== 200) {
      showNotification({ message: 'Failed to delete item!', type: 'error' })
      setRecheckBasket(false)
      return
    }
    showNotification({ message: 'Item was deleted!', type: 'success' })
    setRecheckBasket(true)
  } catch (err) {
    showNotification({ message: err?.response?.data?.message, type: 'error' })
    setRecheckBasket(false)
  }
}

export default deleteItemAPI
