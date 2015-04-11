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
var nodemon        = require('gulp-nodemon');
var livereload     = require('gulp-livereload');

var path           = require('path');
var series         = require('stream-series');
var mainBowerFiles = require('main-bower-files');

// Configuration
var config = {
  port: 8080,
  paths: {
    source:   {
		root:   	'./',
		views:  	'./views',
		tmpls:  	'./public/templates',
		partials: 	'./public/partials',
		js:     	'./public/js',
		styles: 	'./public/stylesheets',
		images: 	'./public/img',
		fonts:  	'./public/fonts'
    },
    build: {
		root:   	'./build',
		views:  	'./build/views',
		tmpls:  	'./build/public/templates',
		partials: 	'./build/public/partials',
		js:     	'./build/public/js',
		styles: 	'./build/public/stylesheets',
		images: 	'./build/public/img',
		fonts:  	'./build/public/fonts',
		vendor: 	'./build/public/vendor',
    },
    bowerRoot: './bower_components',
    injectionPoints: ['./views/index.ejs']
  }
};

gulp.task('default', ['dev:build', 'dev:server']);

gulp.task('dev:server', ['dev:build'], function() {
	// livereload.listen();
	nodemon({
	  	script: './bin/www',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('dev:build', ['dev:inject']);

// inject css/js into index.ejs in development environment
gulp.task('dev:inject', ['dev:style', 'dev:js', 'copy'], function(){
	var dependencyStream, assetsStream, injectPointStream;

	gutil.log('dev:inject start...');
	dependencyStream = gulp.src(mainBowerFiles({paths: {bowerDirectory: config.paths.build.vendor}}), {base: config.paths.build.vendor});
	assetsStream = gulp.src([
			config.paths.build.js + '/**/*.js',
			config.paths.build.styles + '/**/*.css'
			], {read: false});
	injectPointStream = gulp.src(config.paths.injectionPoints, {base: './views'});
	// inject dependencies(jquery, angular) and other assets to injection points
	// and copy them to build dir, overwriting original files if needed 
	return injectPointStream.pipe(inject(series(dependencyStream, assetsStream),
        {ignorePath:'build/public', addRootSlash: false}))
		.pipe(gulp.dest(config.paths.build.views));
});

//  process css files in development environment
gulp.task('dev:style', ['clean', 'bower'], function() {
	// add vendor prefixes and replace the original file
	return gulp.src(config.paths.source.styles + '/**/*.css', {base: './'})
	    .pipe(autoprefixer({
	        browsers: ['last 3 versions'],
	        cascade: false
	    }))
	    .pipe(gulp.dest('./build'));
});

// process js files in development environment
gulp.task('dev:js', ['clean', 'bower'], function() {
	return gulp.src(config.paths.source.js + '/**/*.js', {base: './'})
		.pipe(gulp.dest('./build'));
});

// copy images, fonts, templates, and partials to build dir
gulp.task('copy', ['clean'], function() {
	return gulp.src(
		[
			config.paths.source.images + '/**/*',
			config.paths.source.fonts + '/**/*',
			config.paths.source.tmpls + '/**/*',
            config.paths.source.partials + '/**/*'
		],
		{base: './'}
		)
		.pipe(gulp.dest('./build'));
});

// clean build folder
gulp.task('clean', function() {
	return gutil.log('Clean up build folder...');
	rimraf(config.paths.build.root);
});

gulp.task('bower', ['bower-install', 'bower-mainfiles']);

// install 3rd party front-end libraries with bower
gulp.task('bower-install', function(){
	return bower();
});

// copy all files of 3rd libraries to vendor folder
gulp.task('bower-mainfiles', ['clean', 'bower-install'], function(){
	gutil.log('Move all vendor files to', config.paths.build.vendor, '...');

    return gulp.src([config.paths.bowerRoot+'/**/*'], { base: config.paths.bowerRoot })
            .pipe(gulp.dest(config.paths.build.vendor));
});