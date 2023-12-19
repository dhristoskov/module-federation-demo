import axios from '@/axios'

const login = (token, user) => {
  if (!user || !token) return
  localStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      user: user,
    }),
  )

  const event = new Event('login')
  window.dispatchEvent(event)

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default login
