(function() {
    'use strict';
    angular.module("iTravelApp")
        .controller("VenueSelectorCtrl", ['$scope', 'Venue', 'Plan', 'Activity', '$location', 'User',
            function ($scope, Venue, Plan, Activity, $location, User) {

                $scope.destination = Plan.tempPlan;
                $scope.venues = Venue.searchResults;
                $scope.venueCategories = Venue.categoryDict;

                $scope.tempSelectedVenues = {
                    "attractions": [],
                    "restaurants": [],
                    "hotels": []
                };

                $scope.attractionAndHotelSorts = [
                    {"display": "Rating", "sort": "rating"},
                    {"display": "Distance", "sort": "location.distance"},
                    {"display": "Popularity", "sort": "stats.checkinsCount"}
                ];

                $scope.restaurantSorts = [
                    {"display": "Rating", "sort": "rating"},
                    {"display": "Price", "sort": "price.tier"},
                    {"display": "Distance", "sort": "location.distance"},
                    {"display": "Popularity", "sort": "stats.checkinsCount"}
                ];

                //sort and filter default
                $scope.attractionSortDefault = {value: "rating"};
                $scope.attractionsFilter = {value: "All"};
                $scope.restaurantSortDefault = {value: "rating"};
                $scope.restaurantFilter = {value: "All"};
                $scope.hotelSortDefault = {value: "rating"};
                $scope.hotelFilter = {value: "All"};

                //for each tab of venue category
                $scope.venueCategories = [
                    {
                        "category": "Attractions",
                        "list": "attractions",
                        "percentage": 33,
                        "filterCat": $scope.venueCategories.attractions,
                        "sortCat": $scope.attractionAndHotelSorts,
                        "sortDefault": $scope.attractionSortDefault.value,
                        "filter": $scope.attractionsFilter.value,
                        "items": $scope.venues.attractions
                    },
                    {
                        "category": "Restaurants",
                        "list": "restaurants",
                        "percentage": 66,
                        "filterCat": $scope.venueCategories.restaurants,
                        "sortCat": $scope.restaurantSorts,
                        "sortDefault": $scope.restaurantSortDefault.value,
                        "filter": $scope.restaurantFilter.value,
                        "items": $scope.venues.restaurants
                    },
                    {
                        "category": "Hotels",
                        "list": "hotels",
                        "percentage": 100,
                        "filterCat": null,
                        "sortCat": $scope.attractionAndHotelSorts,
                        "sortDefault": $scope.hotelSortDefault.value,
                        "filter": $scope.hotelFilter.value,
                        "items": $scope.venues.hotels
                    }
                ];

                //default sorting direction and ordering
                $scope.direction = true;
                $scope.orderProp = "rating";

                //venue sorter function
                $scope.sorter = function(column) {
                    if ($scope.orderProp === column) {
                        $scope.direction = !$scope.direction;
                    }
                    else {
                        $scope.orderProp = column;
                        $scope.direction = true;
                    }
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

                //test save plan to user
                $scope.savePlan = function () {
                    $scope.saveActivities();


                    //retrieve user
                    User.restore()
                        .then(function () {
                            if(User.currentUser) {
                                console.log(Plan.tempPlan);

                                User.currentUser.plans.push(Plan.tempPlan);
                                User.currentUser.save()
                                    .then(function (res) {
                                        console.log(res);

                                        alert("save plan succefully");
                                        $location.url('/users/'+User.currentUser._id);
                                    });

                            }
                        });

                }


        }]);




})();
