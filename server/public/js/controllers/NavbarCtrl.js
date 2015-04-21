(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('NavbarCtrl', ['$scope', '$location', 'User', function ($scope, $location, User) {
	    
	    $scope.$on('$routeChangeSuccess', function(evt) {
	        $scope.showStatus = ($location.$$path === "/") ? true : false;
	    });

	    $scope.$on('userLoginSuccess', function() {
	    	$scope.currentUser = User.currentUser;
	    });

        $scope.logout = function () {

            //logout is not working .........

            //User.logout()
            //.then(function success() {
            //    console.log('user logged out successfully');
            //    $location.url('/');
            //}, function fail(err) {
            //    console.log('user logout failed. res:', err);
            //});
        };


	}]);
})();
