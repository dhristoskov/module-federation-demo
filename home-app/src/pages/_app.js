import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import '@/styles/globals.css'

const AuthContextProvider = dynamic(() => import('remote/storeAuth'), {
  ssr: false,
  suspense: true,
})

const NotificationProvider = dynamic(() => import('remote/storeNotification'), {
  ssr: false,
  suspense: true,
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <NotificationProvider>
        <Head>
          <title>Plushy shop - Module Federation Demo</title>
        </Head>
        <Component {...pageProps} />
      </NotificationProvider>
    </AuthContextProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
