var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var config = require('./../Config');

gulp.task('lint', function() {
    var scriptPaths = [];

    config.packages.forEach(function(packageConfig) {
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
