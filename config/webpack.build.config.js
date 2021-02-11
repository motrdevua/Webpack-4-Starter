const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [],
});

module.exports = new Promise(resolve => {
  resolve(buildWebpackConfig);
});
