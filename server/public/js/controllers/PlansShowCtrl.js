(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('PlansShowCtrl', ['$scope', '$routeParams', '$location', 'User', '$rootScope', function($scope, $routeParams, $location, User, $rootScope) {

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
                    // TODO: RETURN PROMISE
                }
            }

          $scope.map = null;
          $scope.$on('mapInitialized', function(event, map) {
              $scope.map = map;
              var center = new google.maps.LatLng($scope.plan.activities[0].venue.location.lat, $scope.plan.activities[0].venue.location.lng);
              map.setCenter(center);

          });

          //build route
          $scope.waypoints = [];
          var activity_length = $scope.plan.activities.length;
          $scope.origin = {
              lat: $scope.plan.activities[0].venue.location.lat,
              lng: $scope.plan.activities[0].venue.location.lng
          };
          $scope.destination = {
              lat: $scope.plan.activities[activity_length-1].venue.location.lat,
              lng: $scope.plan.activities[activity_length-1].venue.location.lng
          };

          for(var i = 1 ; i < $scope.plan.activities.length-1; i++){
             if($scope.waypoints.length == 8) break;  //maxi waypoints is 8
             $scope.waypoints.push({
               location: {
                 lat: $scope.plan.activities[i].venue.location.lat,
                 lng: $scope.plan.activities[i].venue.location.lng
               },
               stopover: true
             });
          }

          console.log($scope.waypoints);

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
