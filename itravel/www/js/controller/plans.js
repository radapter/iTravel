
angular.module('iTravelApp.controller.plans', [])

    .controller('PlansCtrl', function($scope, $rootScope, $location, User) {
        console.log('load plans ctrl');

        $scope.currentUser = User.currentUser;

        //if(!User.currentUser) {
        //    $location.path('/login');
        //}

        $scope.hasNoPlan = false;

        $rootScope.$on('userLoginSuccess', function (event, data) {
            $scope.hasNoPlan = false;
            console.log(data);
            $scope.currentUser = data;
            if($scope.currentUser.plans.length == 0) {
              $scope.hasNoPlan = true;
            }
        });
    });
