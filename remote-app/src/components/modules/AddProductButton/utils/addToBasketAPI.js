import axios from '@/axios'

const addToBasketAPI = async (product, showNotification) => {
  try {
    const response = await axios.post(`/basket/add-product/`, product, {
      'Content-Type': 'application/json',
    })

    if (response.status !== 200) {
      showNotification({ message: 'Failed to add product to basket!', type: 'error' })
      return
    }

    showNotification({ message: 'Product added to basket!', type: 'success' })
  } catch (err) {
    showNotification({ message: err.response.data.message, type: 'error' })
  }
}

export default addToBasketAPI
