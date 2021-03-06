(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('PlansShowCtrl', ['$scope', '$routeParams', '$location', 'User', '$rootScope', 'venueDetailsModal', function($scope, $routeParams, $location, User, $rootScope, venueDetailsModal) {

            init();

            function init() {
                if(User.currentUser) {
                    $scope.user = User.currentUser;
                    console.log($scope.user);

                    var planid = $routeParams.id;
                    var plans = $scope.user.plans;
                    for(var i = 0; i< plans.length; i++){
                        //console.log(plans[i]);
                        if(plans[i]._id == planid) {
                            $scope.plan = plans[i];
                            //console.log($scope.plan);
                            $rootScope.$broadcast('planLoaded');
                        }
                    }

                    parseDays();

                    // TODO: RETURN PROMISE
                }
            }

            $scope.map = null;
            $scope.$on('mapInitialized', function(event, map) {
            console.log(map);
                $scope.map = map;
                var center = new google.maps.LatLng($scope.plan.activities[0].venue.location.lat, $scope.plan.activities[0].venue.location.lng);
                map.setCenter(center);

            });

            //parse days in plan activities
            /***
             * days example, 2 level array
             * [{
             *   date: "09-11",
             *   activities: []
             * },
             * {
             *   date: "09-12",
             *   activities: []
             * }
             * **/
            function parseDays(){
                $scope.days = [];

                var day = {
                  date: null,
                  activities: []
                };

                for(var i = 0 ; i < $scope.plan.activities.length; i++){
                    var activity = $scope.plan.activities[i];
                    var activity_start = new Date(activity.start);
                    var activity_date = activity_start.getMonth()+1 + "-" + activity_start.getDate();

                    //build first day
                    if(!day.date) {
                        day.date = activity_date;
                    }

                    //add same day
                    if(activity_date != day.date){
                        $scope.days.push(day);

                        day = {
                            date: null,
                            activities: []
                        };

                        //build another day
                        day.date = activity_date;
                    }

                    day.activities.push(activity);
                }
                $scope.days.push(day); //add last day
                console.log($scope.days);
                buildWaypoints($scope.days[0]); //build first day direction on map
            }

            /***
             * method to response day change on tab
             * @param day
             * {
             *      date: "9-11",
             *      activities: []
             * }
             * **/
            $scope.changeDayRoute = function(day){
                buildWaypoints(day);
            };

            $scope.onClickActivity = function(venue, event) {
                event.preventDefault();
                venueDetailsModal.showModal(venue);
            };


            /***
             * method to show directions with waypoints on map
             * @param day
             * {
             *      date: "9-11",
             *      activities: []
             * }
             * **/
            function buildWaypoints(day) {
                console.log(day);
                if(day) {
                    //build route
                    $scope.waypoints = [];
                    var activity_length = day.activities.length;
                    $scope.origin = {
                        lat: day.activities[0].venue.location.lat,
                        lng: day.activities[0].venue.location.lng
                    };
                    $scope.destination = {
                        lat: day.activities[activity_length-1].venue.location.lat,
                        lng: day.activities[activity_length-1].venue.location.lng
                    };

                    for(var i = 1 ; i < activity_length-1; i++){
                        if($scope.waypoints.length == 8) break;  //maxi waypoints is 8
                        $scope.waypoints.push({
                            location: {
                                lat: day.activities[i].venue.location.lat,
                                lng: day.activities[i].venue.location.lng
                            },
                            stopover: true
                        });
                    }
                    console.log($scope.waypoints);
                }
            }

            //styling of maps
            var styleArray = [ //any style array defined in the google documentation you linked
                {
                    featureType: "all",
                    stylers: [
                        { hue: "#00ff88" },
                        { saturation: -66 },
                        { lightness: 42 },
                        { Gamma: 0.85 },
                        { visibility: "simplified"}
                    ]
                },{
                    featureType: "landscape.man_made",
                    elementType: "all",
                    stylers: [
                        { hue: "#ffbb00" },
                        { saturation: 14 },
                        { lightness: 19 }
                    ]
                },{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ];
            $scope.styles = styleArray;

        }]);

})();
