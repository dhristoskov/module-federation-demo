import { createContext, useState, useEffect, useCallback } from 'react'

export const NotificationContext = createContext({
  activeNotification: { message: '', type: '' },
  showNotification: () => {},
})

const NotificationProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState({ message: '', type: '' })

  const showNotification = useCallback((notification) => {
    setActiveNotification(notification)
  }, [])

  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification({ message: '', type: '' })
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [activeNotification])

  return (
    <NotificationContext.Provider
      value={{
        activeNotification,
        showNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
