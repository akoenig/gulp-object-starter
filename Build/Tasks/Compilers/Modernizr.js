var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');
var packages = require('./../../Index.js').getPackages();
var modernizrConfig = config.modernizr;

gulp.task('compile:modernizr', function() {
	'use strict';

	var searchPaths = [];

	packages.forEach(function(packageModel) {
		var packageConfig = packageModel.options;
		var packageBasePath = packageConfig.basePath;
		var sassConfig = packageConfig.sass;
		var scriptsConfig = packageConfig.scripts;

		if(sassConfig) {
			searchPaths.push(packageBasePath + sassConfig.src + sassConfig.filePattern);
		}

		if(scriptsConfig) {
			searchPaths.push(packageBasePath + scriptsConfig.src + scriptsConfig.filePattern);
		}
	});

	return gulp.src(searchPaths)
		.pipe(modernizr(modernizrConfig.fileName, modernizrConfig.config))
		.on('error', Logger)
		.pipe(gulp.dest(modernizrConfig.destPath))
});
