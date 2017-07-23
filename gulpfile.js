
var gulp = require('gulp');
var bs = require('browser-sync').create(); // creating a browser sync instance.

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.watch("public/*.html").on('change', bs.reload);
gulp.watch("public/custom_javascript/*.js").on('change', bs.reload);
gulp.watch("public/custom_stylesheets/*.css").on('change', bs.reload);

