
'use strict';

angular.module('iTravelApp', ['ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps']);

/**
 * Configure the Routes
 */
angular.module('iTravelApp')
.config( ['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
        // Home
        .when("/", {
            templateUrl: "templates/home.html"
        })

        //user pages
        .when("/login", {
            templateUrl: "templates/user/login.html",
            controller: "LoginCtrl"
        })
        .when("/signup", {
            templateUrl: "templates/user/signup.html",
            controller: "SignupCtrl"
        })

        //venue selector pages
        //.when("/attraction", {
        //    templateUrl: "partials/attraction.html"
        //})
        //.when("/restaurant", {
        //    templateUrl: "partials/restaurant.html"
        //})
        //.when("/hotel", {
        //    templateUrl: "partials/hotel.html"
        //})

        //-- sample venue selector page, using the same controller
        .when("/attractionsSelect", {
            templateUrl: "templates/venueSelector/attractionsSelect.html",
            controller: "VenueSelectorCtrl"
        })
        .when("/restaurantsSelect", {
            templateUrl: "templates/venueSelector/restaurantsSelect.html",
            controller: "VenueSelectorCtrl"
        })
        .when("/hotelsSelect", {
            templateUrl: "templates/venueSelector/hotelsSelect.html",
            controller: "VenueSelectorCtrl"
        })

        //venue pages
        .when("/venues/:id", {
            templateUrl: "templates/venues/venues-show.html",
            controller: "VenuesShowCtrl"
        })

        //what's this for???
        //.when("/plan", {
        //    templateUrl: "partials/plan.html"
        //})
        //.when("/travel", {
        //    templateUrl: "partials/travel.html"
        //})

	//footer url pages
        .when("/aboutus", {templateUrl: "templates/aboutus.html"})
        .when("/contact", {templateUrl: "templates/contact.html"})
        .when("/locations", {
            templateUrl: "templates/locations.html",
            controller: "GoogleMapCtrl"
        })
        .when("/tech", {templateUrl: "templates/tech.html"})
        .when("/privacy", {templateUrl: "templates/privacy.html"})
        .when("/security", {templateUrl: "templates/security.html"})
        .when("/developer", {templateUrl: "templates/developer.html"})

        // else error
        .otherwise("/error", {templateUrl: "templates/error.html"});

        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
          return {
            'response': function(originalRes) {

                if(originalRes.status === 401) {
                    return deferred.reject(originalRes.status);
                    $location.url('/login');
               } else {
                    return originalRes;
               }

            }
            };
        }]);

}])
.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDT32xVCkqxlZQz5DQly-1-6j7RlsouvM8',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
}]);

