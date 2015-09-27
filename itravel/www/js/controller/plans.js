
angular.module('iTravelApp.controller.plans', [])

    .controller('PlansCtrl', function($scope, $state, $rootScope, $location, User) {
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

    });
