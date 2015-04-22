(function() {
    'use strict';
    angular.module("iTravelApp")
        .controller("VenueSelectorCtrl", function ($scope, Venue) {
            //test venue data
            $scope.venues = Venue.searchResults;

            $scope.tempSelectedVenues = [];

            //should we predefine some categories or dynamiclly generate form the results


            //For attractions
            $scope.attractionCategories = [
                {"cat": "All", "val": true},
                {"cat": "Scenic", "val": false},
                {"cat": "Park", "val": false},
                {"cat": "Indoor", "val": false}
            ];

            $scope.attractionAndHotelSorts = [
                {"display": "Rating", "sort": "rating"},
                {"display": "Distance", "sort": "location.distance"},
                {"display": "Popularity", "sort": "stats.checkinsCount"}
            ];

            //For restaurants
            $scope.restaurantCategories = [
                {"cat": "All", "val": true},
                {"cat": "Asian", "val": false},
                {"cat": "American", "val": false},
                {"cat": "Indian", "val": false},
                {"cat": "Italian", "val": false}
            ];

            $scope.restaurantSorts = [
                {"display": "Rating", "sort": "rating"},
                {"display": "Price", "sort": "price.tier"},
                {"display": "Distance", "sort": "location.distance"},
                {"display": "Popularity", "sort": "stats.checkinsCount"}
            ];

            //For all venues
            $scope.attractionSortDefault = {value: "rating"};
            $scope.restaurantSortDefault = {value: "rating"};
            $scope.hotelSortDefault = {value: "rating"};

            $scope.venueCategories = [
                {
                    "category": "Attractions",
                    "percentage": 33,
                    "filterCat": $scope.attractionCategories,
                    "sortCat": $scope.attractionAndHotelSorts,
                    "sortDefault": $scope.attractionSortDefault.value,
                    "items": $scope.venues.attractions
                },
                {
                    "category": "Restaurants",
                    "percentage": 66,
                    "filterCat": $scope.restaurantCategories,
                    "sortCat": $scope.restaurantSorts,
                    "sortDefault": $scope.restaurantSortDefault.value,
                    "items": $scope.venues.restaurants
                },
                {
                    "category": "Hotels",
                    "percentage": 100,
                    "filterCat": null,
                    "sortCat": $scope.attractionAndHotelSorts,
                    "sortDefault": $scope.hotelSortDefault.value,
                    "items": $scope.venues.hotels
                }
            ];

            $scope.direction = true;
            $scope.orderProp = "rating";
            $scope.sorter = function(column) {
                if ($scope.orderProp === column) {
                    $scope.direction = !$scope.direction;
                } else {
                    $scope.orderProp = column;
                    $scope.direction = true;
                }
                //console.log($scope.orderProp);
                //console.log($scope.direction);
            };

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

        });
})();
