import { useEffect, useState } from 'react'

import axios from '@/axios'

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    const token = storedData && storedData.token ? storedData.token : null
    const isLoggedIn = storedData && storedData.token ? true : false
    const user = storedData && storedData.user ? storedData.user : null

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

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

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

      axios.defaults.headers.common['Authorization'] = ''
    }

    window.addEventListener('logout', () => {
      setIsLoggedIn(false)
      setToken(null)
      setUser(null)

      axios.defaults.headers.common['Authorization'] = ''
    })
    return () => {
      window.removeEventListener('logout', () => {})
    }
  }, [])

  return { token, user, isLoggedIn }
}

export default useAuth
