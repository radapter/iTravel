(function() {
    'use strict';
    angular.module("iTravelApp")
        .controller("VenueSelectorCtrl", ['$scope', 'Venue', 'Plan', 'Activity', '$location', 'User', 'venueDetailsModal',
            function ($scope, Venue, Plan, Activity, $location, User, venueDetailsModal) {

                $scope.tempPlan = Plan.tempPlan;
                $scope.venues = [].concat(Venue.searchResults.restaurants, Venue.searchResults.attractions, Venue.searchResults.hotels);
                $scope.selectedVenues = [];
                $scope.venueCategories = Venue.categoryDict;
                $scope.map = {
                    center: { latitude: $scope.tempPlan.destLat, longitude: $scope.tempPlan.destLng},
                    options:{
                        scaleControl: true
                    },
                    zoom: 15,
                    events: {
                        'click': function(e) {
                            var venue = e.model;
                            venueDetailsModal.showModal(venue);
                        },
                        'mouseover': function(e) {
                            var venue = e.model;
                            $scope.map.activeMarker = venue;
                            $scope.map.windowOptions.visible = true;
                            $scope.focusOnVenue(venue);

                            $scope.resetAllMakers();
                            venue.activeIcon = 'img/blue_marker.png';
                        },
                        'mouseout': function() {
                            $scope.map.windowOptions.visible = false;

                            $scope.resetAllMakers();
                        }
                    },
                    windowOptions: {
                        visible: false
                    },
                    activeMarker: $scope.venues[0]
                };

                $scope.filterParams = {
                    name: '',
                    section: 'attractions'
                };
                $scope.filteredVenues = [];
                console.log($scope.venues);

                $scope.isFilterExpanded = false;

                $scope.applyFilters = function() {
                    var filteredVenues;
                    if (!$scope.venues || !$scope.venues.length) {
                        filteredVenues = [];
                        return;
                    }

                    filteredVenues = _.filter($scope.venues, sectionFilter);
                    filteredVenues = _.filter(filteredVenues, nameFilter);

                    $scope.filteredVenues = filteredVenues;
                };
                $scope.applyFilters();

                function sectionFilter(venue) {
                    return $scope.filterParams.section === '' || venue.section === $scope.filterParams.section;
                }

                function nameFilter(venue) {
                    var venueName = venue.name.toLowerCase(),
                        filterValue = $scope.filterParams.name.toLowerCase();
                    return filterValue === '' || venueName.indexOf(filterValue) > -1;
                }

                function foldFilters() {
                    $scope.isFilterExpanded = false;
                    $('.venue-filters').css('height', '80px');
                    $('.venue-selector-adapter').css('padding-top', '80px');
                    $('.filter-expand-button').find('i').removeClass('fa-angle-up');
                    $('.filter-expand-button').find('i').addClass('fa-angle-down');
                }

                function expandFilters() {
                    $scope.isFilterExpanded = true;
                    $('.venue-filters').css('height', '160px');
                    $('.venue-selector-adapter').css('padding-top', '160px');
                    $('.filter-expand-button').find('i').removeClass('fa-angle-down');
                    $('.filter-expand-button').find('i').addClass('fa-angle-up');
                }

                $scope.onClickSectionBtn = function(e) {
                    console.log(e);
                    var $btn = $(e.target),
                        section = $btn[0].getAttribute('data-section');
                    if (section === $scope.filterParams.section) {
                        $scope.filterParams.section = '';
                        clearAllActive();
                    } else {
                        $scope.filterParams.section = section;
                        clearAllActive();
                        $btn.addClass('active');
                    }

                    $scope.applyFilters();

                    function clearAllActive() {
                        $($btn[0].parentNode).find('.btn').removeClass('active');
                    }

                };

                $scope.toggleFilterExpansion = function() {
                    console.log($scope.isFilterExpanded);
                    if ($scope.isFilterExpanded) {
                        foldFilters();
                    } else {
                        expandFilters();
                    }
                };

                $scope.onClickVenueOption = function(venue, event) {
                    var $target = $(event.target);

                    // If user clicks the venue option card, show details of the venue in a modal
                    // If user clicks the select button however, the venueOption directive will pick up the event
                    if ($target.hasClass('select-btn') || $target.hasClass('unselect-btn')) {
                        return;
                    }
                    $scope.showVenueDetails(venue);
                };

                $scope.showVenueDetails = function(venue) {
                    venueDetailsModal.showModal(venue);
                };

                $scope.centerAroundVenue = function(venue) {
                    $scope.map.center = venue.coords;
                    $scope.resetAllMakers();
                    venue.activeIcon = 'img/blue_marker.png';
                    // TODO HIGH yulin making the centered venue standing out
                };

                $scope.focusOnVenue = function(venue) {
                    var $venueCard = $('[data-venue-id="'+venue.id+'"]');
                    console.log($venueCard);
                    $venueCard.get(0).scrollIntoView();
                    $('[data-venue-id]').removeClass('focused');
                    $venueCard.addClass('focused');
                };

                $scope.blurAllVenues = function() {
                    $('[data-venue-id]').removeClass('focused');
                };

                $scope.resetAllMakers = function() {
                    _.each($scope.venues, function(venue) {
                        delete venue.activeIcon;
                    });
                };

                $scope.selectVenue = function(venue) {
                    console.log('selectVenue invoked inside controller. venue:', venue);
                    if ($scope.selectedVenues.indexOf(venue) === -1) {
                        $scope.selectedVenues.push(venue);
                        venue.selected = true;
                    }
                };

                $scope.unselectVenue = function(venue) {
                    var idx = $scope.selectedVenues.indexOf(venue);
                    if (idx !== -1) {
                        $scope.selectedVenues.splice(idx, 1);
                        venue.selected = false;
                    }
                };

                $scope.toggleSelection = function(venue) {
                    var idx = $scope.selectedVenues.indexOf(venue);
                    if (idx !== -1) {
                        $scope.selectedVenues.splice(idx, 1);
                        venue.selected = false;
                        return 'unselected';
                    } else {
                        $scope.selectedVenues.push(venue);
                        venue.selected = true;
                        return 'selected';
                    }
                };

                $scope.goSchedule = function() {
                    var activity;
                    for(var i = 0; i < $scope.selectedVenues.length; i++) {
                        var venue = $scope.selectedVenues[i];
                        activity = Activity.create(venue, venue.section, venue.name);
                        Plan.tempPlan.activities.push(activity);
                    }

                    $location.url('activityScheduler');
                };
                // $scope.tempSelectedVenues = {
                //     "attractions": [],
                //     "restaurants": [],
                //     "hotels": []
                // };

                // $scope.attractionAndHotelSorts = [
                //     {"display": "Rating", "sort": "rating"},
                //     {"display": "Distance", "sort": "location.distance"},
                //     {"display": "Popularity", "sort": "stats.checkinsCount"}
                // ];

                // $scope.restaurantSorts = [
                //     {"display": "Rating", "sort": "rating"},
                //     {"display": "Price", "sort": "price.tier"},
                //     {"display": "Distance", "sort": "location.distance"},
                //     {"display": "Popularity", "sort": "stats.checkinsCount"}
                // ];

                // //sort and filter default
                // $scope.attractionSortDefault = {value: "rating"};
                // $scope.attractionsFilter = {value: "All"};
                // $scope.restaurantSortDefault = {value: "rating"};
                // $scope.restaurantFilter = {value: "All"};
                // $scope.hotelSortDefault = {value: "rating"};
                // $scope.hotelFilter = {value: "All"};

                // //for each tab of venue category
                // $scope.venueCategories = [
                //     {
                //         "category": "Attractions",
                //         "list": "attractions",
                //         "percentage": 33,
                //         "filterCat": $scope.venueCategories.attractions,
                //         "sortCat": $scope.attractionAndHotelSorts,
                //         "sortDefault": $scope.attractionSortDefault.value,
                //         "filter": $scope.attractionsFilter.value,
                //         "items": $scope.venues.attractions
                //     },
                //     {
                //         "category": "Restaurants",
                //         "list": "restaurants",
                //         "percentage": 66,
                //         "filterCat": $scope.venueCategories.restaurants,
                //         "sortCat": $scope.restaurantSorts,
                //         "sortDefault": $scope.restaurantSortDefault.value,
                //         "filter": $scope.restaurantFilter.value,
                //         "items": $scope.venues.restaurants
                //     },
                //     {
                //         "category": "Hotels",
                //         "list": "hotels",
                //         "percentage": 100,
                //         "filterCat": null,
                //         "sortCat": $scope.attractionAndHotelSorts,
                //         "sortDefault": $scope.hotelSortDefault.value,
                //         "filter": $scope.hotelFilter.value,
                //         "items": $scope.venues.hotels
                //     }
                // ];

                // //default sorting direction and ordering
                // $scope.direction = true;
                // $scope.orderProp = "rating";

                // //venue sorter function
                // $scope.sorter = function(column) {
                //     if ($scope.orderProp === column) {
                //         $scope.direction = !$scope.direction;
                //     }
                //     else {
                //         $scope.orderProp = column;
                //         $scope.direction = true;
                //     }
                // };


                // $scope.saveAttractions = function (attraction) {
                //     console.log(attraction);
                //     $scope.tempSelectedVenues.attractions.push(attraction);
                // };

                // $scope.saveRestaurants = function (restaurant) {
                //     console.log(restaurant);
                //     $scope.tempSelectedVenues.restaurants.push(restaurant);
                // };

                // $scope.saveHotels = function (hotel) {
                //     console.log(hotel);
                //     $scope.tempSelectedVenues.hotels.push(hotel);
                // };

                // $scope.addVenue = function (venue, l) {
                //     //console.log("clicked");
                //     //var l = list.toLowerCase();
                //     console.log("list is " + l);
                //     console.log($scope.tempSelectedVenues[l]);
                //     if ($scope.tempSelectedVenues[l].indexOf(venue) == -1) {
                //         if(l == "attractions"){
                //             $scope.saveAttractions(venue);
                //         }
                //         else if (l == "restaurants"){
                //             $scope.saveRestaurants(venue);
                //         }
                //         else if (l == "hotels"){
                //             $scope.saveHotels(venue);
                //         }
                //         console.log($scope.tempSelectedVenues);
                //     }
                //     else {
                //         var index = $scope.tempSelectedVenues[l].indexOf(venue);
                //         $scope.tempSelectedVenues[l].splice(index, 1);
                //         console.log($scope.tempSelectedVenues);
                //     }
                // };

                // //TO wrap each venue in tempSelectedVenues to activity, then push to plan
                // $scope.saveActivities = function () {

                //     console.log($scope.tempSelectedVenues);

                //     //iterate through $scope.tempSelectedVenues
                //     //for each veune
                //     //ref activity : venue, activitiesType, start, end
                //     saveActivityArray($scope.tempSelectedVenues.attractions, "attractions");
                //     saveActivityArray($scope.tempSelectedVenues.restaurants, "restaurants");
                //     saveActivityArray($scope.tempSelectedVenues.hotels, "hotels");
                //     console.log(Plan.tempPlan.activities);

                //     $location.url('activityScheduler');
                //     //relocate to schedule page

                // };

                // function saveActivityArray(venues, activitiesType){
                //     if(venues){
                //         for(var i = 0; i < venues.length; i++) {
                //             var newActivity = Activity.create(venues[i], activitiesType, venues[i].name);
                //             Plan.tempPlan.activities.push(newActivity);
                //         }
                //     }
                // }


                // // DEPRECATED: used only in POC
                // // test save plan to user
                // $scope.savePlan = function () {
                //     $scope.saveActivities();


                //     //retrieve user
                //     User.restore()
                //         .then(function () {
                //             if(User.currentUser) {
                //                 console.log(Plan.tempPlan);

                //                 User.currentUser.plans.push(Plan.tempPlan);
                //                 User.currentUser.save()
                //                     .then(function (res) {
                //                         console.log(res);

                //                         alert("save plan succefully");
                //                         $location.url('/users/'+User.currentUser._id);
                //                     });

                //             }
                //         });

                // }


        }]);




})();
