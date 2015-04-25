(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('PlanMapCtrl', ['$scope','uiGmapGoogleMapApi', '$rootScope', function ($scope,uiGmapGoogleMapApi, $rootScope ) {
            // Do stuff with your $scope.
            // Note: Some of the directives require at least something to be defined originally!
            // e.g. $scope.markers = []

            $rootScope.$on('planLoaded', function () {
                    $scope.thisPlan = $scope.$parent.plan;
                    //console.log($scope.thisPlan);

                    //define markers and markerList for the map
                    $scope.markerList = [];
                    $scope.center = {};
                    var activities = $scope.thisPlan.activities;

                    //var lat_min, lat_max, lng_min, lng_max;

                    for(var i = 0; i< activities.length; i++){
                        var location = activities[i].venue.location;
                        var loc = {
                            latitude: location.lat,
                            longitude: location.lng,
                            message: activities[i].venue.name
                        };

                        //init max and min
                        //if(!lat_max) {
                        //    lat_min = lat_max = location.lat;
                        //    lng_max = lng_min = location.lng;
                        //} else {
                        //    if(location.lat < lat_min) lat_min = location.lat;
                        //    if(location.lat > lat_max) lat_max = location.lat;
                        //    if(location.lng < lng_min) lng_min = location.lng;
                        //    if(location.lng > lng_max) lng_max = location.lng;
                        //}

                        loc["id"]= i;
                        loc["showWindow"] = false; //hide window for default
                        $scope.markerList.push(loc);

                        //console.log("lat_min:" + lat_min + ", lat_max:" + lat_max +"; lng_min:" +lng_min + ", lng_max" + lng_max);
                    }

                    $scope.center = $scope.markerList[0];
                    //console.log($scope.markerList);


                    var onMarkerClicked = function (marker) {
                        marker.showWindow = true;
                        $scope.$apply();
                        //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
                    };

                    $scope.markerList.forEach( function (marker) {
                        marker.onClicked = function () {
                            onMarkerClicked(marker);
                        };
                        marker.closeClick = function () {
                            marker.showWindow = false;
                            $scope.$evalAsync();
                        };
                    });

                    $scope.map = {
                        //center: {latitude: 40.1451, longitude: -99.6680 },
                        center: $scope.center,
                        pan: true,
                        zoom: 14,
                        refresh: false,
                        options: {
                            //disableDefaultUI: true,
                            scrollwheel: false,
                            //scaleControl: false,
                            //panControl: false,
                            //navigationControl: false,
                            draggable: false,
                            mapTypeControl: true
                        },
                        events: {},
                        bounds: {
                            //southwest: {
                            //    latitude: lat_min,
                            //    longitude: lng_min
                            //},
                            //northeast :{
                            //    latitude: lat_max,
                            //    longitude: lng_max
                            //}
                        }
                    };


                }
            );






            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            uiGmapGoogleMapApi.then(function(maps) {
                //console.log(maps);
            });
        }]);
})();


