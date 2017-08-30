'use strict';

const gulp      = require('gulp');
const clean     = require('gulp-clean');
const ts        = require('gulp-typescript');
const merge     = require('merge-stream')
const concat    = require('gulp-concat');
const cssmin    = require('gulp-cssmin');
const rename    = require('gulp-rename');
const bs        = require('browser-sync');

const tsProject = ts.createProject({
    declaration: true,
    noImplicitAny: true

});

const APPROOT = 'app/';
const SRCROOT = 'src/';

const SRCPATH = {
    html: SRCROOT + 'views/',
    css: {
        app: [SRCROOT + 'css/'],
        bootstrap: ['./node_modules/bootstrap/dist/css/']
    },
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
    js: APPROOT + 'js/',
    css: APPROOT + 'css/'
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

gulp.task('css-min', function () {
    var cssSRC = [];

    SRCPATH.css.app.map(function (t) { cssSRC.push(t + '*.css') });
    SRCPATH.css.bootstrap.map(function (t) { cssSRC.push(t + '*.css') });

    var css = gulp.src(cssSRC);

    return merge(css)
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('ts-output', function () {
    var src = SRCPATH.ts.map(function (t) { return t + '*.ts' });

    var tsResult =  gulp.src(src)
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(APPPATH.js))
});

gulp.task('watch', ['html', 'ts-output', 'css-min'], function () {
    gulp.watch([SRCPATH.html + '*.html'], ['html']);
    gulp.watch([SRCPATH.ts + '*.ts'], ['ts-output']);
    gulp.watch([SRCPATH.css + '*.css'], ['css-min']);
});

gulp.task('default', ['html', 'ts-output', 'css-min']);
gulp.task('dev', ['watch']);