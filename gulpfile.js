var gulp = require('gulp')
// var sass = require('gulp-sass')

// css
var cleanCss = require("gulp-clean-css")
var postcss = require("gulp-postcss")
var sourcemaps = require("gulp-sourcemaps")
var concat = require("gulp-concat")

// browser refresh
var browserSync = require('browser-sync').create()

// images
var imagemin = require('gulp-imagemin')

//git hub pages
var ghpages = require("gh-pages")

// sass.compiler = require('node-sass');

gulp.task("css", function () {
  // we want to run "sass css/app.scss app.css --watch"
  return gulp.src([
    "src/css/reset.css",
    "src/css/typography.css",
    "src/css/app.css"
  ])
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        require("autoprefixer"),
        require("postcss-preset-env")({
          stage: 1,
          browsers: ["IE 11", "last 2 versions"]
        })
      ])
      )
    .pipe(concat("app.css"))
    // .pipe(sass())
    .pipe(
      cleanCss({
        compatibility: 'ie8'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("img", function () {
  return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function () {

  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })


  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/*", ["css"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["img"])
})

gulp.task("deploy", function () {
  ghpages.publish("dist")
})

gulp.task('default', ["html", "css", "fonts", "img", "watch"]);