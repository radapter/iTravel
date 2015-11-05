(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('HomeCtrl', ['$scope', '$location', 'Venue', 'Plan', '$http', '$modal', function($scope, $location, Venue, Plan, $http, $modal) {

            $scope.isSubmitting = false;
            $scope.isAutoSubmitting = false;
            $scope.selectedAddress = {};

            $scope.currentlocation = {};

            // get current location info when first render the page, not using the callback for click
            // has some concern about pressing the button with no result
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position){
                var destlat = position.coords.latitude;
                var destLng = position.coords.longitude;

                var latlng = destlat+","+destLng;

                //use latlng to search in google geocode api
                var params = {latlng: latlng, sensor: false};

                $http.get(
                  'https://maps.googleapis.com/maps/api/geocode/json',
                  {params: params}
                ).then(function(response) {
                    //use the first result in
                    $scope.gettingCurrLoc = false;
                    $scope.currentlocation = response.data.results[0];
                  });

              });
            }

            //select configs
            $scope.address = {};
            $scope.refreshAddresses = function(address) {
                $scope.selectStat = true;
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

            $scope.getAddress = function(address) {
                $scope.selectStat = true;
                console.log(address);
                var params = {address: address, sensor: false};
                //console.log(params);
                return $http.get(
                    'https://maps.googleapis.com/maps/api/geocode/json',
                    {params: params}
                ).then(function(response) {
                        console.log(response);
                        $scope.selectedAddress = response.data.results[0];
                        $scope.openAutoplanModal($scope.selectedAddress);
                    });
            };

            $scope.explore = function(selectedAddress) {
                console.log(selectedAddress);

                if(selectedAddress) {
                    $scope.selectStat = true;
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
                    $scope.selectStat = false;
                    //alert("Please choose a place you want to go...");
                }

            };

            $scope.openAutoplanModal = function (selectedAddress) {
                $scope.selectedAddress = selectedAddress;
                console.log(selectedAddress);

                if(selectedAddress) {
                    $scope.selectStat = true;
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
                    $scope.selectStat = false;
                  //alert("Please choose a place you want to go...");
                }
            };

            $scope.applyCurrentloc = function () {
                console.log("apply curr");
                $scope.address.selected = $scope.currentlocation;
            };

        }]);
})();
