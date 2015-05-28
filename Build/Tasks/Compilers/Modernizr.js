var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');
var packages = require('./../../Index.js').getPackages();
var modernizrConfig = config.modernizr;

gulp.task('compile:modernizr', function () {
    'use strict';

    var searchPaths = [];

    // Loop over each package.
    packages.forEach(function (packageModel) {
        var packageConfig = packageModel.options;
        var packageBasePath = packageConfig.basePath;
        var sassConfig = packageConfig.sass;
        var scriptsConfig = packageConfig.scripts;

        // Add search paths, if the package has sass/js sources.
        if (sassConfig) {
            searchPaths.push(packageBasePath + sassConfig.src + sassConfig.filePattern);
        }

        if (scriptsConfig) {
            searchPaths.push(packageBasePath + scriptsConfig.src + scriptsConfig.filePattern);
        }
    });

    // Scan all searchPaths, and build the final modernizr file.
    return gulp.src(searchPaths)
        .pipe(plugins.modernizr(modernizrConfig.fileName, modernizrConfig.config))
        .on('error', Logger)
        .pipe(gulp.dest(modernizrConfig.destPath))
});
