(function() {
    'use strict';
    angular.module("iTravelApp")
        .controller("VenueSelectorCtrl", function ($scope, Venue) {

        $scope.tempSelectedVenues = [];

        //should we predefine some categories or dynamiclly generate form the results
        $scope.attractionCategories = [
            {"cat": "All", "val": true},
            {"cat": "Scenic", "val": false},
            {"cat": "Park", "val": false}
        ];

        $scope.attractionSorts = [
            {"sort": "Rating"},
            {"sort": "Distance (m)"},
            {"sort": "Popularity"}
        ];

        $scope.attractionSortDefault = {value: "Rating"};
        //console.log($scope.attractionSortDefault);
        //console.log($scope.categories);


        //use this one OR test data
        //connection to Venue service to get all the venues
        //console.log(Venue.searchResults);
        //$scope.venues = Venue.searchResults;

        //for LATER modified use
        //$scope.attractionsVenues = Venue.searchResults.attractions;
        //$scope.restVenues = Venue.searchResults.restVenues;
        //$scope.hotelVenues = Venue.searchResults.hotelVenues;

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

        $scope.addVenue = function (attraction) {
            console.log("clicked");
            if ($scope.tempSelectedVenues.indexOf(attraction) == -1) {
                $scope.saveAttractions(attraction);
            }
            else {
                var index = $scope.tempSelectedVenues.indexOf(attraction);
                $scope.tempSelectedVenues.splice(index, 1);
                console.log($scope.tempSelectedVenues);
            }
        };


        //test venue data
        $scope.venues = [
            {
                "attractions": [
                    {
                        "id": "4c29567f9fb5d13aa2139b57",
                        "name": "Twin Peaks Summit",
                        "contact": {
                            "phone": "4158316331",
                            "formattedPhone": "(415) 831-6331"
                        },
                        "location": {
                            "address": "100 Christmas Tree Point Rd",
                            "lat": 37.75468625308481,
                            "lng": -122.44641694942544,
                            "postalCode": "94114",
                            "cc": "US",
                            "city": "San Francisco",
                            "state": "CA",
                            "country": "United States",
                            "formattedAddress": [
                                "100 Christmas Tree Point Rd",
                                "San Francisco, CA 94114",
                                "United States"
                            ]
                        },
                        "categories": [
                            {
                                "id": "4bf58dd8d48988d165941735",
                                "name": "Scenic Lookout",
                                "pluralName": "Scenic Lookouts",
                                "shortName": "Scenic Lookout",
                                "icon": {
                                    "prefix": "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/sceniclookout_",
                                    "suffix": ".png"
                                },
                                "primary": true
                            }
                        ],
                        "verified": false,
                        "stats": {
                            "checkinsCount": 23996,
                            "usersCount": 15316,
                            "tipCount": 180
                        },
                        "url": "http://sfrecpark.org/destination/twin-peaks/",
                        "rating": 9.7,
                        "ratingColor": "00B551",
                        "ratingSignals": 394,
                        "hours": {
                            "isOpen": false
                        },
                        "specials": {
                            "count": 0,
                            "items": []
                        },
                        "photos": {
                            "count": 4309,
                            "groups": []
                        },
                        "hereNow": {
                            "count": 2,
                            "summary": "2 people are checked in here",
                            "groups": [
                                {
                                    "type": "others",
                                    "name": "Other people here",
                                    "count": 2,
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "445e36bff964a520fb321fe3",
                        "name": "Golden Gate Park",
                        "contact": {
                            "phone": "4158312700",
                            "formattedPhone": "(415) 831-2700",
                            "twitter": "recparksf",
                            "facebook": "111004257911",
                            "facebookUsername": "sfrecpark",
                            "facebookName": "San Francisco Recreation and Park Department"
                        },
                        "location": {
                            "address": "501 Stanyan St",
                            "crossStreet": "btwn Fulton St & Lincoln Way",
                            "lat": 37.76878957103581,
                            "lng": -122.4819052219391,
                            "postalCode": "94117",
                            "cc": "US",
                            "city": "San Francisco",
                            "state": "CA",
                            "country": "United States",
                            "formattedAddress": [
                                "501 Stanyan St (btwn Fulton St & Lincoln Way)",
                                "San Francisco, CA 94117",
                                "United States"
                            ]
                        },
                        "categories": [
                            {
                                "id": "4bf58dd8d48988d163941735",
                                "name": "Park",
                                "pluralName": "Parks",
                                "shortName": "Park",
                                "icon": {
                                    "prefix": "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/park_",
                                    "suffix": ".png"
                                },
                                "primary": true
                            }
                        ],
                        "verified": false,
                        "stats": {
                            "checkinsCount": 46802,
                            "usersCount": 26537,
                            "tipCount": 196
                        },
                        "url": "http://sfrecpark.org",
                        "hasMenu": true,
                        "rating": 9.7,
                        "ratingColor": "00B551",
                        "ratingSignals": 537,
                        "menu": {
                            "type": "Menu",
                            "label": "Menu",
                            "anchor": "View Menu",
                            "url": "https://foursquare.com/v/golden-gate-park/445e36bff964a520fb321fe3/menu",
                            "mobileUrl": "https://foursquare.com/v/445e36bff964a520fb321fe3/device_menu"
                        },
                        "hours": {
                            "isOpen": false
                        },
                        "specials": {
                            "count": 0,
                            "items": []
                        },
                        "photos": {
                            "count": 2775,
                            "groups": []
                        },
                        "hereNow": {
                            "count": 0,
                            "summary": "Nobody here",
                            "groups": []
                        }
                    },
                    {
                        "id": "49bacd63f964a520b0531fe3",
                        "name": "Lands End",
                        "contact": {},
                        "location": {
                            "address": "El Camino Del Mar",
                            "crossStreet": "at Point Lobos Ave",
                            "lat": 37.78315503056424,
                            "lng": -122.51118555665016,
                            "postalCode": "94121",
                            "cc": "US",
                            "city": "San Francisco",
                            "state": "CA",
                            "country": "United States",
                            "formattedAddress": [
                                "El Camino Del Mar (at Point Lobos Ave)",
                                "San Francisco, CA 94121",
                                "United States"
                            ]
                        },
                        "categories": [
                            {
                                "id": "4bf58dd8d48988d159941735",
                                "name": "Trail",
                                "pluralName": "Trails",
                                "shortName": "Trail",
                                "icon": {
                                    "prefix": "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/hikingtrail_",
                                    "suffix": ".png"
                                },
                                "primary": true
                            }
                        ],
                        "verified": false,
                        "stats": {
                            "checkinsCount": 8586,
                            "usersCount": 5660,
                            "tipCount": 70
                        },
                        "rating": 9.6,
                        "ratingColor": "00B551",
                        "ratingSignals": 141,
                        "hours": {
                            "isOpen": false
                        },
                        "specials": {
                            "count": 0,
                            "items": []
                        },
                        "photos": {
                            "count": 1210,
                            "groups": []
                        },
                        "hereNow": {
                            "count": 0,
                            "summary": "Nobody here",
                            "groups": []
                        }
                    }
                ]
            },
            {
                "restaurants": [
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
                ]
            },
            {
                "hotels": [
                    {
                        "id": "42bf4180f964a520b1251fe3",
                        "name": "The Westin St. Francis San Francisco on Union Square",
                        "contact": {
                            "phone": "4153977000",
                            "formattedPhone": "(415) 397-7000",
                            "twitter": "spg",
                            "facebook": "8038492631",
                            "facebookUsername": "SPG",
                            "facebookName": "Starwood Preferred Guest® (SPG)"
                        },
                        "location": {
                            "address": "335 Powell St",
                            "crossStreet": "at Post St",
                            "lat": 37.7875811325609,
                            "lng": -122.40879893302917,
                            "postalCode": "94102",
                            "cc": "US",
                            "city": "San Francisco",
                            "state": "CA",
                            "country": "United States",
                            "formattedAddress": [
                                "335 Powell St (at Post St)",
                                "San Francisco, CA 94102",
                                "United States"
                            ]
                        },
                        "categories": [
                            {
                                "id": "4bf58dd8d48988d1fa931735",
                                "name": "Hotel",
                                "pluralName": "Hotels",
                                "shortName": "Hotel",
                                "icon": {
                                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/hotel_",
                                    "suffix": ".png"
                                },
                                "primary": true
                            }
                        ],
                        "verified": true,
                        "stats": {
                            "checkinsCount": 34211,
                            "usersCount": 16850,
                            "tipCount": 128
                        },
                        "url": "http:\/\/www.westinstfrancis.com",
                        "hasMenu": true,
                        "rating": 8.8,
                        "ratingColor": "73CF42",
                        "ratingSignals": 284,
                        "reservations": {
                            "url": "http:\/\/www.opentable.com\/single.aspx?rid=7742&ref=9601"
                        },
                        "menu": {
                            "type": "Menu",
                            "label": "Menu",
                            "anchor": "View Menu",
                            "url": "https:\/\/foursquare.com\/v\/the-westin-st-francis-san-francisco-on-union-square\/42bf4180f964a520b1251fe3\/menu",
                            "mobileUrl": "https:\/\/foursquare.com\/v\/42bf4180f964a520b1251fe3\/device_menu"
                        },
                        "specials": {
                            "count": 1,
                            "items": [
                                {
                                    "id": "50b632aa52625c760d0018fc",
                                    "type": "frequency",
                                    "message": "Check into The Westin St. Francis on Foursquare Monday-Thursday and receive 20% off any spa service of your liking at the St. Francis Renewal Spa & Westin WORKOUT.",
                                    "description": "",
                                    "finePrint": "Subject to availability and can be changed without prior notice.",
                                    "unlocked": true,
                                    "icon": "default",
                                    "title": "Special",
                                    "state": "unlocked",
                                    "provider": "foursquare",
                                    "redemption": "webview",
                                    "interaction": {
                                        "entryUrl": "https:\/\/foursquare.com\/device\/specials\/50b632aa52625c760d0018fc?venueId=42bf4180f964a520b1251fe3"
                                    }
                                }
                            ]
                        },
                        "photos": {
                            "count": 1683,
                            "groups": []
                        },
                        "hereNow": {
                            "count": 3,
                            "summary": "3 people are checked in here",
                            "groups": [
                                {
                                    "type": "others",
                                    "name": "Other people here",
                                    "count": 3,
                                    "items": []
                                }
                            ]
                        },
                        "storeId": "1010"
                    },
                    {
                        "id": "4698fe39f964a520f9481fe3",
                        "name": "The Fairmont San Francisco",
                        "contact": {
                            "phone": "4157725000",
                            "formattedPhone": "(415) 772-5000",
                            "twitter": "fairmonthotels"
                        },
                        "location": {
                            "address": "950 Mason St",
                            "crossStreet": "at California St.",
                            "lat": 37.792360764838705,
                            "lng": -122.41027764039967,
                            "postalCode": "94108",
                            "cc": "US",
                            "city": "San Francisco",
                            "state": "CA",
                            "country": "United States",
                            "formattedAddress": [
                                "950 Mason St (at California St.)",
                                "San Francisco, CA 94108",
                                "United States"
                            ]
                        },
                        "categories": [
                            {
                                "id": "4bf58dd8d48988d1fa931735",
                                "name": "Hotel",
                                "pluralName": "Hotels",
                                "shortName": "Hotel",
                                "icon": {
                                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/hotel_",
                                    "suffix": ".png"
                                },
                                "primary": true
                            }
                        ],
                        "verified": true,
                        "stats": {
                            "checkinsCount": 18417,
                            "usersCount": 10648,
                            "tipCount": 105
                        },
                        "url": "http:\/\/bit.ly\/wWpDIs",
                        "hasMenu": true,
                        "rating": 9.2,
                        "ratingColor": "00B551",
                        "ratingSignals": 226,
                        "menu": {
                            "type": "Menu",
                            "label": "Menu",
                            "anchor": "View Menu",
                            "url": "https:\/\/foursquare.com\/v\/the-fairmont-san-francisco\/4698fe39f964a520f9481fe3\/menu",
                            "mobileUrl": "https:\/\/foursquare.com\/v\/4698fe39f964a520f9481fe3\/device_menu"
                        },
                        "specials": {
                            "count": 0,
                            "items": []
                        },
                        "photos": {
                            "count": 1729,
                            "groups": []
                        },
                        "hereNow": {
                            "count": 1,
                            "summary": "One person is checked in here",
                            "groups": [
                                {
                                    "type": "others",
                                    "name": "Other people here",
                                    "count": 1,
                                    "items": []
                                }
                            ]
                        },
                        "storeId": "SAF"
                    },
                    {
                        "id": "44abe929f964a52007351fe3",
                        "name": "The St. Regis San Francisco",
                        "contact": {
                            "phone": "4152844000",
                            "formattedPhone": "(415) 284-4000",
                            "twitter": "spg",
                            "facebook": "8038492631",
                            "facebookUsername": "SPG",
                            "facebookName": "Starwood Preferred Guest® (SPG)"
                        },
                        "location": {
                            "address": "125 3rd St",
                            "crossStreet": "at Minna St",
                            "lat": 37.78600852919698,
                            "lng": -122.40161563082604,
                            "postalCode": "94103",
                            "cc": "US",
                            "city": "San Francisco",
                            "state": "CA",
                            "country": "United States",
                            "formattedAddress": [
                                "125 3rd St (at Minna St)",
                                "San Francisco, CA 94103",
                                "United States"
                            ]
                        },
                        "categories": [
                            {
                                "id": "4bf58dd8d48988d1fa931735",
                                "name": "Hotel",
                                "pluralName": "Hotels",
                                "shortName": "Hotel",
                                "icon": {
                                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/hotel_",
                                    "suffix": ".png"
                                },
                                "primary": true
                            }
                        ],
                        "verified": true,
                        "stats": {
                            "checkinsCount": 18075,
                            "usersCount": 10971,
                            "tipCount": 84
                        },
                        "url": "http:\/\/www.stregissanfrancisco.com",
                        "hasMenu": true,
                        "rating": 9.3,
                        "ratingColor": "00B551",
                        "ratingSignals": 196,
                        "menu": {
                            "type": "Menu",
                            "label": "Menu",
                            "anchor": "View Menu",
                            "url": "https:\/\/foursquare.com\/v\/the-st-regis-san-francisco\/44abe929f964a52007351fe3\/menu",
                            "mobileUrl": "https:\/\/foursquare.com\/v\/44abe929f964a52007351fe3\/device_menu"
                        },
                        "hours": {
                            "status": "Open",
                            "isOpen": true
                        },
                        "specials": {
                            "count": 0,
                            "items": []
                        },
                        "photos": {
                            "count": 641,
                            "groups": []
                        },
                        "hereNow": {
                            "count": 0,
                            "summary": "Nobody here",
                            "groups": []
                        },
                        "storeId": "1511"
                    },
                    {
                        "id": "49c978d2f964a5206b581fe3",
                        "name": "W San Francisco",
                        "contact": {
                            "phone": "4157775300",
                            "formattedPhone": "(415) 777-5300",
                            "twitter": "spg",
                            "facebook": "8038492631",
                            "facebookUsername": "SPG",
                            "facebookName": "Starwood Preferred Guest® (SPG)"
                        },
                        "location": {
                            "address": "181 3rd St",
                            "crossStreet": "at Howard St",
                            "lat": 37.78527484428987,
                            "lng": -122.400481402874,
                            "postalCode": "94103",
                            "cc": "US",
                            "city": "San Francisco",
                            "state": "CA",
                            "country": "United States",
                            "formattedAddress": [
                                "181 3rd St (at Howard St)",
                                "San Francisco, CA 94103",
                                "United States"
                            ]
                        },
                        "categories": [
                            {
                                "id": "4bf58dd8d48988d1fa931735",
                                "name": "Hotel",
                                "pluralName": "Hotels",
                                "shortName": "Hotel",
                                "icon": {
                                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/hotel_",
                                    "suffix": ".png"
                                },
                                "primary": true
                            }
                        ],
                        "verified": true,
                        "stats": {
                            "checkinsCount": 37602,
                            "usersCount": 18291,
                            "tipCount": 161
                        },
                        "url": "http:\/\/www.wsanfrancisco.com",
                        "hasMenu": true,
                        "rating": 8.8,
                        "ratingColor": "73CF42",
                        "ratingSignals": 331,
                        "menu": {
                            "type": "Menu",
                            "label": "Menu",
                            "anchor": "View Menu",
                            "url": "https:\/\/foursquare.com\/v\/w-san-francisco\/49c978d2f964a5206b581fe3\/menu",
                            "mobileUrl": "https:\/\/foursquare.com\/v\/49c978d2f964a5206b581fe3\/device_menu"
                        },
                        "specials": {
                            "count": 0,
                            "items": []
                        },
                        "photos": {
                            "count": 1652,
                            "groups": []
                        },
                        "hereNow": {
                            "count": 2,
                            "summary": "2 people are checked in here",
                            "groups": [
                                {
                                    "type": "others",
                                    "name": "Other people here",
                                    "count": 2,
                                    "items": []
                                }
                            ]
                        },
                        "storeId": "1153"
                    }
                ]
            }
        ];

    });
})();
