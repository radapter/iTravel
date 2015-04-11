'use strict';

var app = angular.module('iTravelApp', [
	'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        // Pages
        .when("/login", {templateUrl: "partials/login.html", controller: "PageCtrl"})
        .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})
        .when("/travel", {templateUrl: "partials/travel.html", controller: "PageCtrl"})
        // else error
        .otherwise("/error", {templateUrl: "partials/error.html", controller: "PageCtrl"});
}]);


/*angular.module('iTravel', ['ui.router', 'ui.bootstrap'])
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
*/
