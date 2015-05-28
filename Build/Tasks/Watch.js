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
        var packageBasePath = packageConfig.basePath;
        var sassConfig = packageConfig.sass;
        var scriptsConfig = packageConfig.scripts;

        if (sassConfig) {
            sassPaths.push(packageBasePath + sassConfig.src + sassConfig.filePattern);
        }

        if (scriptsConfig) {
            scriptPaths.push(packageBasePath + scriptsConfig.src + scriptsConfig.filePattern)
        }
    });

    // Kick off the watchers.
    gulp.watch(sassPaths, ['compile:sass']);
    gulp.watch(scriptPaths, ['compile:scripts']);
});
