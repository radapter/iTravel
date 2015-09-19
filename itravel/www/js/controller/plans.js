
angular.module('iTravelApp.controller.plans', [])

    .controller('PlansCtrl', function($scope, $rootScope, $location, User) {
        console.log('load plans ctrl');

        $scope.currentUser = User.currentUser;

        //if(!User.currentUser) {
        //    $location.path('/login');
        //}

        $scope.hasNoPlan = false;

        $rootScope.$on('userLoginSuccess', function (event, user) {
            refreshUser(user);
        });

        $rootScope.$on('userNewPlanSaved', function (event, user) {
            refreshUser(user);
        });

        function refreshUser(user){
            $scope.hasNoPlan = false;
            console.log(user);
            $scope.currentUser = user;
            if($scope.currentUser.plans.length == 0) {
                $scope.hasNoPlan = true;
            }
        }

    });
