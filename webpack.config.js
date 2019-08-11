const fs = require('fs');
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
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.pug'));

const svgoOptions = {
  cleanupAttrs: true,
  removeDoctype: true,
  removeXMLProcInst: true,
  removeComments: true,
  removeMetadata: true,
  removeEditorsNSData: true,
  inlineStyles: true,
  minifyStyles: true,
  convertStyleToAttrs: true,
  removeStyleElement: false,
  cleanupIDs: true,
  removeRasterImages: true,
  removeUselessDefs: true,
  cleanupListOfValues: true,
  convertColors: true,
  removeUnknownsAndDefaults: true,
  removeEmptyAttrs: true,
  removeNonInheritableGroupAttrs: true,
  sortAttrs: true,
  removeUselessStrokeAndFill: true,
  removeViewBox: true,
  cleanupEnableBackground: true,
  removeHiddenElems: true,
  removeEmptyText: true,
  convertShapeToPath: true,
  moveGroupAttrsToElems: true,
  collapseGroups: true,
  convertTransform: true,
  removeEmptyContainers: true,
  mergePaths: true,
  removeUnusedNS: true,
  removeTitle: true,
  removeDesc: true,
  removeScriptElement: true,
};

module.exports = {
  context: PATHS.src,
  externals: {
    paths: PATHS,
  },
  entry: {
    main: ['./js/main.js', './scss/main.scss', './pug/pages/index.pug'],
  },
  output: {
    filename: 'js/[name].js',
    path: PATHS.dist,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    overlay: true,
    port: 9000,
    host: '192.168.1.2',
    hot: true,
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
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new SpritesmithPlugin({
      src: {
        cwd: `${PATHS.src}/img/png`,
        glob: '*.png',
      },
      target: {
        image: `${PATHS.src}/img/spritePng.png`,
        css: [['src/scss/temp/_spritePng.scss', { format: 'template' }]],
      },
      customTemplates: {
        template: 'src/scss/modules/spritePng.template.handlebars',
      },
      spritesmithOptions: {
        padding: 10,
      },
      apiOptions: {
        cssImageRef: 'spritePng.png',
      },
    }),
    new SVGSpritemapPlugin('src/img/svg/**/*.svg', {
      output: {
        filename: '../src/img/spriteSvg.svg',
        svg4everybody: true,
        svgo: svgoOptions,
      },
      styles: {
        filename: `${PATHS.src}/scss/temp/_spriteSvg.scss`,
        variables: {
          sizes: 'fragment-sizes',
        },
      },
    }),
    // new FaviconsWebpackPlugin({
    //   logo: 'favicon.png',
    //   prefix: 'img/favicon/',
    //   emitStats: false,
    //   statsFilename: 'iconstats-[hash].json',
    //   persistentCache: true,
    //   inject: true,
    //   background: 'transparent',
    //   title: 'Webpack App',
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false,
    //   },
    // }),
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
      // pug
      {
        test: /\.pug$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
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
              hmr: process.env.NODE_ENV !== 'production',
              reloadAll: true,
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
                quality: 75,
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
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path]/[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'img', 'scss'],
  },
};
