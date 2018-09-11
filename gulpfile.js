'use strict';


var gulp = require('gulp');
var gulpwatch = require('gulp-watch');
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

gulp.task('sass', function(){
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('stylesheets/'))

});

gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);


// gulp.task('default', ['sass','watch']);

// gulp.task('sass', function(done){
//   return gulp.src('sass/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('stylesheets/'))
//     done();
// });


// gulp.task('watch', function(done){
//   return watch('sass/*.scss', ['sass']);
//    done();
// });

// gulp.task('default', ['sass','watch']);

// gulp.task('watch', function(){
//   gulp.watch('sass/*.scss', {cwd: './'}, ['sass']);
// });

// gulp.task('sass', function(){
//   return gulp.src('sass/*.scss')
//   return watch('sass/*.scss', { ignoreInitial: false })
//     .pipe(sass())
//     .pipe(gulp.dest('stylesheets/'))
// });

// gulp.task('default', ['sass']);



// gulp.task('watch', function(){
//   return watch('sass/*.scss', function () {
//         gulp.src('sass/*.scss')
//             .pipe(gulp.dest('stylesheets/'));
//     });
// });
//


// gulp.task('watch', function(done){
//   gulp.watch('sass/*.scss', ['sass']);
//   done();
// });

// Watch on windows
// gulp.task('sass', function(done) {
//   done();
// });
// gulp.task('watch', function(done) {
//   done();
// });


// gulp.task('default',['sass']);


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

// gulp.task('test', function() {
//   console.log('test task');
// });
// gulp.task('default',['hello','sass']);
