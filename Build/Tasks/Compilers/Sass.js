var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config');

gulp.task('compile:sass', function () {
    config.packages.forEach(function(packageConfig) {
        var sassConfig = packageConfig.sass;
        var extensionBasePath = packageConfig.basePath;

        if(!sassConfig) {
            return this;
        }

        return gulp.src(extensionBasePath + sassConfig.src)
            .pipe(sass(sassConfig.settings))
            .on('error', Logger)
            .pipe(autoprefixer({ browsers: ['last 2 version'] }))
            .on('error', Logger)
            .pipe(gulp.dest(extensionBasePath + sassConfig.dest));
    });
});
