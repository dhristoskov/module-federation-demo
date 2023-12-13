const { NextFederationPlugin } = require('@module-federation/nextjs-mf')
const { createDelegatedModule } = require('@module-federation/utilities')
const path = require('path')

/** @type {import('next').NextConfig} */

const REMOTR_APP_URL = 'http://localhost:3001' //Add it to .env
const HOME_APP_URL = 'http://localhost:3000' //Add it to .env

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks'
  return {
    remote: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `remote@${REMOTR_APP_URL}/_next/static/${location}/remoteEntry.js`,
    }),

    home: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `home@${HOME_APP_URL}/_next/static/${location}/remoteEntry.js`,
    }),
    // remote: `remote@${REMOTR_APP_URL}/_next/static/${location}/remoteEntry.js`,
    // home: `home@${HOME_APP_URL}/_next/static/${location}/remoteEntry.js`,
  }
}

const nextConfig = {
  reactStrictMode: false,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        exposes: {
          // specify exposed pages and components
          './Auth': './src/components/features/Auth/Auth',
          './UserAccount': './src/components/features/Account/UserAccount',
          './Address': './src/components/features/Address/Address',
          './Basket': './src/components/features/Basket/Basket',
          './storeAuth': './src/store/AuthContext',
          './storeNotification': './src/store/NotificationContext',
          './AddProductButton': './src/components/modules/AddProductButton/AddProductButton',
          './AddOption': './src/components/modules/AddOption/AddOption',
          './Checkout': './src/components/features/Checkout/Checkout',
        },
        shared: {
          // specify shared dependencies here
        },
        extraOptions: {
          exposePages: true, // `false` by default
          enableImageLoaderFix: true, // `false` by default
          enableUrlLoaderFix: true, // `false` by default
        },
      }),
    )
    config.devServer = {
      historyApiFallback: true,
      hot: true,
    },
    config.cache = false
    config.output.publicPath = 'auto'
    return config
  },
}

module.exports = nextConfig
