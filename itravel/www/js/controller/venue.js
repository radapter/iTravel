
angular.module('iTravelApp.controller.venue', [])

  .controller('VenueCtrl', function($scope, $state, $stateParams, $rootScope, $location, User, Venue, $ionicModal) {
    console.log('load venue ctrl');
    init();

    function init() {
      if(User.currentUser) {

        $scope.currentUser = User.currentUser;
        console.log($scope.currentUser);

        var venueid = $stateParams.v_id;
        var plans = $scope.currentUser.plans;
        var planid = $stateParams.id;

        console.log(venueid);
        console.log(plans);

        Venue.getDetails(venueid)
          .then(function (data) {
            console.log("get venue " + venueid + " success");
            console.log(data);
            $scope.tips = data.tips.groups[0].items;
            $rootScope.$broadcast('venueLoaded');
          }).then(function(){
            for(var i = 0; i < plans.length; i++){
              //console.log(plans[i]);
              if(plans[i]._id == planid) {
                $scope.plan = plans[i];
                console.log($scope.plan);

                for(var j = 0; j < $scope.plan.activities.length; j++){
                  if($scope.plan.activities[j].venue.id == venueid){
                    $scope.venue = $scope.plan.activities[j].venue;
                    $scope.venue.tips = $scope.tips;
                    console.log($scope.venue);
                    $rootScope.$broadcast('venueLoaded');
                  }
                }
              }
            }
          });



        //
        //if($scope.plan) {
        //  parseDays();
        //}
      } else {
        $state.go('login');
      }
    }




    $ionicModal.fromTemplateUrl('templates/help.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.helpModal = modal;
    });

  });
