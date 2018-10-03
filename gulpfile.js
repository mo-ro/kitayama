// Load plugins
var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    // lr = require('tiny-lr'),
    // server = lr();
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch');


gulp.task('browserSync', function() {
  browserSync({server: {baseDir: 'dist/'}});
});

gulp.task('bsReload', () => {
  browserSync.reload();
});

gulp.task('pug', function() {
  return gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // .pipe(changed(paths.dest))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});

// Default task
// gulp.task('default', ['clean', 'browserSync'], function() {
//     gulp.watch(['styles', 'scripts', 'images']);
// });

// Watch
gulp.task('default', ['clean', 'browserSync'], function() {

  // server.listen(3000, '127.0.0.1', function (err) {
  //   if (err) {
  //     return console.log(err)
  //   };

    watch('src/pug/**/*.pug', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.start(['pug']);
    });

    // Watch .scss files
    watch('src/styles/**/*.scss', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.start(['styles']);
    });

    // Watch .js files
    watch('src/scripts/**/*.js', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.start(['scripts']);
    });

    // Watch image files
    watch('src/images/**/*', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.start(['images']);
    });

    watch('dist/', function() {
      gulp.start(['bsReload']);
    });

});