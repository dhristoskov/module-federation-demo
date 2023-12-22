import React from 'react'
import App from 'next/app'
import { createContext } from 'react'

import { fetchAPI } from '@/lib/api'

import '@/styles/globals.css'

export const GlobalContext = createContext({
  default_seo: {},
  site_title: '',
})

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;
  return (
    <GlobalContext.Provider value={global.attributes}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)

  const globalRes = await fetchAPI('/global', {
    populate: {
      default_seo: {
        populate: '*',
      },
    },
  })

  return { ...ctx, pageProps: { global: globalRes.data } }
}

export default MyApp
