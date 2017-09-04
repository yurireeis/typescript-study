'use strict';

const gulp      = require('gulp');
const clean     = require('gulp-clean');
const ts        = require('gulp-typescript');
const merge     = require('merge-stream');
const concat    = require('gulp-concat');
const cssmin    = require('gulp-cssmin');
const rename    = require('gulp-rename');
const bs        = require('browser-sync');
const bsrfy     = require('gulp-browserify');

const tsProject = ts.createProject('tsconfig.json');
const tsProject2 = ts.createProject('tsconfig.json', {
    declaration: true,
    noImplicitAny: true
});

const APPROOT = 'app/';
const SRCROOT = 'src/';

const SRCPATH = {
    css: {
        app: [SRCROOT + 'css/'],
        bootstrap: ['./node_modules/bootstrap/dist/css/']
    },
    libs: SRCROOT + 'lib/',
    externalLibs: [
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.js',
        './node_modules/angular-messages/angular-messages.js',
        './node_modules/angular-locale-pt-br/angular-locale_pt-br.js'
    ]
};

const APPPATH = {
    libs: APPROOT + 'libs/',
    css: APPROOT + 'css/'
};

gulp.task('html', ['clean-html'], function () {
    return gulp.src([
        SRCROOT + '*.html',
        SRCROOT + 'view/*.html'
    ], {base: 'src/'})
    .pipe(gulp.dest(APPROOT));
});

gulp.task('clean-html', function () {
    return gulp.src([
        APPROOT + '*.html',
        APPROOT + '**/views/*.html'
    ], {
       read: false,
       force: true
    }).pipe(clean());
});

gulp.task('css-min', function () {

    var css = gulp.src([
      SRCPATH.css.app + '*.css',
      SRCPATH.css.bootstrap + '*.css',
    ]);

    return merge(css)
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(APPPATH.css));

});

gulp.task('ts-output', function () {
    var tsResult =  gulp.src([
        SRCROOT + '*.ts',
        SRCROOT + '**/**/*.ts',
        SRCROOT + '**/*.ts'
    ], {
        base: 'src/'
    }).pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(APPROOT));
});

gulp.task('scripts', function () {
    gulp.src(SRCPATH.externalLibs)
        .pipe(concat('main.js'))
        .pipe(bsrfy())
        .pipe(gulp.dest(APPPATH.libs));

    gulp.src([SRCPATH.libs + '**/*.ts'])
      .pipe(tsProject2())
      .pipe(concat('internal.js'))
      .pipe(bsrfy())
      .pipe(gulp.dest(APPPATH.libs));

});

gulp.task('serve', function () {
    bs.init([
        APPROOT + '*.js',
        APPROOT + '**/view/*.html',
        APPROOT + '**/**/*.js',
        APPROOT + '**/*.js',
        APPPATH.libs + '*.js',
        APPPATH.css + ' *.css'
    ], { server: { baseDir: APPROOT }});
});

gulp.task('watch', [
    'html',
    'ts-output',
    'css-min',
    'scripts',
    'serve'
], function () {
    gulp.watch([SRCROOT + '*.html', SRCROOT + '**/view/*.html'], ['html']);
    gulp.watch([SRCROOT + '*.ts', SRCROOT + '**/**/*.ts'], ['ts-output']);
    gulp.watch([SRCPATH.css + '*.css'], ['css-min']);
    gulp.watch([SRCPATH.externalLibs, SRCPATH.libs], ['scripts']);
});

gulp.task('default', ['html', 'ts-output', 'css-min', 'scripts']);
gulp.task('dev', ['watch']);
