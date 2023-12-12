import axios from '@/axios'

const editUserEmail = async (id, email, showNotification, setReload) => {
  if (!id || !email) return

  try {
    const response = await axios.patch(
      `/user/email`,
      { email },
      {
        'Content-Type': 'application/json',
      },
    )

    if (response.status !== 200) {
      showNotification({ message: 'Failed to update user email!', type: 'error' })
      return
    }

    showNotification({ message: 'User email updated!', type: 'success' })
    setReload(true)
  } catch (err) {
    showNotification({ message: err.response.data.message, type: 'error' })
  }
}

export default editUserEmail
