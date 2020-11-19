"use strict";

var gulp = require("gulp");
var del = require("del");
var server = require("browser-sync").create();
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");

var postcss = require("gulp-postcss");
/*var posthtml = require("gulp-posthtml");*/
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');


gulp.task("css", function () {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLeve: 3
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin())
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build")
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    index: "index.min.html"
  });

  gulp.watch("source/scss/**/*.{sass,scss}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/*.js", gulp.series("js", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "html",
  "js"
));

gulp.task("start", gulp.series("build", "server"));
