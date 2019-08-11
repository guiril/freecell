const gulp = require('gulp')
const autoprefixer = require('autoprefixer')
const $ = require('gulp-load-plugins')()

var paths = {
  buildHTML: {
    src: './source/**/!(_)*.pug',
    dest: './public'
  },
  styles: {
    src: './source/scss/**/*.scss',
    dest: './public/css'
  }
}

function buildHTML () {
  return gulp.src(paths.buildHTML.src)
    .pipe($.plumber())
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.buildHTML.dest))
}

function styles () {
  var plugins = [
    autoprefixer()
  ]
  return gulp.src(paths.styles.src)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe(gulp.dest(paths.styles.dest))
}

function watch () {
  gulp.watch(paths.buildHTML.src, buildHTML)
  gulp.watch(paths.styles.src, styles)
}

var build = gulp.series(watch, gulp.parallel(buildHTML, styles))

exports.buildHTML = buildHTML
exports.styles = styles
exports.watch = watch
exports.build = build

exports.default = build
