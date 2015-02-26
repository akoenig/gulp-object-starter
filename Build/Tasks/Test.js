var gulp = require('gulp');
var jshint = require('gulp-jshint');
var config = require('./../Config');

gulp.task('test', function() {
    config.packages.forEach(function(packageConfig) {
        var jsConfig = packageConfig.scripts;
        var bundles = jsConfig.bundles;

        if(!jsConfig || !bundles) {
            return this;
        }

        return gulp.src(packageConfig.basePath + jsConfig.src + '*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });
});