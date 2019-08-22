const fs = require('fs');
const gutil = require('gutil');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const SpritesmithPlugin = require('webpack-spritesmith');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.pug'));

const SpritesmithPluginConfig = {
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
};

const SVGSpritemapPluginConfig = {
  output: {
    filename: '../src/img/spriteSvg.svg',
    svg4everybody: true,
  },
  styles: {
    filename: `${PATHS.src}/scss/temp/_spriteSvg.scss`,
    variables: {
      sizes: 'fragment-sizes',
    },
  },
};

const config = {
  context: PATHS.src,
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
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
  module: {
    rules: [
      // js
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
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
        exclude: /node_modules/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      },
      // scss
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
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
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: './img',
        to: `${PATHS.assets}img`,
        ignore: ['.DS_Store', '.gitkeep', 'png/*', 'svg/*'],
      },
      { from: `${PATHS.src}/static`, to: '' },
    ]),
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
      chunkFilename: 'css/[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    // new SpritesmithPlugin(SpritesmithPluginConfig),
    // new SVGSpritemapPlugin('src/img/svg/**/*.svg', SVGSpritemapPluginConfig),
  ],
  resolve: {
    modules: ['node_modules'],
  },
};

module.exports = config;

// fs.readdir(`${PATHS.src}/img/png`, (err, files) => {
//   console.log(files);
//   if (files.length !== 0) {
//     config.plugins.push(new SpritesmithPlugin(SpritesmithPluginConfig));
//   }
// });
