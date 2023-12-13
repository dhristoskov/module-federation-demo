import App from 'next/app'

import AuthContextProvider from '@/store/AuthContext'
import NotificationContextProvider from '@/store/NotificationContext'

import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <Component {...pageProps} />
      </NotificationContextProvider>
    </AuthContextProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
