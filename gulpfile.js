'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync');

const APPROOT = 'app/';
const SRCROOT = 'src/';

const SRCPATH = {
    html: SRCROOT + 'views/',
    js: [
        SRCROOT + 'config/',
        SRCROOT + 'controllers/',
        SRCROOT + 'directives/',
        SRCROOT + 'filters/',
        SRCROOT + 'interceptors/',
        SRCROOT + 'services/'
    ]
};

const APPPATH = {
    css: APPROOT + 'css/',
    js: APPROOT + 'js/'
};

gulp.task('html', ['clean-html'], function () {
    return gulp.src(SRCPATH.html + '*.html')
        .pipe(gulp.dest(APPROOT));
});

gulp.task('clean-html', function () {
   return gulp.src(APPROOT + '*.html', {
       read: false,
       force: true
   }).pipe(clean());
});

gulp.task('watch', ['html'], function () {
    gulp.watch([SRCPATH.html + '*.html'], ['html']);
});

gulp.task('default', ['html']);
gulp.task('dev', ['watch']);