import { useEffect, useState } from 'react'

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    const token = storedData && storedData.token ? storedData.token : null
    const isLoggedIn = storedData && storedData.token ? true : false
    const user = storedData && storedData.user ? storedData.user : null

    setUser(user)
    setToken(token)
    setIsLoggedIn(isLoggedIn)

    window.addEventListener('login', () => {
      const storedData = JSON.parse(localStorage.getItem('userData'))
      const isLoggedIn = storedData && storedData.token ? true : false
      const user = storedData && storedData.user ? storedData.user : null
      const token = storedData && storedData.token ? storedData.token : null
      setUser(user)
      setToken(token)
      setIsLoggedIn(isLoggedIn)
    })
    return () => {
      window.removeEventListener('login', () => {})
    }
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    const token = storedData && storedData.token ? storedData.token : null

    if (!token) {
      setIsLoggedIn(false)
      setToken(null)
      setUser(null)
    }

    window.addEventListener('logout', () => {
      setIsLoggedIn(false)
      setToken(null)
      setUser(null)
    })
    return () => {
      window.removeEventListener('logout', () => {})
    }
  }, [])

  return { token, user, isLoggedIn }
}

export default useAuth
