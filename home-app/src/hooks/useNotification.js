import { useEffect } from 'react'

const useNotification = (setNotification) => {
    useEffect(() => {
        window.addEventListener('addNotification', () => {
            const notification = JSON.parse(localStorage.getItem('MFDnotification'))
            if (notification) {
                setNotification(notification)

                setTimeout(() => {
                    localStorage.removeItem('MFDnotification')
                    setNotification(null)
                }, 3000)
            }
        })
        return () => {
            window.removeEventListener('addNotification', () => {})
        }
    }, [])
}

export default useNotification