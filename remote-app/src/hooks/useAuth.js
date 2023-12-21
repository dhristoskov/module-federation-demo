import { useEffect, useState } from 'react'

import axios from '@/axios'

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [user, setUser] = useState(null)
  const [expirationDate, setExpirationDate] = useState(null)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    const token = storedData && storedData.token ? storedData.token : null
    const isLoggedIn = storedData && storedData.token ? true : false
    const user = storedData && storedData.user ? storedData.user : null
    const expirationDate = storedData && storedData.expiration ? storedData.expiration : null

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    setUser(user)
    setToken(token)
    setIsLoggedIn(isLoggedIn)
    setExpirationDate(expirationDate)

    window.addEventListener('login', () => {
      const storedData = JSON.parse(localStorage.getItem('userData'))
      const isLoggedIn = storedData && storedData.token ? true : false
      const user = storedData && storedData.user ? storedData.user : null
      const token = storedData && storedData.token ? storedData.token : null
      const expirationDate = storedData && storedData.expiration ? storedData.expiration : null

      setUser(user)
      setToken(token)
      setIsLoggedIn(isLoggedIn)
      setExpirationDate(expirationDate)

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
      setExpirationDate(null)
      setToken(null)
      setUser(null)

      axios.defaults.headers.common['Authorization'] = ''
    }

    window.addEventListener('logout', () => {
      setIsLoggedIn(false)
      setExpirationDate(null)
      setToken(null)
      setUser(null)

      localStorage.removeItem('userData')
      axios.defaults.headers.common['Authorization'] = ''
    })
    return () => {
      window.removeEventListener('logout', () => {})
    }
  }, [])

  useEffect(() => {
    if (!expirationDate) return
    const expirationDateParsed = new Date(expirationDate)
    const now = new Date()
    if (expirationDateParsed <= now) {
      const event = new Event('logout')
      window.dispatchEvent(event)
    }
  }, [expirationDate])

  return { token, user, isLoggedIn }
}

export default useAuth
