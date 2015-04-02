var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function minifyScripts(packageModel) {
	'use strict';

	var packageConfig = packageModel.options;
	var packageName = packageConfig.name;
	var packageBasePath = packageConfig.basePath;
	var scriptsConfig = packageConfig.scripts;
	var taskName = 'minify:scripts:' + packageName;

	if(!scriptsConfig) {
		return this;
	}

	config.tasks.push(taskName);

	return gulp.task(taskName, function() {
		return gulp.src(packageBasePath + scriptsConfig.dest + '/**/*.js')
			.pipe(plugins.uglify())
			.on('error', Logger)
			.pipe(gulp.dest(packageBasePath + scriptsConfig.dest));
	});
};
