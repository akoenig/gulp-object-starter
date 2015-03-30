var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var config = require('./../Config.js');
var packagesRepository = require('./../Packages.js');
var packages = packagesRepository.getPackages();

gulp.task('lint', function() {
    'use strict';

    var scriptPaths = [];

    packages.forEach(function(packageConfig) {
        var scriptsConfig = packageConfig.scripts;

        if(scriptsConfig) {
            scriptPaths.push(packageConfig.basePath + scriptsConfig.src);
        }
    });

    return gulp.src(scriptPaths)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs(config.jscs));
});
