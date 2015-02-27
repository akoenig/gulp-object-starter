var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var config = require('./../Config');

gulp.task('compress', function() {
    config.packages.forEach(function(packageConfig) {
        var packageBasePath = packageConfig.basePath;
        var scriptsConfig = packageConfig.scripts;
        var sassConfig = packageConfig.sass;

        if(scriptsConfig) {
            gulp.src(packageBasePath + scriptsConfig.dest + '/**/*.js')
                .pipe(uglify())
                .pipe(gulp.dest(packageBasePath + scriptsConfig.dest));
        }

        if(sassConfig) {
            gulp.src(packageBasePath + sassConfig.dest + '/**/*.css')
                .pipe(minifyCSS())
                .pipe(gulp.dest(packageBasePath + sassConfig.dest));
        }
    });
});
