
'use strict';

angular.module('iTravelApp', ['ngRoute', 'ui.bootstrap']);

/**
 * Configure the Routes
 */
angular.module('iTravelApp')
    .config( function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {
            templateUrl: "partials/home.html"
        })
        //user pages
        .when("/login", {
            templateUrl: "partials/login.html"
        })
        .when("/signup", {
            templateUrl: "partials/signup.html"
        })

        //venue selector pages
        .when("/attraction", {
            templateUrl: "partials/attraction.html"
        })
        .when("/restaurant", {
            templateUrl: "partials/restaurant.html"
        })
        .when("/hotel", {
            templateUrl: "partials/hotel.html"
        })

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
        .when("/plan", {
            templateUrl: "partials/plan.html"
        })
        .when("/travel", {
            templateUrl: "partials/travel.html"
        })

        //footer url pages
        .when("/aboutus", {templateUrl: "partials/aboutus.html"})
        .when("/contact", {templateUrl: "partials/contact.html"})
        .when("/locations", {templateUrl: "partials/locations.html"})
        .when("/tech", {templateUrl: "partials/tech.html"})
        .when("/privacy", {templateUrl: "partials/privacy.html"})
        .when("/security", {templateUrl: "partials/security.html"})
        .when("/developer", {templateUrl: "partials/developer.html"})

        // else error
        .otherwise("/error", {templateUrl: "partials/error.html"});
});

