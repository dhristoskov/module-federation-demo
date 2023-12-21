import axios from '@/axios'

const deleteUserAccountAPI = async (password, token, addNotification) => {
  try {
    const response = await axios.delete(
      '/user/delete-user',
      { password },
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    )

    if (response.status === 200) {
      addNotification({ message: 'User account deleted', type: 'success' })
    }
  } catch (err) {
    addNotification({ message: err.response.data.message, type: 'error' })
  }
}

export default deleteUserAccountAPI
