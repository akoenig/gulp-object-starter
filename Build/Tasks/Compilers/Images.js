var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');

gulp.task('compile:images', function () {
    config.extensions.forEach(function(extensionConfig) {
        var imagesConfig = extensionConfig.images;
        var extensionBasePath = extensionConfig.basePath;

        if(!imagesConfig || !extensionBasePath) {
            return this;
        }

        return gulp.src(extensionBasePath + imagesConfig.src)
            .pipe(imagemin(imagesConfig.settings))
            .on('error', Logger)
            .pipe(gulp.dest(extensionBasePath + imagesConfig.dest));
    });
});
