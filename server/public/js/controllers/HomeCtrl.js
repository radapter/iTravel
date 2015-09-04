(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('HomeCtrl', ['$scope', '$location', 'Venue', 'Plan', '$http', '$modal', function($scope, $location, Venue, Plan, $http, $modal) {

            $scope.isSubmitting = false;
            $scope.isAutoSubmitting = false;
            $scope.selectedAddress = {};

            //select configs
            $scope.address = {};
            $scope.refreshAddresses = function(address) {
                console.log(address);
                var params = {address: address, sensor: false};
                //console.log(params);
                return $http.get(
                    'https://maps.googleapis.com/maps/api/geocode/json',
                    {params: params}
                ).then(function(response) {
                        //console.log(response);
                        $scope.addresses = response.data.results;
                    });
            };

            $scope.explore = function(selectedAddress) {
                console.log(selectedAddress);

                if(selectedAddress) {

                    var destName = selectedAddress.formatted_address;
                    var destlat = selectedAddress.geometry.location.lat;
                    var destLng = selectedAddress.geometry.location.lng;
                    $scope.isSubmitting = true;
                    var param = {
                        ll: destlat +"," + destLng
                    };
                    //console.log(param);
                    Venue.explore(param)
                        .then(function success() {
                            $scope.isSubmitting = false;
                            //console.log(Venue.searchResults);
                            //console.log('get searchedResult successfully');

                            //create plan
                            //attrs: destName, destLat, destLng, startDate, endDate
                            Plan.create(destName, destlat, destLng);
                            console.log(Plan.tempPlan);

                            $location.url('/venueSelect');
                        }, function fail(err) {
                            console.log('get searchedResult failed. res:', err);
                        });
                } else {
                    alert("Please choose a place you want to go...");
                }

            };

            $scope.openAutoplanModal = function (selectedAddress) {
                $scope.selectedAddress = selectedAddress;
                console.log(selectedAddress);

                if(selectedAddress) {
                  //open modal
                  var modalInstance = $modal.open({
                    templateUrl: 'autoplanModal.html',
                    controller: 'AutoplanModalCtrl',
                    resolve: {
                      selectedAddress: function () {
                        return $scope.selectedAddress;
                      }
                    }
                  });
                } else {
                  alert("Please choose a place you want to go...");
                }
            };


            $scope.isSubmitting2 = false;
            $scope.currentloc = function () {
                $scope.isSubmitting2 = true;


                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){

                        //console.log(position);
                        //how to get the name

                        var destlat = position.coords.latitude;
                        var destLng = position.coords.longitude;

                        var latlng = destlat+","+destLng;

                        //use latlng to search in google geocode api
                        var params = {latlng: latlng, sensor: false};

                        $http.get(
                            'https://maps.googleapis.com/maps/api/geocode/json',
                            {params: params}
                        ).then(function(response) {
                                //console.log(response);

                                //use the first result
                                var destName = response.data.results[0].formatted_address;
                                console.log(destName);

                                var param = {
                                    ll: latlng
                                };
                                console.log(param);
                                Venue.explore(param)
                                    .then(function success() {
                                        $scope.isSubmitting2 = false;
                                        //console.log(Venue.searchResults);
                                        //console.log('get searchedResult successfully');

                                        //create plan
                                        //attrs: destName, destLat, destLng, startDate, endDate
                                        Plan.create(destName, destlat, destLng);
                                        console.log(Plan.tempPlan);

                                        $location.url('/venueSelect');
                                    }, function fail(err) {
                                        console.log('get searchedResult failed. res:', err);
                                    });

                            });

                    });
                }

            }


        }]);
})();
