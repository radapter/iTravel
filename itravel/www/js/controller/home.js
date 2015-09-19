
angular.module('iTravelApp.controller.home', [])

    .controller('HomeCtrl', function($scope, $ionicModal, $http, ApiEndpoint, Plan, $location, User, _, $ionicLoading) {

        console.log('HomeCtrl loaded');

        getCurrLoc();

        //if(!User.currentUser) {
        //   $location.path('/login');
        //}

        $scope.currLocation = {
          location: {
            lat: null,
            lng: null
          },
          address: null
        };
        function getCurrLoc(){
            navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.currLocation.location.lat = pos.coords.latitude;
                $scope.currLocation.location.lng = pos.coords.longitude;

                //query geocode for currLoc, to get the address

                var latlng = $scope.currLocation.location.lat+","+$scope.currLocation.location.lng;

                //use latlng to search in google geocode api
                var params = {latlng: latlng, sensor: false};

                //get current location address
                $http.get(
                    ApiEndpoint.url + '/geocode/json',
                    {params: params}
                ).then(function(response) {
                        //use the first result
                        $scope.currLocation.address = response.data.results[0].formatted_address;
                    });
            }, function(error) {
                alert('Unable to get location: ' + error.message);
            }, { enableHighAccuracy: true });
        }

        //prepare ion-complete for navigate inout, with auto complete address
        //the selected data is stored in ng-model for each selection
        $scope.getTestItems = function (query) {
            var params = {
                address: query, sensor: false
            };
            //need 2 return to pass query to selector
            return $http.get(
                ApiEndpoint.url + '/geocode/json?',
                {params: params}
            ).then(function(response) {
                    var results = response.data.results;
                    var items = [];

                    if(results) {
                        for(var i = 0; i < results.length; i++) {
                            var result = results[i];
                            var item = {};
                            item.location = result.geometry.location;
                            item.address = result.formatted_address;
                            items.push(item);
                        }
                    }
                    return items;
                });
        };

        //show plan modal
        $ionicModal.fromTemplateUrl('templates/planModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.planModal = modal;
        });

        $scope.useCurrLoc = false;
        console.log($scope.useCurrLoc);
        $scope.setUseCurrLoc = function () {
            console.log("scole");
            $scope.useCurrLoc = true;
            console.log($scope.useCurrLoc);
        };
        $scope.unsetUseCurrLoc = function () {
            $scope.useCurrLoc = false;
        };

        $scope.autoplan = function (newplan) {
            console.log(newplan);

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            if($scope.useCurrLoc) {
              if(!newplan) {
                  newplan = {}
              }
              newplan.destination = $scope.currLocation;
              console.log(newplan);
            }

            if( (!newplan.start && newplan.duration)||(!newplan.duration && newplan.start) ) {
                alert("please input start date and duration");
            } else {

                var destName = newplan.destination.address;
                var destlat = newplan.destination.location.lat;
                var destLng = newplan.destination.location.lng;
                if(newplan.start) {
                    var startDate = newplan.start;
                    var endDate = new Date();
                    endDate.setDate(startDate.getDate() + newplan.duration);
                    var param = {
                        ll: destlat +"," + destLng,
                        startDate: startDate,
                        endDate: endDate
                    };
                } else {
                    //use default startDate and endDate
                    var param = {
                        ll: destlat +"," + destLng
                    };
                }

                Plan.autoPlan(param)
                    .then(function success(res) {

                        var autoplan = res;
                        //complete autoplan
                        autoplan.destName = destName;
                        autoplan.destLat = destlat;
                        autoplan.destLng = destLng;
                        autoplan.signatureTs = Date.now();

                        if (User.currentUser) {
                            User.currentUser.plans.push(autoplan);
                            User.currentUser.save()
                                .then(_.bind(User.currentUser.refresh, User.currentUser))
                                .then(function() {
                                    console.log('user info saved. User:', User.currentUser);
                                    var newPlan1 = _.findWhere(User.currentUser.plans, {signatureTs: autoplan.signatureTs});
                                    $scope.planModal.hide();
                                    $ionicLoading.hide();
                                    $location.path('/tab/plans');
                                }, function(err){
                                    console.log('network err', err);
                                });

                        } else {
                            console.log('not handle user not login situation');
                            $scope.planModal.hide();
                            $location.path('/login');
                        }

                    }, function fail(err) {
                        console.log('get searchedResult failed. res:', err);
                    });
            }
        }

    });
