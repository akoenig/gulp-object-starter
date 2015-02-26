var gulp = require('gulp');
var jshint = require('gulp-jshint');
var config = require('./../Config');

gulp.task('test', function() {
    var scriptPaths = [];

    config.packages.forEach(function(packageConfig) {
        var jsConfig = packageConfig.scripts;
        var bundles = jsConfig.bundles;

        if(!jsConfig || !bundles) {
            return this;
        }

        scriptPaths.push(packageConfig.basePath + jsConfig.src + '*.js');
    });

    return gulp.src(scriptPaths)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});