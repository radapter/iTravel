
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
        .when("/users/:id", {
            templateUrl: "templates/user/profile.html",
            controller: "UserShowCtrl"
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

        //venue selection pages
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


        //footer url pages
        .when("/aboutus", {templateUrl: "templates/footerPages/aboutus.html"})
        .when("/contact", {templateUrl: "templates/footerPages/contact.html"})
        .when("/locations", {
            templateUrl: "templates/footerPages/locations.html",
            controller: "GoogleMapCtrl"
        })
        .when("/tech", {templateUrl: "templates/footerPages/tech.html"})
        .when("/privacy", {templateUrl: "templates/footerPages/privacy.html"})
        .when("/security", {templateUrl: "templates/footerPages/security.html"})
        .when("/developer", {templateUrl: "templates/footerPages/developer.html"})

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

