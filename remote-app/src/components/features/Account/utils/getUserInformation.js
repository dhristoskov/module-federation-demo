import axios from '@/axios'

const getUserInformation = async (id, setUserInfor, showNotification, setReload) => {
  if (!id) return

  try {
    const response = await axios.get(`/user/info`)
    if (response.status !== 200) {
      showNotification({ message: 'Failed to load user info!', type: 'error' })
      setReload(false)
      return
    }
    
    setUserInfor({
      email: response.data.email,
      phone_number: response.data.phone_number,
      password: response.data.password,
    })
    showNotification({ message: 'User info loaded!', type: 'success' })
    setReload(false)
  } catch (err) {
    showNotification({ message: err.response.data.message, type: 'error' })
    setReload(false)
  }
}

export default getUserInformation
