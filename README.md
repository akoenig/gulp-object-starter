# gulp-object-starter [![Dependency Status](https://david-dm.org/Inkdpixels/gulp-object-starter.svg)](https://david-dm.org/Inkdpixels/gulp-object-starter) [![devDependency Status](https://david-dm.org/Inkdpixels/gulp-object-starter/dev-status.svg)](https://david-dm.org/Inkdpixels/gulp-object-starter#info=devDependencies)

> Starter Gulpfile.js and structure for an object like configuration for multiple packages in one gulp instance.

## Why?
Gulp is awesome, but introduces a lot of duplicate code if you are developing in a package based environment.
For example, if you are developing multiple packages/extensions/templates in a single project, you dont want to install the same gulp-plugins in each package directory and configure the same tasks over and over again.  

Gulp-Object-Starter introduces a grunt-like config approach for creating gulp-tasks to reduce duplicate and malfunctioning code. The configuration objects are standarized over all packages, and one after another will create seperate tasks and chained, so called, super-tasks.

## Integrated Gulp-Packages/Plugins

* Compiling of [Sass](http://sass-lang.com/) files via [node-sass](https://github.com/sass/node-sass).
* Handling of CSS vendor prefixes of via [autoprefixer](https://github.com/postcss/autoprefixer).
* Bundling of JavaScript files via [browserify](http://browserify.org/).
* Linting of JavaScript files via [ESLint](http://eslint.org/).
* Code-Style checking of JavaScript files via [JSCS](http://jscs.info/).
* Minification of CSS files via [Minify-css](https://github.com/jonathanepollack/gulp-minify-css).
* Minification of JavaScript files via [UglifyJS2](https://github.com/mishoo/UglifyJS2).
* Minification of Images via [Imagemin](https://github.com/imagemin/imagemin).

## Integration into your project
### Installation
Download a release from the [releases page](https://github.com/Inkdpixels/WebFontJSONLoader/releases), extract the `Gulpfile.js` as well as the `package.json` and `Build/` folder into your projects root.
Afterwards, execute the following command to install all gulp dependencies.
```shell
npm install
```

### Project Configuration
The main project configuration variables lay within `Build/Config.js`. Inside this file you can configure the projects browser-support, a boolean `isInLiveMode` which will handle minification of all assets once this value is `true` and additionally some configuration for your modernizr build.

### Package Configuration
In each of your package directories, you should create a `.js` file(f.e. `BuildConfig.js`). 
This file will serve the so called configuration-object to Gulp-Object-Starter. 
The basic configuration object consists of the following key value pairs:
```javascript
module.exports = {
      // The name of the package, which also respresents the task namespace.
    'name': 'myPackage',

    // The working directory of the package, on which all paths are based upon.
    'basePath': 'Packages/myPackage/'
};
```

After you've changed the `namespace` and `basePath` values, you just need to add your newly created `BuildConfig.js` to the `build.addPackages()` method inside your `Gulptfile.js` in the projects root.

#### Package Configuration (Sass)
```javascript
    // Example configuration for sass/css related tasks.
    'sass': {
        'src': 'Private/Sass/',
        'dest': 'Public/Styles/',

        // The filepattern to watch and compile.
        'filePattern': '**/*.scss',

        // Additional settings which will be directly passed to node-sass.
        'settings': {}
    }
```

#### Package Configuration (Images)
```javascript
    // Example configuration for images related tasks.
    'images': {
        'src': paths.private + 'Images/',
        'dest': paths.public + 'Images/',

        // The filepattern to compile.
        'filePattern': '**/*.{png,jpg,gif,svg}',

        // Additional settings for the imagemin plugin.
        'settings': {
            'progressive': true,
            'svgoPlugins': [{
                'removeViewBox': false
            }]
        }
    }
```

#### Package Configuration (JS)
```javascript
    // Example configuration for scripts related tasks.
    'scripts': {
        'src': paths.private + 'JavaScript/',
        'dest': paths.public + 'JavaScript/',

        // The filepattern to watch, compile and lint.
        'filePattern': ['**/*.js', '!Vendor/**/*.js'],

        // The JS bundles to create with browserify, this example creates 2 bundles;
        // The first one inherits all the application logic, the second one bundles all vendor dependencies for faster build times.
        'bundles': [
            {
                // The name for the task, f.e.: compile:scripts:myPackage:main
                'name': 'main',

                // The entry file for browserify, relative to the src path described above.
                'src': 'App.js',

                // The outName for browserify, relative to the dest path described above.
                'dest': 'App.min.js',

                // Additional settings for browserify.
                'settings': {
                    'external': ['lodash']
                }
            },
            {
                'name': 'vendor',
                'src': null,
                'dest': 'Vendor.min.js',
                'settings': {
                    'external': null,
                    'require': ['lodash']
                }
            }
        ]
    }
```


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
