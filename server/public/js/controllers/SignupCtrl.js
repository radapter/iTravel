(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('SignupCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {
		$scope.uiModel = {
			email: '',
			password: '',
			passwordConf: ''
		};

		$scope.signup = function() {
			var email = $scope.uiModel.email;
			var password = $scope.uiModel.password;
			var passwordConf = $scope.uiModel.passwordConf;

			if(password !== passwordConf) {
				// show alert for now, need more sophisticated notification
				alert('Password not match!');
			}

			User.signup(email, password)
				.then(function success() {
					console.log('user signed up successfully');

					// TODO: maybe go to where the user come from
					$location.url('/');
				}, function fail(err) {
					console.log('user singup failed. res:', err);
				});
		};
	}]);
})();