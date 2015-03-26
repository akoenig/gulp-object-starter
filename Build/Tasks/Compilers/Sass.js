var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');
var packages = require('./../../Packages.js');

gulp.task('compile:sass', function() {
    'use strict';

    packages.forEach(function(packageConfig) {
        var sassConfig = packageConfig.sass;
        var packageBasePath = packageConfig.basePath;

        if(!sassConfig) {
            return this;
        }

        return gulp.src(packageBasePath + sassConfig.src)
            .pipe(sass(sassConfig.settings))
            .on('error', Logger)
            .pipe(autoprefixer({ browsers: ['last 2 version'] }))
            .on('error', Logger)
            .pipe(gulp.dest(packageBasePath + sassConfig.dest));
    });
});
