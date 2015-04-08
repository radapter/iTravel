var gulp           = require('gulp');
var gutil          = require('gulp-util');
var bower          = require('gulp-bower');
var autoprefixer   = require('gulp-autoprefixer');
var minifycss      = require('gulp-minify-css');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var inject         = require('gulp-inject');
var rimraf         = require('gulp-rimraf');
var plumber        = require('gulp-plumber');

var path           = require('path');
var series         = require('stream-series');
var mainBowerFiles = require('main-bower-files');

// Configuration
var config = {
  port: 8080,
  paths: {
    source:   {
      root:   './',
      views:  './views',
      tmpls:  './public/templates',
      js:     './public/js',
      styles: './public/stylesheets',
      images: './public/img',
      fonts:  './public/fonts',
      vendor: './vendor'
    },
    build: {
      root:   './build',
      views:  './build/views',
      tmpls:  './build/public/templates',
      js:     './build/pulic/js',
      styles: './build/pulic/css',
      images: './build/pulic/img',
      fonts:  './build/pulic/fonts',
    },
    bowerRoot: './bower_components',
    injectionPoints: ['./views/index.ejs']
  }
};

gulp.task('default', ['dev:build']);

// prepare js/css files and inject them into index.ejs
gulp.task('dev:build', ['dev:style', 'dev:js'], function(next){
	var dependencyStream = gulp.src([
			config.paths.source.vendor + '/**/*.js',
			config.paths.source.vendor + '/**/*.css'
			]);
	var assetsStream = gulp.src([
			config.paths.source.js + '/**/*.js',
			config.paths.source.styles + '/**/*.css'
			], {read: false});
	var injectPointStream = gulp.src(config.paths.injectionPoints, {base: './'});

	// inject dependencies(jquery, angular) and other assets
	injectPointStream.pipe(inject(series(dependencyStream, assetsStream)))
		.pipe(gulp.dest('./'));

	next();
});

//  process css files in development environment
gulp.task('dev:style', ['clean', 'bower'], function(next) {
	// add vendor prefixes and replace the original file
	gulp.src(config.paths.source.styles + '/**/*.css', {base: './'})
	    .pipe(autoprefixer({
	        browsers: ['last 3 versions'],
	        cascade: false
	    }))
	    .pipe(gulp.dest('./'));
	next();
});

// process js files in development environment
gulp.task('dev:js', ['clean','bower'], function(next) {
	next();
});

// clean build folder
gulp.task('clean', function(next) {
	gutil.log('Clean up build folder...');
	rimraf(config.paths.build.root);
	next();
});

gulp.task('bower', ['bower-install', 'bower-mainfiles'], function(next){

	next();
});

// install 3rd party front-end libraries with bower
gulp.task('bower-install', function(){
	return bower();
});

// copy main files of 3rd libraries to vendor folder
gulp.task('bower-mainfiles', ['bower-install'], function(){
	gutil.log('Move all main files to', config.paths.source.vendor, '...');

    return gulp.src(mainBowerFiles(), { base: config.paths.bowerRoot })
            .pipe(gulp.dest(config.paths.source.vendor));
});