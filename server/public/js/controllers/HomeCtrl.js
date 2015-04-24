(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('HomeCtrl', ['$scope', '$location', 'Venue', 'Plan', '$http', function($scope, $location, Venue, Plan, $http) {

            $scope.isSubmitting = false;

            //select configs
            $scope.address = {};
            $scope.refreshAddresses = function(address) {
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
                var destName = selectedAddress.formatted_address;
                var destlat = selectedAddress.geometry.location.lat;
                var destLng = selectedAddress.geometry.location.lng;

                if(selectedAddress) {
                    $scope.isSubmitting = true;
                    var param = {
                        ll: destlat +"," + destLng
                    };
                    console.log(param);
                    Venue.explore(param)
                        .then(function success() {
                            $scope.isSubmitting = false;
                            console.log(Venue.searchResults);
                            console.log('get searchedResult successfully');

                            //create plan
                            //attrs: destName, destLat, destLng, startDate, endDate
                            Plan.create(destName, destlat, destLng);
                            console.log(Plan.tempPlan);

                            $location.url('/venueSelect');
                        }, function fail(err) {
                            console.log('get searchedResult failed. res:', err);
                        });
                } else {
                    alert("Please choose a place you want to go to...");
                }

            };
        }]);
})();
