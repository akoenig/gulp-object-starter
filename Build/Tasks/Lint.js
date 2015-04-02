var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var Logger = require('./../Utilities/Logger.js');
var esLintConfig = require('./../.ESLintConfig');
var config = require('./../Config.js');
var packages = require('./../Index.js').getPackages();

gulp.task('lint', function lint() {
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
		.pipe(eslint(esLintConfig))
		.pipe(eslint.format())
		.on('error', Logger)
		.pipe(jscs(config.jscs))
		.on('error', Logger);
});
