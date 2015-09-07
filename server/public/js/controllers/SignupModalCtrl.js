(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('SignupCtrl', ['$scope', '$location', 'User', '$modalInstance', function($scope, $location, User, $modalInstance) {
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
					.then(function succeed(user) {
						console.log('user signed up successfully');
						$scope.signupStat = true;
						$scope.pwMatch = true;
						$modalInstance.close(user);
					}, function fail(err) {
						console.log('user signup failed. res:', err);
						$scope.signupStat = false;
					});
			}

		};

		$scope.cancel = function() {
			$modalInstance.dismiss();
		};

	}]);
})();