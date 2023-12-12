import Head from 'next/head'
import dynamic from 'next/dynamic'

import '@/styles/globals.css'

const AuthContextProvider = dynamic(() => import('remote/storeAuth'), {
  ssr: false,
})

const NotificationProvider = dynamic(() => import('remote/storeNotification'), {
  ssr: false,
})

const App = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <NotificationProvider>
        <Head>
          <title>Module Federation Demo</title>
        </Head>
        <Component {...pageProps} />
      </NotificationProvider>
    </AuthContextProvider>
  )
}

export default App
