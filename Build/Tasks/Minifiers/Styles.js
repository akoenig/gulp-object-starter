var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function minifyStyles(packageModel) {
	'use strict';

	var packageConfig = packageModel.options;
	var packageName = packageConfig.name;
	var packageBasePath = packageConfig.basePath;
	var sassConfig = packageConfig.sass;
	var taskName = 'minify:styles:' + packageName;

	if(!sassConfig) {
		return this;
	}

	config.tasks.push(taskName);

	return gulp.task(taskName, function() {
		return gulp.src(packageBasePath + sassConfig.dest + '/**/*.css')
			.pipe(minifyCSS())
			.on('error', Logger)
			.pipe(gulp.dest(packageBasePath + sassConfig.dest));
	});
};
