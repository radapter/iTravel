'use strict';

angular.module("iTravelApp")
    .controller("VenuesShowCtrl", function ($scope, Venue, $routeParams) {

        //request GET venue from venue service
        //Venue.find($routeParams.id)
        //    .success(function (data) {
        //        console.log("get user "+ $routeParams.id+ " success");
        //        console.log(data);
        //        $scope.user = data;
        //    });

        $scope.venue = {
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
                }
            ],
            "url": "http:\/\/sweetmangosweet.com",
            "rating": 8.7
        };



    });
