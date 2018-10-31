/** Used in .babelrc for 'test' environment */

const devConfig = require('./webpack.config.development');

module.exports = {
  mode: 'development',
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    // Use base + development loaders, but exclude 'babel-loader'
    loaders: devConfig.module.loaders.slice(1)
  }
};
