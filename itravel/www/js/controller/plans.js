
angular.module('iTravelApp.controller.plans', [])

    .controller('PlansCtrl', function($scope, $state, $rootScope, $location, User, $ionicModal) {
        console.log('load plans ctrl');

        if(User.currentUser) {
            refreshUser(User.currentUser);
        } else {
            $state.go('login');
        }

        $rootScope.$on('userLoginSuccess', function (event, user) {
            refreshUser(user);
        });

        $rootScope.$on('userNewPlanSaved', function (event, user) {
            refreshUser(user);
        });

        function refreshUser(user){
            $scope.hasNoPlan = true;
            console.log(user);
            $scope.currentUser = user;
            if($scope.currentUser.plans.length != 0) {
                $scope.hasNoPlan = false;
            }
        }

        $scope.filterUpcoming = function(plan){
          var today = new Date().getTime();
          if(Date.parse(plan.endDate) > today){
            return true;
          }
          return false;
        }

        $scope.filterPast = function(plan){
          var today = new Date().getTime();
          if(Date.parse(plan.endDate) > today){
            return false;
          }
          return true;
        }

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
