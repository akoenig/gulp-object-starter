# gulp-typo3-starter [![Dependency Status](https://david-dm.org/Inkdpixels/gulp-typo3-starter.svg)](https://david-dm.org/Inkdpixels/gulp-typo3-starter) [![devDependency Status](https://david-dm.org/Inkdpixels/gulp-typo3-starter/dev-status.svg)](https://david-dm.org/Inkdpixels/gulp-typo3-starter#info=devDependencies) 

> Starter Gulpfile.js and structure for TYPO3 related projects.

## Features
This starter kit includes a lean config based setup for several binaries/tools. It's not fixed on a single working directory.
Instead, you can configure each of your developed Apps/Packages/TYPO3 Extensions separately without installing a new gulp instance in each working directory.

The default installed packages are:
* Compiling of [Sass](http://sass-lang.com/) files.
* Handling of vendor prefixes of via [autoprefixer](https://github.com/postcss/autoprefixer).
* Bundling of JavaScript files via [browserify](http://browserify.org/).
* Linting of JavaScript files via [JSHint](http://jshint.com/).
* Compression of Images via [Imagemin](https://github.com/imagemin/imagemin).

## Integration in your project
Download a release from the [releases page](https://github.com/Inkdpixels/WebFontJSONLoader/releases), extract the `Gulpfile.js` as well as the `package.json` and `Build/` folder into your projects root.
Afterwards, execute the following command to install all gulp dependencies.
```shell
npm install
```
Once all dependencies are installed properly, you can run one of the following Tasks and/or configure your projects settings in the `Build/Config.js` file.


### Tasks
**ToDo**


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
