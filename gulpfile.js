// gulp.js

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const minify = require("gulp-csso");
const rename = require("gulp-rename");

const webpack = require('webpack-stream');

const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const run = require("run-sequence");
const del = require("del");

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task('js', function() {
  return gulp.src("source/js/main.js")
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest("build/js"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js", ["js"]);
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "html",
    "js",
    done
  );
});

gulp.task("copy", function() {
  return gulp.src([
    "source/img/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});
