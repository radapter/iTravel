(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('SignupCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {
		$scope.uiModel = {
			email: '',
			password: '',
			passwordConf: ''
		};

		$scope.signupStat = true;
		$scope.pwMatch = true;

		$scope.signup = function() {
			var email = $scope.uiModel.email;
			var password = $scope.uiModel.password;
			var passwordConf = $scope.uiModel.passwordConf;

			if(password !== passwordConf) {
				$scope.pwMatch = false;
				// show alert for now, need more sophisticated notification
				//alert('Password not match!');
			}
			else{
				User.signup(email, password)
					.then(function success() {
						console.log('user signed up successfully');
						$scope.signupStat = true;
						$scope.pwMatch = true;

						// TODO: maybe go to where the user come from
						$location.url('/');
					}, function fail(err) {
						$scope.signupStat = false;
						console.log('user signup failed. res:', err);
					});
			}


		};
	}]);
})();