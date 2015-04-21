(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('UserShowCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {
            $scope.user = User.currentUser;


        }]);
})();
