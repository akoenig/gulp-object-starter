var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = {
	requiredKeysObject: {
		'images': ['src', 'dest', 'filePattern', 'settings']
	},
	createTask: function createTask(packageModel) {
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
				.pipe(plugins.imagemin(imagesConfig.settings))
				.on('error', Logger)
				.pipe(gulp.dest(packageBasePath + imagesConfig.dest));
		});
	}
};
