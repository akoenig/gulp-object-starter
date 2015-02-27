var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');

gulp.task('compile:scripts', function () {
    config.packages.forEach(function(packageConfig) {
        var scriptsConfig = packageConfig.scripts;
        var bundles = scriptsConfig.bundles;

        if(!scriptsConfig) {
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
