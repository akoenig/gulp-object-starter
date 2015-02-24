var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');

gulp.task('compile:js', function () {
    config.extensions.forEach(function(extensionConfig) {
        var jsConfig = extensionConfig.scripts;
        var bundles = jsConfig.bundles;

        if(!jsConfig || !bundles) {
            return this;
        }

        bundles.forEach(function(bundleConfig) {
            // Fix the paths, since we can't reference to 'this' in the config, and don't want that much repetition of path references.
            bundleConfig.entries = './' + extensionConfig.basePath + jsConfig.src + bundleConfig.entries;
            bundleConfig.dest = './' + extensionConfig.basePath + jsConfig.dest;

            return browserify(bundleConfig)
                .bundle()
                .on('error', Logger)
                .pipe(source(bundleConfig.outputName))
                .pipe(gulp.dest(bundleConfig.dest));
        });
    });
});