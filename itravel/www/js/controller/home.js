
angular.module('iTravelApp.controller.home', [])

    .controller('HomeCtrl', function($scope, $state, $ionicModal, $http, ApiEndpoint, Plan, $location, User, _, $ionicLoading, $rootScope) {

        console.log('HomeCtrl loaded');

        init();

        function init() {
            $scope.currLocation = {
                location: {
                    lat: null,
                    lng: null
                },
                address: null
            };
            getCurrLoc();
            $scope.useCurrLoc = false;
            $scope.planCount = 0;
            $scope.activityCount = 0;
            $scope.destinationCount = 0;
            $scope.hasNoPlan = true;
            $scope.nextTrip = {};
            if(User.currentUser) {
                refreshUser(User.currentUser);
            } else {
                console.log('no curr user');
                $state.go('login');
            }

        }

        /*************** Get user related infomation ************/
        $rootScope.$on('userLoginSuccess', function (event, user) {
            refreshUser(user);
        });

        $rootScope.$on('userNewPlanSaved', function (event, user) {
            refreshUser(user);
        });

        function refreshUser(user){
            $scope.hasNoPlan = true;
            $scope.currentTrip = false;
            console.log(user);
            $scope.currentUser = user;

            if($scope.currentUser) {
                $scope.planCount = $scope.currentUser.plans.length;
                $scope.activityCount = countActivities($scope.currentUser);
                $scope.destinationCount = countDestinations($scope.currentUser);
            }

            if($scope.planCount != 0) {
                $scope.hasNoPlan = false;
                findNextTrip();
            }
        }

        function findNextTrip(){
            var currDate = new Date().getTime(); //utc time
            var upcoming;

            for(var i = 0; i < User.currentUser.plans.length; i++){
              var utcDate = Date.parse(User.currentUser.plans[i].endDate);
              if(utcDate >= currDate){
                if( (upcoming === undefined) || (utcDate <= Date.parse(upcoming.endDate)) ){
                  upcoming = User.currentUser.plans[i];
                }
              }
            }

            $scope.nextTrip = upcoming;
            console.log($scope.nextTrip);
            if(Date.parse($scope.nextTrip.startDate) < currDate){
              $scope.currentTrip = true;
            }
        }

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

        /********* calculate user plans stats **********/
        function countActivities(user) {
            if(!user) return 0;
            var activityCount = 0;
            for(var i=0; i< user.plans.length; i++){
                activityCount += user.plans[i].activities.length;
            }
            return activityCount;
        }

        function countDestinations(user) {
            if(!user) return 0;
            var destinations = [];
            for(var i=0; i< user.plans.length; i++){
                if(!_.contains(destinations, user.plans[i].destName) ) {
                    destinations.push(user.plans[i].destName);
                }
            }
            return destinations.length;
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

        /*************  auto plan modal related *********************/
        $ionicModal.fromTemplateUrl('templates/planModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.planModal = modal;
        });

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

            if($scope.useCurrLoc) {
              if(!newplan) {
                  newplan = {}
              }
              newplan.destination = $scope.currLocation;
              console.log(newplan);
            } else if(!newplan || !newplan.destination) {
                alert('Please choose a destination.');
                return;
            }

            if(!newplan.duration) {
                newplan.duration = 2; //set default duration
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            Date.prototype.addDays = function(days)
            {
                var dat = new Date(this.valueOf());
                dat.setDate(dat.getDate() + days);
                return dat;
            };

            var destName = newplan.destination.address;
            var destlat = newplan.destination.location.lat;
            var destLng = newplan.destination.location.lng;
            if($scope.datepickerObject.inputDate) {
                var startDate = $scope.datepickerObject.inputDate;
                //var endDate = new Date();
                var endDate = startDate.addDays(newplan.duration);
                //endDate.setDate(startDate.getDate() + newplan.duration);
                console.log(endDate);
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

            console.log(param);
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
                                console.log(newPlan1);

                                $rootScope.$broadcast('userNewPlanSaved', User.currentUser);

                                $scope.planModal.hide();
                                $ionicLoading.hide();
                                //$location.path('/tab/plans');
                                $location.path('/tab/plans/'+newPlan1._id);
                            }, function(err){
                                console.log('network err', err);
                            });

                    } else {
                        console.log('not handle user not login situation');
                        $scope.planModal.hide();
                        $state.go('login');
                    }

                }, function fail(err) {
                    console.log('get searchedResult failed. res:', err);
                });
        };

        //datepicker
        $scope.datepickerObject = {
            titleLabel: 'Starting Date',  //Optional
            todayLabel: 'Today',  //Optional
            closeLabel: 'Close',  //Optional
            setLabel: 'Set',  //Optional
            setButtonType : 'button-balanced',  //Optional
            todayButtonType : 'button-positive',  //Optional
            closeButtonType : 'button-assertive',  //Optional
            inputDate: new Date(),    //Optional
            mondayFirst: true,    //Optional
            templateType: 'popup', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive', //Optional
            from: new Date(2012, 8, 2),   //Optional
            to: new Date(2018, 8, 25),    //Optional
            callback: function (val) {    //Mandatory
                datePickerCallback(val);
            }
        };

        var datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                $scope.datepickerObject.inputDate = val;
                console.log('Selected date is : ', val)
            }
        };

        $scope.toUpcoming = function(_id){
          $state.go('tab.plans');
          console.log(_id);
          //$location.path('/tab/plans/' + _id);
          $state.go('tab.plan-detail', {id: _id});
          console.log('after state change');
        };

        $scope.endDate = function(date){
          //this is a hack to get the proper end date for plans
          var dt = Date.parse(date) / 1000;
          var newD = dt - 25201; //subtract 7 hours + 1 second (endDate seems to always be next day at 7am UTC)
          return newD * 1000;
        }

        $ionicModal.fromTemplateUrl('templates/help.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.helpModal = modal;
        });

    });
