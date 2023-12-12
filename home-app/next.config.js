const { NextFederationPlugin } = require('@module-federation/nextjs-mf')
const { createDelegatedModule } = require('@module-federation/utilities')
const path = require('path')

/** @type {import('next').NextConfig} */

const REMOTR_APP_URL = 'http://localhost:3001' //Add it to .env

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks'
  return {
    remote: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `remote@${REMOTR_APP_URL}/_next/static/${location}/remoteEntry.js`,
    }),
    // remote: `remote@${REMOTR_APP_URL}/_next/static/${location}/remoteEntry.js`,
  }
}

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
  },
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
          // Home app can expose modules if needed
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
