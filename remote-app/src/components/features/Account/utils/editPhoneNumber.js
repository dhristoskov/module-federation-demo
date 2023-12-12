import axios from '@/axios'

const editPhoneNumber = async (id, phone_number, showNotification, setReload) => {
  if (!id || !phone_number) return

  try {
    const response = await axios.patch(
      `/user/phone-number`,
      { phone_number },
      {
        'Content-Type': 'application/json',
      },
    )

    if (response.status !== 200) {
      showNotification({ message: 'Failed to update user phone number!', type: 'error' })
      return
    }

    showNotification({ message: 'User phone number updated!', type: 'success' })
    setReload(true)
  } catch (err) {
    showNotification({ message: err?.response?.data?.message, type: 'error' })
  }
}

export default editPhoneNumber
