'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// gulp.task ('sass', function() {
//     return gulp.src ('./sass/*.scss')
//       .pipe(sass())
//       .pipe(gulp.dest('./stylesheets'));
//   }
// )
// gulp.task('default',['sass']);

gulp.task('workflow', function () {
  gulp.src('./sass/*.scss')

  .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))


  .pipe(gulp.dest('./stylesheets/dist/'))
});

gulp.task('default', function () {
  gulp.watch('./sass/*.scss', ['workflow']);
});
