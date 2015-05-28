var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Logger = require('./../Utilities/Logger.js');
var esLintConfig = require('./../.ESLintConfig');
var config = require('./../Config.js');
var packages = require('./../Index.js').getPackages();

gulp.task('lint', function lint() {
    'use strict';

    var scriptPaths = [];

    // Loop over each pacakge, and push search paths, if the package has js sources.
    packages.forEach(function (packageModel) {
        var packageConfig = packageModel.options;
        var scriptsConfig = packageConfig.scripts;

        if (scriptsConfig) {
            scriptPaths.push(packageConfig.basePath + scriptsConfig.src + scriptsConfig.filePattern);
        }
    });

    // Kick-off the gulp-plugins which will lint all paths.
    return gulp.src(scriptPaths)
        .pipe(plugins.eslint(esLintConfig))
        .pipe(plugins.eslint.format())
        .on('error', Logger)
        .pipe(plugins.jscs(config.jscs))
        .on('error', Logger);
});
