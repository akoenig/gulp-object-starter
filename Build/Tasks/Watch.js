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

        if(sassConfig && sassConfig.src) {
            sassPaths.push(basePath + sassConfig.src);
        }

        if(scriptsConfig && scriptsConfig.src) {
            scriptPaths.push(basePath + scriptsConfig.src + (scriptsConfig.filePattern || '**/*.js'))
        }
    });

    gulp.watch(sassPaths, ['compile:sass']);
    gulp.watch(scriptPaths, ['compile:scripts']);
});
