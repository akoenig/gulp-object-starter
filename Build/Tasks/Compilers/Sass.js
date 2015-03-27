var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');

module.exports = function(packageModel) {
    'use strict';

    var packageConfig = packageModel.options;
	var sassConfig = packageConfig.sass;
    var packageBasePath = packageConfig.basePath;

    if(!sassConfig) {
        return this;
    }

    return gulp.src(packageBasePath + sassConfig.src)
        .pipe(sass(sassConfig.settings))
        .on('error', Logger)
        .pipe(autoprefixer({
            browsers: config.project.browserSupport
        }))
        .on('error', Logger)
        .pipe(gulp.dest(packageBasePath + sassConfig.dest));
};