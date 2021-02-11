# Webpack-4-Starter

[![Webpack](https://flat.badgen.net/badge/webpack/4/14aaf3)](https://webpack.js.org)

This starter-kit with [Webpack 4](https://webpack.js.org/) based setup helps you build web apps and sites much faster.

## Installation

1. Clone the repo using `git clone https://github.com/motrdevua/Webpack-4-Starter.git` or [download _Webpack-4-Starter_](https://github.com/motrdevua/Webpack-4-Starter/archive/master.zip).
2. Open **Webpack-4-Starter** folder in terminal and install a packages via command: `npm install`.

## Build commands

- `npm run start` ─ start webpack-dev-server, compile assets when file changes are made.
- `npm run dev` ─ run webpack in development mode.
- `npm run prod` ─ run webpack in production mode (compile and optimize assets) for production

## Structure

Shorten directories and files structure which you'll see after build:

```shell
Webpack-4-Starter/
├── node_modules/         # Node.js packages
├── src/
│  ├── fonts/             # fonts files
│  ├── img/               # images files
│  │  └── png/            # icons for png sprite
│  │  └── svg/            # icons for svg sprite
│  ├── js/
│  ├── pug/               # template pug file
│  │  ├── pages/          # pages
│  │  │  └── 404.html     # 404 error page
│  │  │  └── index.html   # index page
│  │  ├── partials/       # common parts of pug code
│  │  ├── utils/          # mixins of pug code
│  ├── scss/              # styles
│  │  ├── modules/        #
│  │  ├── partials/       # common parts of scss code
│  │  └── main.scss       # main Sass file that references scss
├── .editorconfig         # Editor configuration file
├── .eslintrc             # ESLint configuration file
├── .gitignore            # Specifies intentionally untracked files to ignore
├── postcss.config.js     # PostCss configuration file
├── webpack.config.js     # Webpack configuration file
├── csscomb.json          # Csscomb configuration file
├── package.json          # Node.js dependencies and scripts
├── .npmrc                # The npm config file
├── .prettierrc           # Prettier config file
└── [...]                 # other...
```

_Enjoy!_
