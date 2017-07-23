
var gulp = require('gulp');

// CREATING BROWSER-SYNC INSTANCE
var bs = require('browser-sync').create(); 


// JSCS & JS-HINT 

var notify = require('gulp-notify');
var growl = require('gulp-notify-growl');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('jscs', function() {
    gulp.src(['./public/custom_javascript/*.js'])
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Congrats !'
        }))
});

gulp.task('lint', function() {
    gulp.src(['./public/custom_javascript/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }))
});



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

