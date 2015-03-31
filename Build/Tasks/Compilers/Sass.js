var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function(packageModel) {
	'use strict';

	var packageConfig = packageModel.options;
	var packageName = packageConfig.name;
	var packageBasePath = packageConfig.basePath;
	var sassConfig = packageConfig.sass;

	if(!sassConfig) {
		return this;
	}

	return gulp.task('compile:sass:' + packageName, function() {
		return gulp.src(packageBasePath + sassConfig.src + sassConfig.filePattern)
			.pipe(sass(sassConfig.settings))
			.on('error', Logger)
			.pipe(autoprefixer({
				browsers: config.project.browserSupport
			}))
			.on('error', Logger)
			.pipe(gulp.dest(packageBasePath + sassConfig.dest));
	});
};
