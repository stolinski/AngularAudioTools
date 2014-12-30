var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var ngAnnotate = require('gulp-ng-annotate');
var rupture = require('rupture');

// Compiles and compresses Stylus files to CSS
gulp.task('css', function() {
    gulp.src('./at-ui/styl/main.styl')
        .pipe(stylus({
            compress: true,
            use: [rupture()]
        }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(gulp.dest('./at-ui/'));
});

// Watches styl/ files for changes and then runs 'css' task
gulp.task('watch:css', function() {
    gulp.watch('./at-ui/**/*.styl', ['css']);
});

// Dev task fires css and js watch tasks
gulp.task('dev', ['watch:css']);


gulp.task('js', function() {
    gulp.src(['ng/module.js', 'ng/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('assets'));
});

gulp.task('css', function() {
    gulp.src('stylus/main.styl')
        .pipe(stylus({
            use: [jeet(), rupture(), typographic()]
        }))
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['js'], function() {
    gulp.watch('ng/**/*.js', ['js']);
});