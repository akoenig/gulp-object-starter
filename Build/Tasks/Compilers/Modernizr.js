var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var config = require('./../../Config');
var modernizrConfig = config.modernizr;

gulp.task('compile:modernizr', function() {
    var searchPaths = [];

    config.packages.forEach(function(packageConfig) {
        var sassConfig = packageConfig.sass;
        var scriptsConfig = packageConfig.scripts;

        if(sassConfig) {
            searchPaths.push(packageConfig.basePath + sassConfig.src);
        }

        if(scriptsConfig) {
            searchPaths.push(packageConfig.basePath + scriptsConfig.src + (scriptsConfig.filePattern || '**/*.js'));
        }
    });

    gulp.src(searchPaths)
        .pipe(modernizr(modernizrConfig.fileName, modernizrConfig.config))
        .pipe(gulp.dest(modernizrConfig.destPath))
});