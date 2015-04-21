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
        $scope.venues = Venue.searchResults;

    });
})();
