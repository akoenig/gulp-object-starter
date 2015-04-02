var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function(packageModel) {
	'use strict';

	var packageConfig = packageModel.options;
	var packageName = packageConfig.name;
	var packageBasePath = packageConfig.basePath;
	var sassConfig = packageConfig.sass;
	var taskName = 'compile:sass:' + packageName;

	if(!sassConfig) {
		return this;
	}

	config.tasks.push(taskName);

	return gulp.task(taskName, function() {
		return gulp.src(packageBasePath + sassConfig.src + sassConfig.filePattern)
			.pipe(sass(sassConfig.settings))
			.on('error', Logger)
			.pipe(autoprefixer({
				browsers: config.project.browserSupport
			}))
			.on('error', Logger)
			.pipe(gulpif(config.project.isInLiveMode, minifyCSS()))
			.pipe(gulp.dest(packageBasePath + sassConfig.dest));
	});
};
