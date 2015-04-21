(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('HomeCtrl', ['$scope', '$location', 'Venue', '$http', function($scope, $location, Venue, $http) {

            $scope.isSubmitting = false;

            //select configs
            $scope.address = {};
            $scope.refreshAddresses = function(address) {
                var params = {address: address, sensor: false};
                //console.log(params);
                return $http.get(
                    'http://maps.googleapis.com/maps/api/geocode/json',
                    {params: params}
                ).then(function(response) {
                        // console.log(response);
                        $scope.addresses = response.data.results
                    });
            };

            $scope.explore = function(seleceAddress) {
                console.log(seleceAddress);
                if(seleceAddress) {
                    $scope.isSubmitting = true;
                    var param = {
                        ll: seleceAddress.geometry.location.lat +"," +seleceAddress.geometry.location.lng
                    };
                    console.log(param);
                    Venue.explore(param)
                        .then(function success() {
                            $scope.isSubmitting = false;
                            console.log(Venue.searchResults);
                            console.log('get searchedResult successfully');
                            $location.url('/attractionsSelect');
                        }, function fail(err) {
                            console.log('get searchedResult failed. res:', err);
                        });
                } else {
                    alert("Please find a place your want to go....");
                }

            };
        }]);
})();
