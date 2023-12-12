import axios from '@/axios'

const deleteSelectedAddress = async (id, showNotification, setReload) => {
  if (!id) return

  try {
    const response = await axios.delete(`/address/delete/${id}`)
    if (response.status === 200) {
      setReload(true)
    }
  } catch (err) {
    showNotification({ message: err?.response?.data?.message, type: 'error' })
  }
}

export default deleteSelectedAddress
