module.exports = {
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/chat': { page: '/chat' },
      '/compose': { page: '/compose' }
    }
  },

  images: {
    unoptimized: true
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer'
      config.node = {
        __dirname: true
      }
    }
    config.output.globalObject = 'this'

    return config
  }
}
