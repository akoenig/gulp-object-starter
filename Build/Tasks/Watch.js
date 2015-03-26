var gulp = require('gulp');
var config = require('./../Config');
var packages = require('./../Packages.js');

gulp.task('watch', function() {
    'use strict';

    var sassPaths = [];
    var scriptPaths = [];

    // Loop over each package and push the relevant paths to the referenced arrays.
    packages.forEach(function(packageConfig) {
        var packageBasePath = packageConfig.basePath;
        var sassConfig = packageConfig.sass;
        var scriptsConfig = packageConfig.scripts;

        if(sassConfig) {
            sassPaths.push(packageBasePath + sassConfig.src);
        }

        if(scriptsConfig) {
            scriptPaths.push(packageBasePath + scriptsConfig.src)
        }
    });

    gulp.watch(sassPaths, ['compile:sass']);
    gulp.watch(scriptPaths, ['compile:scripts']);
});
