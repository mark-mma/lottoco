'use strict';


var gulp = require('gulp');
// var monitorCtrlC = require('monitorctrlc');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');


//Watch for 'Ctrl + C' on Windows and end gulp process
if (process.platform === "win32") {
  require("readline")
    .createInterface({
      input: process.stdin,
      output: process.stdout
    })
    .on("SIGINT", function () {
      process.emit("SIGINT");
    });
}
process.on("SIGINT", function () {
  // graceful shutdown
  process.exit();
});

// start gulp tasks
gulp.task('hello', function() {
  console.log('Hello test');
});

gulp.task('sass', function(){
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('stylesheets/'))
});

gulp.task('watch', function(){
  gulp.watch('sass/*.scss', ['sass']);

})

// gulp.task('default',['hello','sass']);


// gulp.task ('sass', function() {
//     return gulp.src ('./sass/*.scss')
//       .pipe(sass())
//       .pipe(gulp.dest('./stylesheets'));
//   }
// )
// gulp.task('default',['sass']);

// gulp.task('workflow', function () {
//   gulp.src('./sass/*.scss')
//
//   .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer({
//       browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'],
//       cascade: false
//     }))
//     .pipe(cssnano())
//     .pipe(sourcemaps.write('./'))
//
//
//   .pipe(gulp.dest('./stylesheets/dist/'))
// });
//
// gulp.task('default', function () {
//   gulp.watch('./sass/*.scss', ['workflow']);
//
// });
