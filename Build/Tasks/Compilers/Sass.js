var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = {
	requiredKeysObject: {
		'sass': ['src', 'dest', 'filePattern']
	},
	createTask: function createTask(packageModel) {
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
				.pipe(plugins.sass(sassConfig.settings))
				.on('error', Logger)
				.pipe(plugins.autoprefixer({
					browsers: config.project.browserSupport
				}))
				.on('error', Logger)
				.pipe(plugins.if(config.project.isInLiveMode, plugins.minifyCss()))
				.pipe(gulp.dest(packageBasePath + sassConfig.dest));
		});
	}
};
