module.exports = {
  mainSrcDir: 'src/main',
  rendererSrcDir: 'src',

  webpack: config => {
    Object.assign(config, {
      entry: {
        background: './src/main/background.ts',
        preload: './src/main/preload.ts'
      }
    })
    return config
  }
}
