
'use strict';

angular.module('iTravelApp', ['ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps']);

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

}])
.config(function(uiGmapGoogleMapApiProvider) {
uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDT32xVCkqxlZQz5DQly-1-6j7RlsouvM8',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
});
});
.run(['$httpProvider',' $location', function($httpProvider, $location) {
    $httpProvider.interceptors.push(['$q', function($q) {
      return {
        'response': function(res) {
           if(res.status === 401) {
                $location.url('/login')
                return $q.reject(res.status);
           }
        }
      };
    }]);
}])

