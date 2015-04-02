var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function(packageModel) {
	'use strict';

	var packageConfig = packageModel.options;
	var packageName = packageConfig.name;
	var packageBasePath = packageConfig.basePath;
	var scriptsConfig = packageConfig.scripts;
	var bundles = scriptsConfig.bundles;
	var srcBasePath = packageBasePath + scriptsConfig.src;
	var destBasePath = packageBasePath + scriptsConfig.dest;

	if(!scriptsConfig) {
		return this;
	}

	return bundles.forEach(function(bundle) {
		var browserifyConfig = {
			entries: bundle.src ? './' + srcBasePath + bundle.src : null,
			dest: destBasePath,
			outputName: bundle.dest,
			transform: bundle.transform
		};
		var bundleSettings = bundle.settings;
		var taskName = 'compile:scripts:' + packageName + ':' + bundle.name;

		config.tasks.push(taskName);

		return gulp.task(taskName, function() {
			var b = browserify(browserifyConfig);

			if(bundleSettings.external) {
				b.external(bundleSettings.external);
			}
			if(bundleSettings.ignore) {
				b.ignore(bundleSettings.ignore);
			}
			if(bundleSettings.exclude) {
				b.exclude(bundleSettings.exclude);
			}
			if(bundleSettings.require) {
				b.require(bundleSettings.require);
			}

			return b.bundle()
				.on('error', Logger)
				.pipe(source(browserifyConfig.outputName))
				.pipe(buffer())
				.pipe(gulpif(config.project.isInLiveMode, uglify()))
				.pipe(gulp.dest(browserifyConfig.dest));
		});
	});
};
