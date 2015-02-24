var requireDir = require('require-dir');

// Require all Tasks in ./Build/Tasks
requireDir('./Build/Tasks', {
    recurse: true
});

gulp.task('default', ['build']);