'use strict';

angular.module('iTravel', ['ui.router', 'ui.bootstrap'])
	.config(function($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/');
	    
	    // define states here...
	    $stateProvider
	        .state('xxx', {
	            url: '/xxx',
	            controller: 'xxx',
	            templateUrl: 'xxx.html'
	        });
	});