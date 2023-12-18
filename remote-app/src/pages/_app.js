import App from 'next/app'

import AuthContextProvider from '@/store/AuthContext'

import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
        <Component {...pageProps} />
    </AuthContextProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
