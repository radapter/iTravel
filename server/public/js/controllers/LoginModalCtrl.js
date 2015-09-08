(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('LoginModalCtrl', ['$scope', '$location', 'User', '$modalInstance', function($scope, $location, User, $modalInstance) {
		$scope.uiModel = {
			email: '',
			password: ''
		};

		$scope.loginStat = true;

		$scope.login = function() {
			var email = $scope.uiModel.email;
			var password = $scope.uiModel.password;

			User.login(email, password)
				.then(function succeed(user) {
					$scope.loginStat = true;
					console.log('user logged in successfully');
					$modalInstance.close(user);
				}, function fail(err) {
					console.log('user login failed. res:', err);
					$scope.loginStat = false;
					console.log($scope.loginStat);
				});

		};

		$scope.cancel = function() {
			$modalInstance.dismiss();
		};

		$scope.signup = function() {
			$modalInstance.close('signup');
		};
	}]);
})();