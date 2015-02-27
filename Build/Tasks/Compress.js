var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('./../Config');

gulp.task('compress', function() {
    config.packages.forEach(function(packageConfig) {
        var scriptsConfig = packageConfig.scripts;
        var packageBasePath = packageConfig.basePath;

        if(!scriptsConfig) {
            return;
        }

        return gulp.src(packageBasePath + scriptsConfig.dest + '/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest(packageBasePath + scriptsConfig.dest));
    });
});
