'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');

const tsProject = ts.createProject({
    declaration: true,
    noImplicitAny: true,
    
});

const APPROOT = 'app/';
const SRCROOT = 'src/';

const SRCPATH = {
    html: SRCROOT + 'views/',
    ts: [
        SRCROOT,
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

gulp.task('ts-output', function () {
    var SRC = SRCPATH.ts.map(function (t) { return t + '*.ts' });

    var tsResult =  gulp.src(SRC)
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(APPPATH.js))
});

gulp.task('watch', ['html', 'ts-output'], function () {
    gulp.watch([SRCPATH.html + '*.html'], ['html']);
    gulp.watch([SRCPATH.ts + '*.ts'], ['ts-output']);
});

gulp.task('default', ['html', 'ts-output']);
gulp.task('dev', ['watch']);