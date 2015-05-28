var gulp = require('gulp');
var config = require('./../Config.js');
var packages = require('./../Index.js').getPackages();

gulp.task('watch', function watch() {
    'use strict';

    var sassPaths = [];
    var scriptPaths = [];

    // Loop over each package, and push the paths to the coresponding array.
    packages.forEach(function (packageModel) {
        var packageConfig = packageModel.options;

        if (packageConfig.sass) {
            sassPaths = sassPaths.concat(packageModel.getBasePaths('sass'));
        }

        if (packageConfig.scripts) {
            scriptPaths = scriptPaths.concat(packageModel.getBasePaths('scripts'));
        }
    });

    // Kick off the watchers.
    gulp.watch(sassPaths, ['compile:sass']);
    gulp.watch(scriptPaths, ['compile:scripts']);
});
