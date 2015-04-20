'use strict';

angular.module("iTravelApp")
    .controller("VenueSelectorCtrl", function ($scope, Venue) {

        $scope.tempSelectedVenues = [];

        //should we predefine some categories or dynamiclly generate form the results
        $scope.categories = ['All', 'Asian', 'Mexican', 'Fast Food'];

        //connection to Venue service to get all the venues
        //Venue.explore.then(function () {
        //    $scope.venues = Venue.searchResults; //?how to triger retrieve the data?
        //});

        $scope.saveAttractions = function (attractions) {
            console.log(attractions);
            $scope.tempSelectedVenues.push(attractions);

        };
        $scope.saveRestaurants = function (restaurants) {
            console.log(restaurants);
            $scope.tempSelectedVenues.push(restaurants);

        };
        $scope.saveHotels = function (hotels) {
            console.log(hotels);
            $scope.tempSelectedVenues.push(hotels);

        };


        //test venue data
        $scope.venues = [
            {
                "id": "4c1ec8c2fcf8c9b630daad0b",
                "name": "Sweet Mango",
                "contact": {
                    "phone": "4082932268",
                    "formattedPhone": "(408) 293-2268",
                    "twitter": "sweetmangosweet"
                },
                "location": {
                    "address": "1040 Willow St",
                    "crossStreet": "at Blewett Ave",
                    "lat": 37.308915853500366,
                    "lng": -121.899623,
                    "distance": 2001,
                    "postalCode": "95125",
                    "cc": "US",
                    "city": "San Jose",
                    "state": "CA",
                    "country": "United States",
                    "formattedAddress": [
                        "1040 Willow St (at Blewett Ave)",
                        "San Jose, CA 95125",
                        "United States"
                    ]
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d142941735",
                        "name": "Asian Restaurant",
                        "pluralName": "Asian Restaurants",
                        "shortName": "Asian",
                        "icon": {
                            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/asian_",
                            "suffix": ".png"
                        },
                        "primary": true
                    },
                    {
                        "id": "4bf58dd8d48988d142941736",
                        "name": "Asian Restaurant1",
                        "pluralName": "Asian Restaurants1",
                        "shortName": "Asian1",
                        "icon": {
                            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/asian_",
                            "suffix": ".png"
                        },
                        "primary": true
                    }
                ],
                "url": "http:\/\/sweetmangosweet.com",
                "rating": 8.7
            },
            {
                "id": "533c3a77498ec8161039cebd",
                "name": "Chick-fil-A",
                "contact": {
                    "phone": "4089756102",
                    "formattedPhone": "(408) 975-6102",
                    "facebook": "313501065044",
                    "facebookUsername": "EatMorChikin",
                    "facebookName": "Eat Mor Chikin Cowz"
                },
                "location": {
                    "address": "2280 Monterey Hwy",
                    "lat": 37.30286884462097,
                    "lng": -121.85984967071536,
                    "distance": 1812,
                    "postalCode": "95112",
                    "cc": "US",
                    "city": "San Jose",
                    "state": "CA",
                    "country": "United States",
                    "formattedAddress": [
                        "2280 Monterey Hwy",
                        "San Jose, CA 95112",
                        "United States"
                    ]
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d16e941735",
                        "name": "Fast Food Restaurant",
                        "pluralName": "Fast Food Restaurants",
                        "shortName": "Fast Food",
                        "icon": {
                            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/fastfood_",
                            "suffix": ".png"
                        },
                        "primary": true
                    }
                ],
                "url": "http:\/\/www.chick-fil-a.com",
                "rating": 8.6
            },
            {
                "id": "42cc7080f964a520ea251fe3",
                "name": "Aqui Cal-Mex",
                "contact": {
                    "phone": "4089950381",
                    "formattedPhone": "(408) 995-0381"
                },
                "location": {
                    "address": "1145 Lincoln Ave",
                    "crossStreet": "at Willow St.",
                    "lat": 37.307631637547466,
                    "lng": -121.90084218978882,
                    "distance": 2031,
                    "postalCode": "95125",
                    "cc": "US",
                    "city": "San Jose",
                    "state": "CA",
                    "country": "United States",
                    "formattedAddress": [
                        "1145 Lincoln Ave (at Willow St.)",
                        "San Jose, CA 95125",
                        "United States"
                    ]
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1c1941735",
                        "name": "Mexican Restaurant",
                        "pluralName": "Mexican Restaurants",
                        "shortName": "Mexican",
                        "icon": {
                            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/mexican_",
                            "suffix": ".png"
                        },
                        "primary": true
                    }
                ],
                "url": "http:\/\/www.aquicalmex.com",
                "rating": 9.1
            }
        ];



    });