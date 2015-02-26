var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');

gulp.task('compile:scripts', function () {
    config.packages.forEach(function(packageConfig) {
        var jsConfig = packageConfig.scripts;
        var bundles = jsConfig.bundles;

        if(!jsConfig || !bundles) {
            return this;
        }

        bundles.forEach(function(bundleConfig) {
            return browserify(bundleConfig)
                .bundle()
                .on('error', Logger)
                .pipe(source(bundleConfig.outputName))
                .pipe(gulp.dest(bundleConfig.dest));
        });
    });
});