const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const SpritesmithPlugin = require('webpack-spritesmith');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const iconsContext = path.resolve(__dirname, './src/img/svg');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['./js/main.js', './scss/main.scss'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    overlay: true,
  },
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    optimizationBailout: true,
    colors: {
      green: '\u001b[32m',
    },
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: './img',
        to: 'img',
        ignore: ['.DS_Store', '.gitkeep', 'png/*', 'svg/*'],
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      outputPath: './',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/img/png'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'src/img/sprite.png'),
        css: [['src/scss/temp/sprite.scss', { format: 'template' }]],
      },
      customTemplates: {
        template: 'src/scss/modules/spritePng.template.handlebars',
      },
      spritesmithOptions: {
        padding: 10,
      },
      apiOptions: {
        cssImageRef: 'sprite.png',
      },
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        id: 'my-custom-sprite-id',
      },
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    // split main and vendors
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      // javascript
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // styles
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`,
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // images
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // svg
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: './',
            },
          },
          'svg-transform-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeEditorsNSData: true },
                { cleanupAttrs: true },
                { convertStyleToAttrs: true },
                { removeRasterImages: true },
                { cleanupNumericValues: true },
                { convertColors: true },
                { removeUnknownsAndDefaults: true },
                { removeNonInheritableGroupAttrs: true },
                { removeUselessStrokeAndFill: true },
                { removeViewBox: true },
                { cleanupEnableBackground: true },
                { removeHiddenElems: true },
                { removeEmptyText: true },
                { convertShapeToPath: true },
                { moveElemsAttrsToGroup: true },
                { moveGroupAttrsToElems: true },
                { collapseGroups: true },
                { convertPathData: true },
                { convertTransform: true },
                { removeEmptyAttrs: true },
                { removeEmptyContainers: true },
                { mergePaths: true },
                { cleanupIDs: true },
                { removeUnusedNS: true },
                { transformsWithOnePath: false },
                { sortAttrs: true },
                { removeTitle: true },
              ],
            },
          },
        ],
        include: iconsContext,
      },
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'img', 'scss'],
  },
};
