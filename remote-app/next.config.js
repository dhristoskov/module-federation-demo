const { NextFederationPlugin } = require('@module-federation/nextjs-mf')
const path = require('path')

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',
        filename: 'static/chunks/remoteEntry.js',
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
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      hot: true,
    },
    config.cache = false
    config.output.publicPath = 'auto'
    return config
  },
}

module.exports = nextConfig
