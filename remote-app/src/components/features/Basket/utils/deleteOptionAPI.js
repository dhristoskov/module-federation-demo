import axios from '@/axios'

const deleteOptionAPI = async (optionId, addNotification, setRecheckBasket) => {
  try {
    const response = await axios.delete(`/basket/remove-option/${optionId}`)

    if (response.status === 200) {
      addNotification({ message: 'Option was deleted!', type: 'success' })
      setRecheckBasket(true)
    }
  } catch (error) {
    addNotification({ message: error.response.data.message, type: 'error' })
  }
}

export default deleteOptionAPI
