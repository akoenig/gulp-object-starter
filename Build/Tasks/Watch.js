var gulp = require('gulp');
var config = require('./../Config');


gulp.task('watch', function() {
    var sassPaths = [];
    var scriptPaths = [];

    // Loop over each extension and push the relevant paths to the referenced arrays.
    config.extensions.forEach(function(extension) {
        var basePath = extension.basePath;
        var sassConfig = extension.sass;
        var scriptsConfig = extension.scripts;

        if(sassConfig && sassConfig.src) {
            sassPaths.push(basePath + sassConfig.src);
        }

        if(scriptsConfig && scriptsConfig.src) {
            scriptPaths.push(basePath + scriptsConfig.src + (scriptsConfig.watchPattern || '**/*.js'))
        }
    });

    gulp.watch(sassPaths, ['compile:css']);
    gulp.watch(scriptPaths, ['compile:js']);
});
