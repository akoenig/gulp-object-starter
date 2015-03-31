var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var config = require('./../Config.js');
var packages = require('./../Index.js').getPackages();

gulp.task('lint', function() {
	'use strict';

	var scriptPaths = [];

	packages.forEach(function(packageModel) {
		var packageConfig = packageModel.options;
		var scriptsConfig = packageConfig.scripts;

		if(scriptsConfig) {
			scriptPaths.push(packageConfig.basePath + scriptsConfig.src + scriptsConfig.filePattern);
		}
	});

	return gulp.src(scriptPaths)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jscs(config.jscs));
});
