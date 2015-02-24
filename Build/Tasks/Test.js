var gulp = require('gulp');
var jshint = require('gulp-jshint');
var config = require('./../Config');

gulp.task('test', function() {
    config.extensions.forEach(function(extensionConfig) {
        var jsConfig = extensionConfig.scripts;
        var bundles = jsConfig.bundles;

        if(!jsConfig || !bundles) {
            return this;
        }

        return gulp.src(extensionConfig.basePath + jsConfig.src + '*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });
});