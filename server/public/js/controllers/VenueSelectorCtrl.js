(function() {
    'use strict';
    angular.module("iTravelApp")
        .controller("VenueSelectorCtrl", ['$scope', 'Venue', 'Plan', 'Activity', '$location',function ($scope, Venue, Plan, Activity, $location) {
            $scope.destination = Plan.tempPlan;
            //console.log($scope.destination);
            $scope.venues = Venue.searchResults;

            $scope.tempSelectedVenues = {
                "attractions": [],
                "restaurants": [],
                "hotels": []
            };

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
                    "list": "attractions",
                    "percentage": 33,
                    "filterCat": $scope.attractionCategories,
                    "sortCat": $scope.attractionAndHotelSorts,
                    "sortDefault": $scope.attractionSortDefault.value,
                    "items": $scope.venues.attractions
                },
                {
                    "category": "Restaurants",
                    "list": "restaurants",
                    "percentage": 66,
                    "filterCat": $scope.restaurantCategories,
                    "sortCat": $scope.restaurantSorts,
                    "sortDefault": $scope.restaurantSortDefault.value,
                    "items": $scope.venues.restaurants
                },
                {
                    "category": "Hotels",
                    "list": "hotels",
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


            $scope.saveAttractions = function (attraction) {
                console.log(attraction);
                $scope.tempSelectedVenues.attractions.push(attraction);
            };

            $scope.saveRestaurants = function (restaurant) {
                console.log(restaurant);
                $scope.tempSelectedVenues.restaurants.push(restaurant);
            };

            $scope.saveHotels = function (hotel) {
                console.log(hotel);
                $scope.tempSelectedVenues.hotels.push(hotel);
            };

            $scope.addVenue = function (venue, l) {
                //console.log("clicked");
                //var l = list.toLowerCase();
                console.log("list is " + l);
                console.log($scope.tempSelectedVenues[l]);
                if ($scope.tempSelectedVenues[l].indexOf(venue) == -1) {
                    if(l == "attractions"){
                        $scope.saveAttractions(venue);
                    }
                    else if (l == "restaurants"){
                        $scope.saveRestaurants(venue);
                    }
                    else if (l == "hotels"){
                        $scope.saveHotels(venue);
                    }
                    console.log($scope.tempSelectedVenues);
                }
                else {
                    var index = $scope.tempSelectedVenues[l].indexOf(venue);
                    $scope.tempSelectedVenues[l].splice(index, 1);
                    console.log($scope.tempSelectedVenues);
                }
            };

            //TO wrap each venue in tempSelectedVenues to activity, then push to plan
            $scope.saveActivities = function () {

                console.log($scope.tempSelectedVenues);

                //iterate through $scope.tempSelectedVenues
                //for each veune
                //ref activity : venue, activitiesType, start, end
                saveActivityArray($scope.tempSelectedVenues.attractions, "attractions");
                saveActivityArray($scope.tempSelectedVenues.restaurants, "restaurants");
                saveActivityArray($scope.tempSelectedVenues.hotels, "hotels");
                console.log(Plan.tempPlan.activities);

                //relocate to schedule page

            };

            function saveActivityArray(venues, activitiesType){
                if(venues){
                    for(var i = 0; i < venues.length; i++) {
                        var newActivity = Activity.create(venues[i], activitiesType);
                        Plan.tempPlan.activities.push(newActivity);
                    }
                }
            }

        }]);




})();
