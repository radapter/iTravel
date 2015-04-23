'use strict';

var gulp           = require('gulp');
var gutil          = require('gulp-util');
var bower          = require('gulp-bower');
var autoprefixer   = require('gulp-autoprefixer');
var minifycss      = require('gulp-minify-css');
var concat         = require('gulp-concat');
var rename         = require('gulp-rename');
var uglify         = require('gulp-uglify');
var inject         = require('gulp-inject');
var rimraf         = require('gulp-rimraf');
var plumber        = require('gulp-plumber');
var nodemon        = require('gulp-nodemon');
var livereload     = require('gulp-livereload');
var runSequence    = require('run-sequence');
var ngAnnotate     = require('gulp-ng-annotate');
var gulpFilter     = require('gulp-filter');

var path           = require('path');
var series         = require('stream-series');
var streamqueue    = require('streamqueue');
var mainBowerFiles = require('main-bower-files');

// Configuration
var config = {
  port: 8080,
  paths: {
    source:   {
		root:   	'./',
		views:  	'./views',
		public:		'./public',
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
		vendor: 	'./build/public/vendor'
    },
    bowerRoot: './bower_components',
    injectionPoints: ['./views/index.ejs']
  }
};

gulp.task('default', ['dev:build', 'dev:server', 'dev:watch']);

// start server and watch for changes of all .js files, excpet static assets
gulp.task('dev:server', ['dev:build'], function() {
	// livereload.listen();
	nodemon({
	  	script: './bin/www',
	  	ext: 'js',
	  	ignore: ['public/*', 'build/*', 'node_modules/*', 'bower_components/*'],
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('dev:watch', ['dev:build'], function() {
	gutil.log('[dev:watch] Start watching for changes in public/ and views/');
	
	// watch for js and css changes
	// TODO: gulp.watch des not watch for added file, and gulp-watch package throw exceptions, so keep it as is for now
	gulp.watch([
		config.paths.source.js+'/**/*',
		config.paths.source.styles+'/**/*',
		config.paths.injectionPoints
	], function(evt){
		gutil.log('[dev:watch] File ' + evt.path + ' has been ' + evt.type + ', now updating the views...');
		if (evt.type !== 'deleted') {
			runSequence(['dev:styles', 'dev:scripts'], 'dev:inject');
		} else {
			runSequence('dev:inject');
		}
	});

	// watch for other changes under server/public folder
	gulp.watch([
		config.paths.source.public+'/**/*',
		'!'+config.paths.source.styles+'/**',
		'!'+config.paths.source.js+'/**'
	], function(evt) {
		if (evt.type !== 'deleted') {
			gutil.log('[dev:watch] File ' + evt.path + ' has been ' + evt.type + ', now syncing it to build DIR...');
			gulp.src(evt.path, {base: './'})
				.pipe(gulp.dest(config.paths.build.root));
		}
	});
});


gulp.task('dev:build', function(next) {
	runSequence('clean',['copy', 'bower', 'dev:styles', 'dev:scripts'], 'dev:inject', next);
});

// inject all assets into index.ejs in development environment
gulp.task('dev:inject', function() {
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
gulp.task('dev:styles', function() {
	// add vendor prefixes and replace the original file
	return gulp.src(config.paths.source.styles + '/**/*.css', {base: './'})
	    .pipe(autoprefixer({
	        browsers: ['last 3 versions'],
	        cascade: false
	    }))
	    .pipe(gulp.dest(config.paths.build.root));
});

// process js files in development environment
gulp.task('dev:scripts', function() {
	return gulp.src(config.paths.source.js + '/**/*.js', {base: './'})
		.pipe(gulp.dest(config.paths.build.root));
});

gulp.task('prod:build', function(next) {
	runSequence('clean',['copy', 'bower'], 'prod:styles', 'prod:scripts', 'prod:inject', next);
});

gulp.task('prod:inject', function() {
		var assetsStream, injectPointStream;

		gutil.log('prod:inject start...');

		assetsStream = gulp.src([
				config.paths.build.js + '/**/*.js',
				config.paths.build.styles + '/**/*.css'
				], {read: false});
		injectPointStream = gulp.src(config.paths.injectionPoints, {base: './views'});
		// inject dependencies(jquery, angular) and other assets to injection points
		// and copy them to build dir, overwriting original files if needed 
		return injectPointStream.pipe(inject(assetsStream, 
			{ignorePath: '/build/public', addRootSlash: false}))
			.pipe(gulp.dest(config.paths.build.views));
});

gulp.task('prod:styles', function() {
	// add vendor prefixes and replace the original file
	return streamqueue({ objectMode: true },
			gulp.src(mainBowerFiles({paths: {bowerDirectory: config.paths.build.vendor}}))
			.pipe(gulpFilter('**/*.css')),
			gulp.src(config.paths.source.styles + '/**/*.css')
				.pipe(autoprefixer({
					browsers: ['last 3 versions'],
					cascade: false
				}))
		)
	    .pipe(concat('style.min.css'))
		.pipe(minifycss())
	    .pipe(gulp.dest(config.paths.build.styles));
});

gulp.task('prod:scripts', function() {
	return streamqueue({ objectMode: true },
			gulp.src(mainBowerFiles({paths: {bowerDirectory: config.paths.build.vendor}}))
			.pipe(gulpFilter(['**/*.js', '!**/*.min.js'])),
			gulp.src(config.paths.source.js + '/**/*.js')
				.pipe(ngAnnotate())
		)
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.paths.build.js));
});


// copy images, fonts, templates, and partials to build dir
gulp.task('copy', function () {
	return gulp.src(
		[
			config.paths.source.images + '/**/*',
			config.paths.source.fonts + '/**/*',
			config.paths.source.tmpls + '/**/*',
            config.paths.source.partials + '/**/*'
		],
		{base: './'}
		)
		.pipe(gulp.dest(config.paths.build.root));
});

// clean build folder
gulp.task('clean', function() {
	// gutil.log('cwd:', __dirname+'/build/public');
	gutil.log('Clean up build folder...');
	return gulp.src(config.paths.build.root).pipe(rimraf());
});

gulp.task('bower', function() {
	return bower().pipe(gulp.dest(config.paths.build.vendor));
});