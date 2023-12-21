import axios from '@/axios'

const login = (token, user, rememberMe) => {
  if (!user || !token) return
  let tokenExpirationDate = null
  if (rememberMe) {
    tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
  } else {
    tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)
  }

  localStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      user: user,
      expiration: tokenExpirationDate.toISOString(),
    }),
  )

  const event = new Event('login')
  window.dispatchEvent(event)

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default login
