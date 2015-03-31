var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function(packageModel) {
	'use strict';

	var packageConfig = packageModel.options;
	var packageName = packageConfig.name;
	var packageBasePath = packageConfig.basePath;
	var imagesConfig = packageConfig.images;

	if(!imagesConfig) {
		return this;
	}

	return gulp.task('compile:images:' + packageName, function() {
		return gulp.src(packageBasePath + imagesConfig.src + imagesConfig.filePattern)
			.pipe(imagemin(imagesConfig.settings))
			.on('error', Logger)
			.pipe(gulp.dest(packageBasePath + imagesConfig.dest));
	});
};
