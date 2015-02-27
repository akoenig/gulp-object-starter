var gulp = require('gulp');
var config = require('./../Config');


gulp.task('watch', function() {
    var sassPaths = [];
    var scriptPaths = [];

    // Loop over each package and push the relevant paths to the referenced arrays.
    config.packages.forEach(function(packageConfig) {
        var basePath = packageConfig.basePath;
        var sassConfig = packageConfig.sass;
        var scriptsConfig = packageConfig.scripts;

        if(sassConfig) {
            sassPaths.push(basePath + sassConfig.src);
        }

        if(scriptsConfig) {
            scriptPaths.push(basePath + scriptsConfig.src)
        }
    });

    gulp.watch(sassPaths, ['compile:sass']);
    gulp.watch(scriptPaths, ['compile:scripts']);
});
