import AuthContextProvider from '@/store/AuthContext'
import NotificationContextProvider from '@/store/NotificationContext'

import '@/styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <Component {...pageProps} />
      </NotificationContextProvider>
    </AuthContextProvider>
  )
}

export default App
