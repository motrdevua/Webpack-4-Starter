module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'postcss-uncss': {
      html: ['./dist/index.html'],
    },
  },
};
