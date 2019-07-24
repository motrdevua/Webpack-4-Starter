# Webpack-4-Starter

[![Webpack](https://flat.badgen.net/badge/webpack/4/14aaf3)](https://webpack.js.org)
[![dependencies](https://flat.badgen.net/david/dep/cichy380/html-starter-bs4-webpack)](https://david-dm.org/cichy380/html-starter-bs4-webpack)
[![devDependencies](https://flat.badgen.net/david/dev/cichy380/html-starter-bs4-webpack)](https://david-dm.org/cichy380/html-starter-bs4-webpack?type=dev)
[![license](https://flat.badgen.net/github/license/cichy380/html-starter-bs4-webpack)](https://github.com/cichy380/html-starter-bs4-webpack/blob/master/LICENSE.md)

This boilerplate with [Webpack 4](https://webpack.js.org/) based setup helps you build web apps and sites much faster.

## Installation

1. Clone the repo using `git clone https://github.com/motrdevua/Webpack-4-Starter.git` or [download *Webpack-4-Starter*](https://github.com/motrdevua/Webpack-4-Starter/archive/master.zip).
2. Open **Webpack-4-Starter** folder in terminal and install a packages via command: `npm install`. 

## Build commands

* `npm run start` ─ start webpack-dev-server, compile assets when file changes are made.
* `npm run dev` ─ run webpack in development mode.
* `npm run prod` ─ run webpack in production mode (compile and optimize assets) for production

### How to use sprites

#### PNG

1.  Put `*.png` icons into folder `src/img/png`.
2.  Uncomment string `@import 'temp/spritePng';` in `main.scss` file.
3.  Use icon in scss file with mixin `@include spritePng($icon);`

- Example:
-     .icon {
        @include spritePng($icon);
      }

#### SVG

1.  Put `*.svg` icons into folder `src/img/svg`.
2.  Uncomment `@import 'temp/spriteSvg';` in `main.scss` file.
3.  Use icon in scss file with mixin `@include sprite('icon');`

- Example:
-     .icon {
        @include sprite('icon');
        width: 6em;
        height: 8em;
      }

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
