
angular.module('iTravelApp.controller.plans', [])

    .controller('PlansCtrl', function($scope, $rootScope, $location, User) {
        console.log('load account ctrl');

        $scope.currentUser = User.currentUser;

        $rootScope.$on('userLoginSuccess', function (event, data) {
            console.log(data);
            $scope.currentUser = data;
        });
    });
