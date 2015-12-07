(function() {
  'use strict';

  angular.module('iTravelApp')
    .controller('AutoplanModalCtrl', ['$scope', '$location', '$modalInstance', 'selectedAddress', 'Plan', 'User', function($scope, $location, $modalInstance, selectedAddress, Plan, User) {
      console.log("open autoplan modal");

      $scope.selectedAddress = selectedAddress;
      $scope.isAutoSubmitting = false;
      
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      
      $scope.autoplan = function (plan) {
        console.log(plan);

        if(plan && (!plan.start || !plan.duration)) {
          alert("please input start date and duration");
        } else {

          $scope.isAutoSubmitting = true;

          var destName = selectedAddress.formatted_address;
          var destlat = selectedAddress.geometry.location.lat;
          var destLng = selectedAddress.geometry.location.lng;
          if(plan) {
            var startDate = plan.start;
            var endDate = new Date();
            endDate.setDate(startDate.getDate() + plan.duration - 1);
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
                    var newPlan = _.findWhere(User.currentUser.plans, {signatureTs: autoplan.signatureTs});

                    $scope.isAutoSubmitting = false;
                    $modalInstance.dismiss('save');
                    $location.url('plans/'+newPlan._id);
                  }, function(err){
                    console.log('network err', err);
                  });

              } else {

                $modalInstance.dismiss('save');
                console.log('user is not logged in');
                //console.log("Saving your data to local storage and need to redirect you to login page");
                var gotoLogin = confirm("Do you want to login right now?");
                if (gotoLogin) {

                  //stringify json and save to local storage
                  $.each(autoplan, function(key, val){
                    //skip updateStartEnd function
                    if(key != "updateStartEnd"){
                      var temp = JSON.stringify(val);
                      //console.log(key + ":" + temp);
                      localStorage.setItem(key, temp);
                    }
                  });

                  $location.url('/login');
                }
              }

            }, function fail(err) {
              console.log('get searchedResult failed. res:', err);
            });
        }

      }

    }]);
})();
