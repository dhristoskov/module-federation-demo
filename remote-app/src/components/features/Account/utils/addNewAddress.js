import axios from '@/axios'

const addNewAddress = async (id, setUserAddresses, showNotification, setReload, address) => {
  if (!id) return

  try {
    const response = await axios.post(`/address/add-new/`, address, {
      'Content-Type': 'application/json',
    })

    if (response.status !== 200) {
      showNotification({ message: 'Failed to add new address!', type: 'error' })
      return
    }

    setUserAddresses({
      street: '',
      city: '',
      street_number: '',
      postal_code: '',
      country: '',
    })
    showNotification({ message: 'User address added!', type: 'success' })
    setReload(true)
  } catch (err) {
    showNotification({ message: err?.response?.data?.message, type: 'error' })
  }
}

export default addNewAddress
