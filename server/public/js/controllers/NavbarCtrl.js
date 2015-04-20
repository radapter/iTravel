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

	}]);
})();
