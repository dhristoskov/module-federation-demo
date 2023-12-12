import axios from '@/axios'

const editUserAddress = async (id, setUserAddresses, showNotification, setReload, address) => {
  if (!id) return
  try {
    const response = await axios.patch(`/address/update/${id}`, address, {
      'Content-Type': 'application/json',
    })

    if (response.status !== 200) {
      showNotification({ message: 'Failed to update user address!', type: 'error' })
      return
    }

    const { street, city, street_number, postal_code, country } = response.data
    setUserAddresses({
      street,
      city,
      street_number,
      postal_code,
      country
    })

    showNotification({ message: 'User address updated!', type: 'success' })
    setReload(true)
  } catch (err) {
    showNotification({ message: err.response.data.message, type: 'error' })
  }
}

export default editUserAddress
