'use strict';

angular.module('iTravelApp', [
	'ngRoute'
])

/**
 * Configure the Routes
 */
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})

        // Pages
        .when("/login", {templateUrl: "partials/login.html", controller: "PageCtrl"})
        .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})
        .when("/travel", {templateUrl: "partials/travel.html", controller: "PageCtrl"})
        .when("/aboutus", {templateUrl: "partials/aboutus.html", controller: "PageCtrl"})
		.when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
        .when("/locations", {templateUrl: "partials/locations.html", controller: "PageCtrl"})
        .when("/tech", {templateUrl: "partials/tech.html", controller: "PageCtrl"})
        .when("/privacy", {templateUrl: "partials/privacy.html", controller: "PageCtrl"})
        .when("/security", {templateUrl: "partials/security.html", controller: "PageCtrl"})
        .when("/developer", {templateUrl: "partials/developer.html", controller: "PageCtrl"})

        // else error
        .otherwise("/error", {templateUrl: "partials/error.html", controller: "PageCtrl"});
}]);