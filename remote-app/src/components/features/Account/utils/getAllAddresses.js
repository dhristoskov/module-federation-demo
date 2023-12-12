import axios from '@/axios'

const getAllAddresses = async (setAddresses, showNotification, setReload) => {
  try {
    const response = await axios.get('/address')
    if (response.status !== 200) {
      showNotification({ message: 'Failed to load user addresses info!', type: 'error' })
      setReload(false)
      return
    }
    setAddresses(response.data.addresses)
    showNotification({ message: 'User addresses info loaded!', type: 'success' })
    setReload(false)
  } catch (err) {
    showNotification({ message: err.response.data.message, type: 'error' })
    setReload(false)
  }
}

export default getAllAddresses
