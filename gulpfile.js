var gulp = require('gulp')
var autoprefixer = require('autoprefixer')
var $ = require('gulp-load-plugins')()

gulp.task('pug', function buildHTML () {
  return gulp.src('./source/**/!(_)*.pug')
    .pipe($.plumber())
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('sass', function () {
  var plugins = [
    autoprefixer()
  ]
  return gulp.src('./source/scss/**/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', function () {
  gulp.watch('./source/**/*.pug', ['pug'])
  gulp.watch('./source/scss/**/*.scss', ['sass'])
})

gulp.task('default', ['pug', 'sass', 'watch'])
