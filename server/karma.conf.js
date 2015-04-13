module.exports = function (config) {
    'use strict';
    config.set({
 
        basePath: '',
 
        frameworks: ['mocha', 'chai'],
 
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/jquery/jquery.js',
            'bower_components/lodash/lodash.js',
            'node_modules/angular-mocks/angular-mocks.js',

            'public/js/main.js',
            'public/js/services/*.js',
            'public/js/test/services.spec.js'
        ],
 
        reporters: ['spec'],
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'
      ],
 
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
 
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
 
        browsers: ['PhantomJS'],

 
    });
};