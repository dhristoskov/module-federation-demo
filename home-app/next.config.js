const NextFederationPlugin = require('@module-federation/nextjs-mf')
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
  swcMinify: true,
  images: {
    loader: 'default',
    path: '/_next/image',
    domains: ['localhost'],
    unoptimized: true,
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        exposes: {
          // specify exposed pages and components
          './Home': './src/pages/index.js',
          './pages-map': './pages-map.js',
          './Checkout': './src/pages/checkout.js',
          './Account': './src/pages/account.js',
          './AccountSettings': './src/pages/account-settings.js',
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
