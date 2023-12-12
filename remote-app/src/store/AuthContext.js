import React, { createContext, useState, useCallback, useEffect } from 'react'
import axios from '@/axios'

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: null,
})

let logoutTimer

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(false)
  const [expirTime, setExpTimer] = useState()
  const [user, setUser] = useState({
    id: '',
    username: '',
    firs_tname: '',
    last_name: '',
  })

  const login = useCallback((token, user, expirInTime) => {
    if (!user || !token) return
    setToken(token)
    const tokenExpirationTime = expirInTime || new Date(new Date().getTime() + 1000 * 60 * 60)
    setExpTimer(tokenExpirationTime)
    setUser(user)

    localStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        user: user,
        expiration: tokenExpirationTime.toISOString(),
      }),
    )

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setExpTimer(null)
    setUser(null)
    localStorage.removeItem('userData')
    axios.defaults.headers.common['Authorization'] = ''
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && storedData.user && new Date(storedData.expiration) > new Date()) {
      login(storedData.token, storedData.user, new Date(storedData.expiration))
    }
  }, [login])

  useEffect(() => {
    if (token && expirTime) {
      const remainingTime = expirTime.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, expirTime])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        user: user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
