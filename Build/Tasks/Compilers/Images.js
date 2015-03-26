var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');
var packagesRepository = require('./../../Packages.js');
var packages = packagesRepository.gePackages();

gulp.task('compile:images', function() {
    'use strict';

    packages.forEach(function(packageConfig) {
        var imagesConfig = packageConfig.images;
        var packageBasePath = packageConfig.basePath;

        if(!imagesConfig) {
            return this;
        }

        return gulp.src(packageBasePath + imagesConfig.src)
            .pipe(imagemin(imagesConfig.settings))
            .on('error', Logger)
            .pipe(gulp.dest(packageBasePath + imagesConfig.dest));
    });
});
