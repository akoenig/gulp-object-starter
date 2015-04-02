var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
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
		var bundleOptions = bundle.options;
		var taskName = 'compile:scripts:' + packageName + ':' + bundle.name;

		config.tasks.push(taskName);

		return gulp.task(taskName, function() {
			var b = browserify(browserifyConfig);

			if(bundleOptions.external) {
				b.external(bundleOptions.external);
			}
			if(bundleOptions.ignore) {
				b.ignore(bundleOptions.ignore);
			}
			if(bundleOptions.exclude) {
				b.exclude(bundleOptions.exclude);
			}
			if(bundleOptions.require) {
				b.require(bundleOptions.require);
			}

			return b.bundle()
				.on('error', Logger)
				.pipe(source(browserifyConfig.outputName))
				.pipe(gulp.dest(browserifyConfig.dest));
		});
	});
};
