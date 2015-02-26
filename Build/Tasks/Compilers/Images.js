var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');

gulp.task('compile:images', function () {
    config.packages.forEach(function(packageConfig) {
        var imagesConfig = packageConfig.images;
        var extensionBasePath = packageConfig.basePath;

        if(!imagesConfig) {
            return this;
        }

        return gulp.src(extensionBasePath + imagesConfig.src)
            .pipe(imagemin(imagesConfig.settings))
            .on('error', Logger)
            .pipe(gulp.dest(extensionBasePath + imagesConfig.dest));
    });
});
