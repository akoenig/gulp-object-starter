var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function minifyImages(packageModel) {
	'use strict';

	var packageConfig = packageModel.options;
	var packageName = packageConfig.name;
	var packageBasePath = packageConfig.basePath;
	var imagesConfig = packageConfig.images;
	var taskName = 'minify:images:' + packageName;

	if(!imagesConfig) {
		return this;
	}

	config.tasks.push(taskName);

	return gulp.task(taskName, function() {
		return gulp.src(packageBasePath + imagesConfig.src + imagesConfig.filePattern)
			.pipe(imagemin(imagesConfig.settings))
			.on('error', Logger)
			.pipe(gulp.dest(packageBasePath + imagesConfig.dest));
	});
};
