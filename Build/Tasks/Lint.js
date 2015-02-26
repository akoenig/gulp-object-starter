var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var config = require('./../Config');

gulp.task('lint', function() {
    var scriptPaths = [];

    config.packages.forEach(function(packageConfig) {
        var scriptsConfig = packageConfig.scripts;
        var bundles = scriptsConfig.bundles;

        if(!scriptsConfig || !bundles) {
            return this;
        }

        scriptPaths.push(packageConfig.basePath + scriptsConfig.src + (scriptsConfig.filePattern || '**/*.js'));
    });

    return gulp.src(scriptPaths)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs(config.jscs));
});