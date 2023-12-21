import axios from '@/axios'

const addOptionAPI = async (option, addNotification) => {
  const optionToAdd = {
    id: option.id,
    image: option.image,
    title: option.title,
    price: option.price,
  }

  try {
    const response = await axios.post('/basket/add-options', optionToAdd)

    if (response.status === 200) {
      addNotification({ message: 'Option added to basket!', type: 'success' })
    }
  } catch (error) {
    addNotification({ message: error.response.data.message, type: 'error' })
  }
}

export default addOptionAPI
