# gulp-typo3-starter [![Dependency Status](https://david-dm.org/Inkdpixels/gulp-typo3-starter.svg)](https://david-dm.org/Inkdpixels/gulp-typo3-starter) [![devDependency Status](https://david-dm.org/Inkdpixels/gulp-typo3-starter/dev-status.svg)](https://david-dm.org/Inkdpixels/gulp-typo3-starter#info=devDependencies)

> Starter Gulpfile.js and structure for TYPO3/multi-package based projects.

## Features
This starter kit includes a lean config based setup for several binaries/tools. It's not fixed on a single working directory.
Instead, you can configure each of your developed Apps/Packages/TYPO3 Extensions separately without installing a new gulp instance in each working directory.

The default installed packages are:
* Compiling of [Sass](http://sass-lang.com/) files via [node-sass](https://github.com/sass/node-sass).
* Handling of CSS vendor prefixes of via [autoprefixer](https://github.com/postcss/autoprefixer).
* Bundling of JavaScript files via [browserify](http://browserify.org/).
* Linting of JavaScript files via [ESLint](http://eslint.org/).
* Code-Style checking of JavaScript files via [JSCS](http://jscs.info/).
* Minification of CSS files via [Minify-css](https://github.com/jonathanepollack/gulp-minify-css).
* Minification of JavaScript files via [UglifyJS2](https://github.com/mishoo/UglifyJS2).
* Minification of Images via [Imagemin](https://github.com/imagemin/imagemin).

## Integration in your project
Download a release from the [releases page](https://github.com/Inkdpixels/WebFontJSONLoader/releases), extract the `Gulpfile.js` as well as the `package.json` and `Build/` folder into your projects root.
Afterwards, execute the following command to install all gulp dependencies.
```shell
npm install
```
Once all dependencies are installed properly, copy the example `PackageConfig.js` into your package root, and adjust the paths settings. Afterwards pass the config in the `Gulptfile.js` to the `build.addPackages()` method.

## Tasks
| Task name                    | description                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| build                        | Starts a complete re-compilation of all packages via `gulp compile:sass compile:scripts`.                                         |
| compile:sass                 | A Super-Task which compiles each configured sass package with [node-sass](https://github.com/sass/node-sass).                     |
| compile:scripts              | A Super-Task which compiles each configured scripts package with [browserify](http://browserify.org/).                            |
| compile:modernizr            | Creates a lean modernizr build with [gulp-modernizr](https://github.com/doctyper/gulp-modernizr).                                 |
| minify                       | Starts a minification process for each package via `gulp minify:scripts minify:styles minify:images`.                             |
| minify:styles                | A Super-Task which minifies each configured sass package with [Minify-css](https://github.com/jonathanepollack/gulp-minify-css).  |
| minify:scripts               | A Super-Task which minifies each configured scripts package with [UglifyJS2](https://github.com/mishoo/UglifyJS2).                |
| minify:images                | A Super-Task which minifies each configured images package with [Imagemin](https://github.com/imagemin/imagemin).                 |
| lint                         | Lints each package for JS errors/style violations via [ESLint](http://eslint.org/) and [JSCS](http://jscs.info/).                 |
| watch                        | Creates a watcher for each configured scripts/sass package, and re-runs the compile task on each save.                            |


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
