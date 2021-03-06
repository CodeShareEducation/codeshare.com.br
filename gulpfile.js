var gulp      = require('gulp'),
  plumber     = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  stylus      = require('gulp-stylus'),
  uglify      = require('gulp-uglify'),
  concat      = require('gulp-concat'),
  jeet        = require('jeet'),
  rupture     = require('rupture'),
  koutoSwiss  = require('kouto-swiss'),
  prefixer    = require('autoprefixer-stylus'),
  imagemin    = require('gulp-imagemin'),
  cp          = require('child_process');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  var npm = (process.platform === "win32" ? "jekyll.bat" : "jekyll")
  return cp.spawn(npm, ['build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

/**
 * Stylus task
 */
gulp.task('stylus', function(){
    gulp.src('src/styl/main.styl')
    .pipe(plumber())
    .pipe(stylus({
      use:[koutoSwiss(), prefixer(), jeet(),rupture()],
      compress: true
    }))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'))
});

/**
 * Javascript Task
 */
gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
});

/**
 * Service Worker Task
 */
gulp.task('sw', ['jekyll-build'], function () {	
  return gulp.src('./sw.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./_site/'))
});

/**
 * Imagemin Task
 */
gulp.task('imagemin', function() {
  return gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('assets/img/'));
});

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('src/styl/**/*.styl', ['stylus']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
  gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'sw', 'stylus', 'imagemin', 'browser-sync', 'watch']);
