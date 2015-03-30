var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');
var packagesRepository = require('./../../Packages.js');
var packages = packagesRepository.getPackages();
var modernizrConfig = config.modernizr;

gulp.task('compile:modernizr', function() {
    'use strict';

    var searchPaths = [];

    packages.forEach(function(packageConfig) {
        var sassConfig = packageConfig.sass;
        var scriptsConfig = packageConfig.scripts;

        if(sassConfig) {
            searchPaths.push(packageConfig.basePath + sassConfig.src);
        }

        if(scriptsConfig) {
            searchPaths.push(packageConfig.basePath + scriptsConfig.src);
        }
    });

    gulp.src(searchPaths)
        .pipe(modernizr(modernizrConfig.fileName, modernizrConfig.config))
        .on('error', Logger)
        .pipe(gulp.dest(modernizrConfig.destPath))
});
