const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = () => {
  const plugins = [];

  plugins.push(new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
    cwd: process.cwd(),
    onStart({ compilation }) {
      console.log('circular-dependency-plugin: start detecting webpack modules cycles');
    },
    onEnd({ compilation }) {
      console.log('circular-dependency-plugin: end detecting webpack modules cycles');
    },
  }));

  return plugins;
};
