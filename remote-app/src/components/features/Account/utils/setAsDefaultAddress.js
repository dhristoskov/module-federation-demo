import axios from '@/axios'

const setAsDefaultAddress = async (id, showNotification, setReload) => {
  if (!id) return

  try {
    const response = await axios.patch(`/address/select-status/${id}`)
    if (response.status === 200) {
      setReload(true)
    }
  } catch (err) {
    showNotification({ message: err.response.data.message, type: 'error' })
  }
}

export default setAsDefaultAddress
