var gulp = require('gulp');

gulp.task('compress', ['minify:scripts', 'minify:styles', 'minify:images']);
