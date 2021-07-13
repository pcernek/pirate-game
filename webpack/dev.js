const merge = require('webpack-merge')
const base = require('./base')

module.exports = merge(base, {
  entry: './src/dev/dev.ts',
  plugins: [
    ...base.plugins,
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true
    })
  ]
})
