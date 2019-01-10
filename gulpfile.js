var gulp = require('gulp');
var tsify = require('tsify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
let uglify6 = require('gulp-uglify-es').default;
var reactify = require('reactify');
var runSequence = require('run-sequence');
var hash = require('gulp-hash');
var filenames = require("gulp-filenames");
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');

var path = {
    MINIFIED_OUT: 'app.min.js',
    OUT: 'app.js',
    DEST_SRC: 'dist/js',
    ENTRY_POINT: 'src/ts/main.tsx',
    SASS_SRC: './src/**/*.scss',
    CSS_DEST: 'dist/styles',
    INDEX_SRC: 'src/index.html',
    INDEX_DEST: 'dist',
    LIB_DEST: 'lib.js',
    VENDORS: [
        'react',
        'react-dom',
        'es6-promise',
        'react-router',
        'redux',
        'react-redux',
        'redux-actions',
        'react-router-redux',
        'history',
        'lodash',
        'rxjs',
    ]
};

gulp.task('sass', function () {
    return gulp.src(path.SASS_SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(hash())
        .pipe(gulp.dest(path.CSS_DEST))
        .pipe(filenames("css"));
});

gulp.task('vendors', function () {
    return gulp.src([
        './node_modules/promise-polyfill/promise.min.js',
        './node_modules/js-polyfills/polyfill.min.js'
    ])
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('lib', () => {
    const b = browserify({
        debug: true
    });

    path.VENDORS.forEach(lib => {
        b.require(lib);
    });

    return b.bundle()
        .pipe(source(path.LIB_DEST))
        .pipe(buffer())
        .pipe(uglify6())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(hash())
        .pipe(gulp.dest(path.DEST_SRC))
        .pipe(filenames("lib"));
});

gulp.task('html', function () {
    console.log("files: ", JSON.stringify(filenames.get("lib")), JSON.stringify(filenames.get("js")), JSON.stringify(filenames.get("css")));
    return gulp.src(path.INDEX_SRC)
        .pipe(htmlreplace({
            'js': {
                src: filenames.get("js")[0],
                tpl: '<script src="/js/%s"></script>'
            },
            'lib': {
                src: filenames.get("lib")[0],
                tpl: '<script src="/js/%s"></script>'
            },
            'css': {
                src: filenames.get("css")[0],
                tpl: '<link rel="stylesheet" type="text/css" href="/styles/%s">'
            }
        }))
        .pipe(gulp.dest(path.INDEX_DEST));
});

gulp.task('prod', function (cb) {
    return browserify()
        .add(path.ENTRY_POINT)
        .plugin(tsify, {
            noImplicitAny: false
        })
        .external(path.VENDORS)
        .transform(reactify)
        .bundle()
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(source(path.MINIFIED_OUT))
        .pipe(buffer())
        .pipe(uglify6()
            .on('error', function (err) {
                gutil.log(gutil.colors.red('[Error]'), err.toString()); 
            }))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(hash())
        .pipe(gulp.dest(path.DEST_SRC))
        .pipe(filenames("js"));
});

gulp.task('copy-mock', function (cb) {
    return gulp
        .src('./__mocks__/pages/**/*')
        .pipe(gulp.dest('./dist/pages'));
});

//TASKS
gulp.task('prod-build', function (callback) {
    runSequence('prod', 'lib', 'sass', 'html', 'vendors', 'copy-mock', callback);
})

gulp.task('build:prod', function (cb) {
    runSequence('prod-build');
});